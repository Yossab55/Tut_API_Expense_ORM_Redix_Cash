import { fieldsToCheckUndefined } from "../utils/helpers.js";
import { Bcrypt } from "../source/interface/bcrypt.js";
import { DB } from "../source/DB/Knex.js";
import { AppError } from "../source/error/AppError.js";

const UserModel = Object.create(DB);

UserModel.table = "Users";

UserModel.query = function query() {
  return this.select("*").from(this.table);
};

UserModel.saveUser = async function saveUser(data) {
  const { user_email, user_name, password } = data;

  //take care: there is race condition between isUniqueEmail & insert
  // because of it to emails are not found in DB and one request after the other
  if (!(await this.isUniqueEmail(user_email)))
    throw AppError("This Email already exists");

  const dataToBeInserted = {
    user_email,
    user_name,
    password: await Bcrypt.hashIt(password),
  };
  const [id] = await this.insert(dataToBeInserted).into(this.table);
  const user = await this.query().where({ user_id: id }).first();

  return user;
};

UserModel.isUniqueEmail = async function isUniqueEmail(emailField) {
  const result = await this.select("user_email")
    .from(this.table)
    .where({ user_email: emailField })
    .first();

  return !result;
};

UserModel.getUserBy = async function getUserBy(id) {
  const result = await this.query().where({ user_id: id }).first();

  return result;
};

/**
 *
 * @param {Object} filterObject filter should {columnNameInDBTable: value}
 * @returns the first user
 */
UserModel.getUserByFilter = async function getUserByFilter(filter) {
  const result = await this.query().where(filter).first();

  return result;
};

/**
 *
 * @param {Number} id user id which to be deleted
 * @returns number of rues are deleted
 */

UserModel.deleteUser = async function deleteUserBy(id) {
  const numberOfRowsDeleted = await this.from(this.table)
    .where({ user_id: id })
    .del();

  return numberOfRowsDeleted;
};

UserModel.updateUser = async function updateUser(newData) {
  const { user_email, user_name, password, user_id } = newData;

  const updatedFields = fieldsToCheckUndefined({
    user_email,
    user_name,
    password,
  });
  console.log(updatedFields);
  console.log(user_id);
  const result = await this.from(this.table)
    .where({ user_id })
    .update(updatedFields);

  return result;
};
export { UserModel };

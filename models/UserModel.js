import { MySQLManager } from "../source/database/MySQLManager.js";
import {
  stringBinarySearch,
  fieldsToCheckUndefined,
} from "../utils/helpers.js";
import { Bcrypt } from "../source/interface/bcrypt.js";
import { AppError } from "../source/error/AppError.js";

const UserModel = Object.create(MySQLManager);

UserModel.userFields = ["user_email", "user_name", "password"];

UserModel.save = async function save(value) {
  const { user_email, user_name, password } = value;
  if (await this.isUniqueEmail(user_email)) {
    throw AppError("This Email is already exists");
  }
  value = {
    user_email,
    user_name,
    password: await Bcrypt.hashIt(password),
  };
  this.initial("Users", this.userFields);
  const result = await this.insert(value);
  return await UserModel.getUserWith(["user_email", "=", `'${user_email}'`]);
};

UserModel.isUniqueEmail = async function isUniqueEmail(email) {
  this.initial("Users", ["user_email"], null, ["user_email"]);
  const result = await this.selectWithOrderBy();
  const foundEmail = stringBinarySearch(result, email);
  if (!foundEmail) return false;
  return true;
};

UserModel.getUser = async function getUser(id) {
  const user = await this.getOneUser(id);
  return user;
};

UserModel.getUserWith = async function getUserWith(filters) {
  if (!filters) {
    throw AppError("You need filters to use this function");
  }
  this.initial("Users", ["user_id"].concat(this.userFields), filters);
  const [rows] = await this.select();
  return rows;
};
UserModel.deleteUser = async function deleteUser(id) {
  const filters = ["user_id", "=", `'${id}'`];
  this.initial("Users", null, filters);
  const result = await this.deleteOne();
  return result;
};

UserModel.updateUser = async function updateUser(data) {
  const { user_email, user_name, password, id } = data;
  if (user_email) {
    if (await this.isUniqueEmail(user_email)) {
      throw AppError("This Email already exists");
    }
  }
  const fieldsToChick = { user_email, user_name, password };
  const fields = fieldsToCheckUndefined(fieldsToChick);
  const filters = ["user_id", "=", `'${id}'`];
  this.initial("Users", fields, filters);
  for (let i = 0; i < fields.length; i++) {
    values.push(fieldsToChick[fields[i]]);
  }
  const result = await this.update(fields);
  return result;
};
export { UserModel };

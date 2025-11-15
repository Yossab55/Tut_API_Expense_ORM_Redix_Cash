import { Joi } from "../../interface/joi.js";

const UserSchema = Joi.createObject({
  user_email: Joi.email().required(),
  user_name: Joi.between(2, 70).required(),
  password: Joi.string(),
});
//@ because I need validator to chick the update without required schema
//@ because if user want to update there user_name only
const UserSchemaUpdate = Joi.createObject({
  user_email: Joi.email(),
  user_name: Joi.between(2, 70),
  password: Joi.string(),
}).min(1);

const userValidator = Joi.createValidator(UserSchema);

const userUpdateValidator = Joi.createValidator(UserSchemaUpdate);

export { userValidator, userUpdateValidator };

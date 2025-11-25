import { Joi } from "../../interface/joi.js";
import { getDayLongPeriod } from "../../../utils/helpers.js";

const ExpenseSchema = Joi.createObject({
  expense_category: Joi.between(2, 70).required(),
  expense_amount: Joi.number().required(),
  expense_date: Joi.date().default(getDayLongPeriod()[0]),
  user_id: Joi.number().required(),
});

const ExpenseUpdateSchema = Joi.createObject({
  expense_category: Joi.between(2, 70),
  expense_amount: Joi.number(),
  expense_date: Joi.date(),
  user_id: Joi.number(),
}).min(1);

const expenseValidator = Joi.createValidator(ExpenseSchema);

const expenseUpdateValidator = Joi.createValidator(ExpenseUpdateSchema);

export { expenseValidator, expenseUpdateValidator };

import { MySQLManager } from "../source/database/MySQLManager.js";
import {
  getCurrentDate,
  getDateInMySQLStanders,
  fieldsToCheckUndefined,
} from "../utils/helpers.js";

const ExpenseModel = Object.create(MySQLManager);
const expenseFields = [
  "expense_category",
  "expense_amount",
  "expense_date",
  "user_id",
];
const tableName = "Expenses";
// req.user.id

//@ create
ExpenseModel.saveNewExpense = async function saveNewExpense(value) {
  this.initial(tableName, expenseFields);
  const { expense_category, expense_amount, expense_date, user_id } = value;
  value = {
    expense_category,
    expense_amount,
    expense_date: [getDateInMySQLStanders(expense_date)],
    user_id,
  };
  const insertId = await this.insert(value);
  const filters = [
    "user_id",
    "=",
    user_id,
    "AND",
    "expense_id",
    "=",
    `'${insertId}'`,
  ];
  this.initial(tableName, ["expense_id"].concat(expenseFields), filters);
  const rows = await this.select();
  return rows[0];
};

//@ Read
ExpenseModel.getTodayExpenses = async function getTodayExpenses(id) {
  const [rows] = await this.todayExpenses(id);
  return rows;
};

ExpenseModel.getLastPeriodExpenses = async function getLastPeriodExpenses(
  userId,
  lastPeriod
) {
  const filters = [
    "user_id",
    "=",
    userId,
    "AND",
    "expense_date",
    "BETWEEN",
    `'${lastPeriod}'`,
    "AND",
    "NOW()",
  ];
  const orderColumns = ["expense_date"];
  this.initial(tableName, expenseFields, filters, orderColumns);
  const results = await this.selectWithOrderBy();
  return results;
};

ExpenseModel.getLastPeriodExpensesFilterByCategories =
  async function getLastPeriodExpensesFilterByCategories(
    userId,
    lastPeriod,
    categories
  ) {
    const filters = [
      "user_id",
      "=",
      userId,
      "AND",
      "expense_category",
      "IN",
      `(${
        categories.length == 1
          ? `'${categories[0]}'`
          : categories.reduce(
              (previous, current) => `'${previous}', '${current}'`
            )
      })`,
      "AND",
      "expense_date",
      "BETWEEN",
      `'${getCurrentDate(lastPeriod)}'`,
      "AND",
      "NOW()",
    ];
    this.initial(tableName, expenseFields, filters);
    const results = await this.select();
    return results;
  };

ExpenseModel.getTodayTotalAmountGroupByCategory =
  async function todayTotalAmountGroupByCategory(userId) {
    const filters = [
      "user_id",
      "=",
      userId,
      "AND",
      "expense_date",
      "=",
      "NOW()",
    ];
    const groupBy = ["expense_category"];
    this.initial(tableName, expenseFields, filters, null, groupBy);
    const results = await this.customQuery("select", "groupBy");
    return results;
  };

//@ delete
ExpenseModel.deleteExpense = async function deleteExpense(expense_id) {
  const filters = ["expense_id", "=", `'${expense_id}'`];
  this.initial(tableName, null, filters);
  const results = await this.deleteOne();
  return results;
};

ExpenseModel.deleteAllExpense = async function deleteExpense() {
  this.initial(tableName);
  const results = await this.deleteAll();
  return results;
};

// @update
ExpenseModel.updateExpense = async function updateExpense(dataToUpdate) {
  const { expense_category, expense_amount, expense_date, expense_id } =
    dataToUpdate;
  const fieldsToChick = {
    expense_category,
    expense_amount,
    expense_date: [getDateInMySQLStanders(expense_date)],
  };
  const fields = fieldsToCheckUndefined(fieldsToChick);
  console.log(fields);
  const filters = ["expense_id", "=", `'${expense_id}'`];
  this.initial(tableName, fields, filters);
  const values = [];
  for (let i = 0; i < fields.length; i++) {
    values.push(fieldsToChick[fields[i]]);
  }
  const results = await this.update(values);
  return results;
};

export { ExpenseModel };

import {
  getDayLongPeriod,
  getDateInMySQLStanders,
  fieldsToCheckUndefined,
} from "../utils/helpers.js";
import { DB } from "../source/DB/Knex.js";

const ExpenseModel = Object.create(DB);

ExpenseModel.table = "Expenses";

ExpenseModel.query = function query() {
  return this.select("*").from(this.table);
};

ExpenseModel.saveExpense = async function saveExpense(data) {
  const { expense_category, expense_amount, expense_date, user_id } = data;

  const valueToInsert = {
    expense_category,
    expense_amount,
    expense_date: getDateInMySQLStanders(expense_date),
    user_id,
  };

  const [id] = await this.insert(valueToInsert).into(this.table);

  const user = await this.query().where({ expense_id: id }).first();

  return user;
};
ExpenseModel.getTodayExpenses = async function getTodayExpenses(user_id) {
  const [start, end] = getDayLongPeriod();
  const todayExpenses = await this.query()
    .where({
      user_id: user_id,
    })
    .andWhere("expense_date", ">=", start)
    .andWhere("expense_date", "<", end);
  console.log(todayExpenses);
  return todayExpenses;
};

ExpenseModel.getLastPeriodBeforeNowExpense =
  async function getLastPeriodBeforeNowExpense(user_id, lastPeriod) {
    const expenses = await this.query()
      .where({ user_id })
      .andWhereBetween("expense_date", [
        [getDateInMySQLStanders(lastPeriod)],
        [getCurrentDate()],
      ]);

    return expenses;
  };

ExpenseModel.getLastPeriodAndCategoryExpense =
  async function getLastPeriodAndCategoryExpense(
    user_id,
    lastPeriod,
    categories
  ) {
    const expenses = await this.query()
      .where({ user_id })
      .andWhere(function returnWhereIn() {
        this.whereIn("expense_category", categories);
      })
      .andWhere(function returnBetween() {
        this.whereBetween("expense_date", [
          getDateInMySQLStanders(lastPeriod),
          getCurrentDate(),
        ]);
      });

    return expenses;
  };

ExpenseModel.getTodayExpensesGroupByCategory =
  async function getTodayExpensesGroupByCategory(user_id) {
    const expenses = await this.select(
      "expense_category",
      this.raw("SUM(expense_amount) AS total")
    )
      .where({ user_id, expense_date: getCurrentDate() })
      .groupBy("expense_category");

    return expenses;
  };

ExpenseModel.deleteExpense = async function deleteExpense(expense_id) {
  const result = await this.from(this.table).where({ expense_id }).del();

  return result;
};

ExpenseModel.deleteAllExpense = async function deleteAllExpense() {
  const result = await this.from(this.table).del();

  return result;
};

ExpenseModel.updateExpense = async function updateExpense(data) {
  const { expense_category, expense_amount, expense_date, expense_id } = data;

  const dataToUpdate = fieldsToCheckUndefined({
    expense_category,
    expense_amount,
    expense_date: getDateInMySQLStanders(expense_date),
  });

  const result = await this.from(this.table)
    .where({ expense_id })
    .update(dataToUpdate);

  return result;
};

export { ExpenseModel };

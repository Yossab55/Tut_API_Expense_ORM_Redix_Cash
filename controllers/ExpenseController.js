import { ExpenseModel } from "../models/ExpenseModel.js";
import { AppError } from "../source/error/AppError.js";
import {
  expenseValidator,
  expenseUpdateValidator,
} from "../source/validation/schema/ExpenseSchema.js";
import { BAD_REQUEST, GOOD_RESPONSE } from "../utils/constants/ResponseCode.js";

const ExpenseController = {
  getExpense: async function getExpense(req, res) {
    const urlQuery = req.query;
    if (Object.keys(urlQuery).length === 0)
      return await this.getAllTodayExpense(req, res);
    if (urlQuery.category)
      return await this.getLastPeriodExpenseGroupByCategory(req, res);
    if (urlQuery.total) return await this.getTotalTodayAmount(req, res);
    return await this.getLastPeriodExpense(req, res);
  },
  getAllTodayExpense: async function getAllTodayExpense(req, res) {
    const userId = req.user.id;
    const rows = await ExpenseModel.getTodayExpenses(userId);
    return res.status(GOOD_RESPONSE).send({ data: rows });
  },
  getLastPeriodExpense: async function getLastPeriodExpense(req, res) {
    const data = req.body;
    let last_period;
    if (data) {
      last_period = data.last_period;
    } else last_period = new Date();
    const userId = req.user.id;
    const rows = await ExpenseModel.getLastPeriodExpenses(userId, last_period);
    return res.status(GOOD_RESPONSE).send({ data: rows });
  },
  getLastPeriodExpenseGroupByCategory:
    async function getLastPeriodExpenseGroupByCategory(req, res) {
      const data = req.body;
      if (!req.query.category)
        throw AppError("You need specifics categories", BAD_REQUEST);
      const categories = req.query.category.split("&");
      let last_period;
      if (data) {
        last_period = data.last_period;
      } else last_period = new Date();
      const userId = req.user.id;
      const rows = await ExpenseModel.getLastPeriodExpensesFilterByCategories(
        userId,
        last_period,
        categories
      );
      return res.status(GOOD_RESPONSE).send({ data: rows });
    },
  getTotalTodayAmount: async function getTotalTodayAmount(req, res) {
    const userId = req.user.id;
    const rows = await ExpenseModel.getTodayTotalAmountGroupByCategory(userId);
    res.status(GOOD_RESPONSE).send({ data: rows });
  },
  saveNewExpense: async function saveNewExpense(req, res) {
    const data = req.body;
    const userId = req.user.id;
    data.user_id = userId;
    console.log(data);
    const { error } = expenseValidator(data);
    if (error) throw error;
    const expenseData = await ExpenseModel.saveNewExpense(data);
    res.status(GOOD_RESPONSE).send(expenseData);
  },
  deleteExpense: async function deleteExpense(req, res) {
    const expenseId = req.params.expenseId;
    const rows = await ExpenseModel.deleteExpense(expenseId);
    res.status(GOOD_RESPONSE).send({ message: "expense is deleted" });
  },
  deleteAllExpense: async function deleteAllExpense(req, res) {
    const rows = await ExpenseModel.deleteAllExpense();
    res.status(GOOD_RESPONSE).send({ message: "all expense were deleted" });
  },
  updateExpense: async function updateExpense(req, res) {
    const dataToUpdate = req.body;
    const expenseId = req.params.expenseId;
    const { error } = expenseUpdateValidator(dataToUpdate);
    if (error) throw error;
    dataToUpdate.expense_id = expenseId;
    const rows = await ExpenseModel.updateExpense(dataToUpdate);
    res.status(GOOD_RESPONSE).send({ message: "expense updated successfully" });
  },
};

export { ExpenseController };

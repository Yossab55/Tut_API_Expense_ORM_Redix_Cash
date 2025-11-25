import express from "express";
import { ExpenseController } from "../controllers/ExpenseController.js";
import { tryCatchFunction } from "../middlewares/TryCatchAbstraction.js";
import { requiredAuth } from "../middlewares/AuthMiddlewares.js";
import { getDataFromCache } from "../middlewares/CachingMiddlewares.js";

const ExpenseRouter = express.Router();
ExpenseRouter.get(
  "",
  tryCatchFunction(requiredAuth),
  tryCatchFunction(getDataFromCache),
  tryCatchFunction(ExpenseController.getExpense.bind(ExpenseController))
);

ExpenseRouter.post(
  "",
  tryCatchFunction(requiredAuth),
  tryCatchFunction(ExpenseController.saveNewExpense)
);

ExpenseRouter.delete(
  "/:expenseId",
  tryCatchFunction(requiredAuth),
  tryCatchFunction(ExpenseController.deleteExpense)
);

ExpenseRouter.delete(
  "",
  tryCatchFunction(requiredAuth),
  tryCatchFunction(ExpenseController.deleteAllExpense)
);

ExpenseRouter.patch(
  "/:expenseId",
  tryCatchFunction(requiredAuth),
  tryCatchFunction(ExpenseController.updateExpense)
);

export { ExpenseRouter };

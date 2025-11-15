import express from "express";
import { UserController } from "../controllers/UserController.js";
import { tryCatchFunction } from "../middlewares/TryCatchAbstraction.js";
import { requiredAuth } from "../middlewares/AuthMiddlewares.js";
const UserRouter = express.Router();

//@ to delete account
UserRouter.delete(
  "",
  tryCatchFunction(requiredAuth),
  tryCatchFunction(UserController.deleteUser)
);
UserRouter.patch(
  "",
  tryCatchFunction(requiredAuth),
  tryCatchFunction(UserController.updateUser)
);

export { UserRouter };

import express from "express";
import { LogoutController } from "../controllers/LogoutController.js";
import { tryCatchFunction } from "../middlewares/TryCatchAbstraction.js";
import { requiredAuth } from "../middlewares/AuthMiddlewares.js";
const LogoutRouter = express.Router();

LogoutRouter.get("", tryCatchFunction(requiredAuth), LogoutController.logout);

export { LogoutRouter };

import express from "express";
import { LoginController } from "../controllers/LoginController.js";
import { tryCatchFunction } from "../middlewares/TryCatchAbstraction.js";
const LoginRouter = express.Router();

LoginRouter.post("", tryCatchFunction(LoginController.login));

export { LoginRouter };

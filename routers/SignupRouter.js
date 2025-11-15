import express from "express";
import { SignupController } from "../controllers/SignupController.js";
import { tryCatchFunction } from "../middlewares/TryCatchAbstraction.js";

const SignupRouter = express.Router();

SignupRouter.post("/", tryCatchFunction(SignupController.signup));

export { SignupRouter };

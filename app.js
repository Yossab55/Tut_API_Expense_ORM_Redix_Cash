// + in the name of cross
//# starting date 7/29/2025
//# deadline date 8/31/2025
import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { morganOptions } from "./source/interface/morgan.js";
import {
  SignupRouter,
  LoginRouter,
  LogoutRouter,
  UserRouter,
  ExpenseRouter,
} from "./routers/IndexRouter.js";
import { ErrorHandel } from "./middlewares/ErrorsMiddleware.js";
import { env } from "./utils/helpers.js";
const app = express();

const port = env("PORT");
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});

app.use(morgan("custom", morganOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/signup", SignupRouter);
app.use("/login", LoginRouter);
app.use("/logout", LogoutRouter);
app.use("/user", UserRouter);
app.use("/expense", ExpenseRouter);

app.use(ErrorHandel);

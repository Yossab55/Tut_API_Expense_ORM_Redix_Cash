//+ in the name of Cross
import { JWT } from "../source/interface/JWT.js";
import { createCookie } from "../source/interface/Cookies.js";
import { Bcrypt } from "../source/interface/bcrypt.js";
import { UserModel } from "../models/UserModel.js";
import { AppError } from "../source/error/AppError.js";
import { GOOD_RESPONSE } from "../utils/constants/ResponseCode.js";
const LoginController = {
  login: async function login(req, res, next) {
    const data = req.body;
    const filters = ["user_email", "=", `'${data.user_email}'`];
    const user = await UserModel.getUserWith(filters);
    if (!user) {
      throw AppError("User not found please sign up");
    }
    const check = await Bcrypt.compareBoth(data.password, user.password);
    if (!check) {
      throw AppError("Wrong password please try again");
    }
    const payload = { id: user.user_id };
    const token = await JWT.createToken(payload);
    createCookie(res, token);
    res.status(GOOD_RESPONSE).send(user);
  },
};

export { LoginController };

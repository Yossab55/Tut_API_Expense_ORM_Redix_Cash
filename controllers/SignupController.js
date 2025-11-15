//+ in the name of Cross
import { JWT } from "../source/interface/JWT.js";
import { createCookie } from "../source/interface/Cookies.js";
import { UserModel } from "../models/UserModel.js";
import { userValidator } from "../source/validation/schema/UserSchema.js";
import { GOOD_RESPONSE } from "../utils/constants/ResponseCode.js";

const SignupController = {
  signup: async function signup(req, res, next) {
    const data = req.body;
    const { error } = userValidator(data);
    if (error) throw error;
    const user = await UserModel.save(data);
    const payload = { id: user.user_id };
    const token = await JWT.createToken(payload);
    createCookie(res, token);
    res.status(GOOD_RESPONSE).send(user);
  },
};

export { SignupController };

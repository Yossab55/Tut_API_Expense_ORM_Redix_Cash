import { UserModel } from "../models/UserModel.js";
import { userUpdateValidator } from "../source/validation/schema/UserSchema.js";
import { JWT } from "../source/interface/JWT.js";
import { GOOD_RESPONSE } from "../utils/constants/ResponseCode.js";
import { env } from "../utils/helpers.js";

const UserController = {
  deleteUser: async function deleteUser(req, res, next) {
    const token = req.cookies.token;
    const decodedToken = await JWT.decodeToken(token, env("JWT_SECRET"));
    const id = decodedToken.id;
    const user = await UserModel.getUser(id);
    if (!user)
      res.status(GOOD_RESPONSE).send({ message: "User is Already deleted" });
    const result = await UserModel.deleteUser(id);
    res.status(GOOD_RESPONSE).send({ message: "User is deleted successfully" });
  },
  updateUser: async function updateUser(req, res, next) {
    const data = req.body;
    const token = req.cookies.token;
    const { error } = userUpdateValidator(data);
    if (error) throw error;
    const decodedToken = await JWT.decodeToken(token, env("JWT_SECRET"));
    const id = decodedToken.id;
    data.id = id;
    const result = await UserModel.updateUser(data);

    res.status(GOOD_RESPONSE).send({ message: "User is updated successfully" });
  },
};

export { UserController };

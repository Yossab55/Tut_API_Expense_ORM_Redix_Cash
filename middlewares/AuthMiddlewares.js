//+ in the name of cross
import { JWT } from "../source/interface/JWT.js";
import { env } from "../utils/helpers.js";
import { AppError } from "../source/error/AppError.js";
import { UNAUTHORIZED } from "../utils/constants/ResponseCode.js";

async function requiredAuth(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    const tokenDecoded = await JWT.verifyToken(token, env("JWT_SECRET"));
    req.user = { id: tokenDecoded.id };
    return next();
  }
  throw AppError("user is not authenticated", UNAUTHORIZED);
}
export { requiredAuth };
async function isUserLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    try {
      const tokenDecoded = await verify(token, env("JWT_SECRET"));
      req.locals.user = { id: tokenDecoded.id };
      return next();
    } catch (error) {
      req.locals.user = null;
      return next();
    }
  } else {
    req.locals.user = null;
    return next();
  }
}
const AuthMiddlewares = {
  requiredAuth,

  isUserLoggedIn,
};
export { isUserLoggedIn };

export { AuthMiddlewares };

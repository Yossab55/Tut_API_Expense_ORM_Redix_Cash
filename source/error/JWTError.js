import { BaseError } from "./BaseError.js";
import { BAD_REQUEST } from "../../utils/constants/ResponseCode.js";

function JWTError(message, responseCode = BAD_REQUEST) {
  const error = Object.create(BaseError);
  error.init(message, "JsonWebTokenError", responseCode);
  return error;
}

export { JWTError };

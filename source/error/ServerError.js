import { BaseError } from "./BaseError.js";
import { INTERNAL_SERVER_ERROR } from "../../utils/constants/ResponseCode.js";

const ServerError = Object.create(BaseError);

ServerError.createErrorAndSend = function createErrorAndSend(res) {
  const message = "500 server down, please try later";
  const name = "server down";
  this.init(message, name, INTERNAL_SERVER_ERROR);
  return this.sendResponse(res);
};

export { ServerError };

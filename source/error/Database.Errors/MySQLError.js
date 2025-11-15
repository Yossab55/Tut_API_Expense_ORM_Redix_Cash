import { BaseError } from "../BaseError.js";

const MySQLError = Object.create(BaseError);

MySQLError.createErrorAndSend = function createErrorAndSend(res, error) {
  const errorName = "Wrong query with DB";
  const errorMessage = error.sqlMessage;
  this.init(errorMessage, errorName);
  return this.sendResponse(res);
};

export { MySQLError };

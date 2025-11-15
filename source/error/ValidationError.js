import { BaseError } from "./BaseError.js";

const ValidationError = Object.create(BaseError);

ValidationError.createErrorAndSend = function createErrorAndSend(error, res) {
  const name = error.name;
  const message = [
    ...error.details.map((errorDetails) => errorDetails.message),
  ];
  this.init(message, name);
  return this.sendResponse(res);
};

export { ValidationError };

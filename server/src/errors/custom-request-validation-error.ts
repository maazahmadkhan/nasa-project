import { CustomError, CustomErrorFormat } from "./custom-error";

export class CustomRequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: Array<CustomErrorFormat>) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, CustomRequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors;
  }
}

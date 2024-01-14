import ICustomError from '../Interfaces/ICustomError';

export default class CustomError extends Error implements ICustomError {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

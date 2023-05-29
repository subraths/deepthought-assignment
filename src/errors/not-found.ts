import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error";

class NotFound extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFound;

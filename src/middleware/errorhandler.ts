import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue: any;
}

export default function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = {
    statusCode: err.statusCode || 500,
    message: err.message || "internal error",
  };

  if (err.code && err.code === 11000) {
    error.statusCode = StatusCodes.BAD_REQUEST;
    error.message = `Duplicate value entered for ${err.keyValue} field, please enter another value`;
  }

  res.status(error.statusCode).json({ message: error.message });
}

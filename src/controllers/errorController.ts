import { NextFunction, Response, Request } from "express";
import AppError from "../utils/AppError";

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value`;
  return new AppError(message, 400);
};

/**
 *
 * @param err
 * @returns mongoDB validation message
 */
const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

/**
 *
 * @returns message for invalid token
 */
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again.", 401);

/**
 *
 * @returns message for token expiration
 */
const handleJWTExpireError = () =>
  new AppError("Token expired. Please log in again", 401);

/**
 *
 * @param err
 * @param res
 * @param _req
 * @returns response status
 */
const sendErrorProd = (err: any, _req: Request, res: Response) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming or other unknown error: don't want to leak error details
  // 1. Log error
  console.log("ERROR 🥵🥵🥵", err);

  // 2. Send generic message
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

/**
 *
 * @param err error object
 * @param req Request
 * @param res Response
 * @param _next Next
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = { ...err };
  error.message = err.message;
  if (error.kind === "ObjectId") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (err.stack.split(":")[0].trim() === "ValidationError")
    error = handleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpireError();

  sendErrorProd(error, req, res);
};

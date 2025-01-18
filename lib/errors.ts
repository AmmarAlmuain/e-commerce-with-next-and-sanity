import { NextApiResponse } from "next";

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message = "Invalid input") {
    super(message, 400);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, 401);
  }
}

class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}

function errorHandler(err: AppError, res: NextApiResponse) {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Something went wrong";

  if (!err.isOperational) {
    console.error("ERROR:", err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
    },
  });
}

export {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  InternalServerError,
  errorHandler,
};

import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

import { logger } from "../config/logger.js";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../shared/constant/index.js";
import type { ApiErrorResponse } from "../shared/types/index.js";
import { AppError } from "../shared/errors/AppError.js";
import mongoose from "mongoose";


export const errorMiddleware: ErrorRequestHandler = (
  error: Error,
  _request: Request,
  response: Response<ApiErrorResponse>,
  _next: NextFunction,
): void => {
  logger.error(error);

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      success: false,
      message: error.message,
      errorCode: error.errorCode,
    });

    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: ERROR_MESSAGES.INVALID_OBJECT_ID,
      errorCode: ERROR_CODES.INVALID_OBJECT_ID
    })
    return
  }

  if (error instanceof Error && "code" in error && error.code === 11000) {
    response.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: ERROR_MESSAGES.DUPLICATE_RESOURCE,
      errorCode: ERROR_CODES.DUPLICATE_RESOURCE
    })
    return
  }

  response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    errorCode: ERROR_CODES.INTERNAL_SERVER_ERROR,
  });
};
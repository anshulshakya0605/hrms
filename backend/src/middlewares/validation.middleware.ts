import type { RequestHandler } from "express";
import type { ZodType } from "zod";

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../shared/constant/index.js";
import { AppError } from "../shared/errors/AppError.js";

interface ValidatedData {
  body?: unknown;
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

export const validate = (schema: ZodType<ValidatedData>): RequestHandler => {
  return (request, _response, next) => {
    const result = schema.safeParse({
      body: request.body,
      params: request.params,
      query: request.query,
    });

    if (!result.success) {
      next(
        new AppError(
          ERROR_MESSAGES.VALIDATION_ERROR,
          HTTP_STATUS.BAD_REQUEST,
          ERROR_CODES.VALIDATION_ERROR,
        ),
      );

      return;
    }

    const validatedData = result.data;

    if (validatedData.body !== undefined) {
      request.body = validatedData.body;
    }

    if (validatedData.params !== undefined) {
      request.params = validatedData.params as typeof request.params;
    }

    if (validatedData.query !== undefined) {
      const query = request.query as Record<string, unknown>;

      for(const key of Object.keys(query)){
        delete query[key];
      }

      Object.assign(query, validatedData.query)

    }

    next();
  };
};
import rateLimit from "express-rate-limit";

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../shared/constant/index.js";

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  handler: (_request, response) => {
    response.status(HTTP_STATUS.TO_MANY_REQUEST).json({
      success: false,
      message: ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
      errorCode: ERROR_CODES.RATE_LIMIT_EXCEEDED,
    });
  },
});
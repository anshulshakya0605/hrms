import type { RequestHandler } from "express";
import { ERROR_MESSAGES } from "../shared/constant/messages.constants.js";
import { HTTP_STATUS } from "../shared/constant/http-status.constants.js";
import { ERROR_CODES } from "../shared/constant/error-codes.constants.js";
import { AppError } from "../shared/errors/AppError.js";


export const notFoundMiddleware: RequestHandler = (
    _request,
    _response,
    next) => {
        new AppError(
            ERROR_MESSAGES.RESOURCE_NOT_FOUND,
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.RESOURCE_NOT_FOUND
        )
    }
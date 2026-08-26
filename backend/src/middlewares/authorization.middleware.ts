import type { RequestHandler } from "express";
import { AppError } from "../shared/errors/AppError.js";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS, ROLE_PERMISSIONS, type Permission } from "../shared/constant/index.js"

export const authorize = (...requiredPermissions: Permission[]): RequestHandler => {

    return (request, _response, next) => {
        if (!request.user) {
            next(
                new AppError(
                    ERROR_MESSAGES.UNAUTHORIZED,
                    HTTP_STATUS.UNAUTHORIZED,
                    ERROR_CODES.UNAUTHORIZED
                )
            )
            return
        }

        const userPermissions = ROLE_PERMISSIONS[request.user.role];

        const hasPermission = requiredPermissions.every(
            (permission) => userPermissions.includes(permission)
        )

        if (!hasPermission) {
            next(
                new AppError(
                    ERROR_MESSAGES.FORBIDDEN,
                    HTTP_STATUS.FORBIDDEN,
                    ERROR_CODES.FORBIDDEN
                )
            )

            return

        }

        next();

    }

}
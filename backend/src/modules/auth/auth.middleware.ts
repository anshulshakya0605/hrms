import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";

import { env } from "../../config/env.js";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  ROLES,
  type Role,
} from "../../shared/constant/index.js";
import { AppError } from "../../shared/errors/AppError.js";

interface JwtPayload {
  userId: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate: RequestHandler = (
  request,
  _response,
  next,
) => {
 
  const authorizationHeader = request.headers.authorization;

//   console.log("Authorization header exists:", !!authorizationHeader);

  if (!authorizationHeader) {
    // console.log("ERROR: Authorization header is missing");

    next(
      new AppError(
        ERROR_MESSAGES.UNAUTHORIZED,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.UNAUTHORIZED,
      ),
    );

    return;
  }

//   console.log(
//     "Authorization header starts with Bearer:",
//     authorizationHeader.startsWith("Bearer "),
//   );

  const [scheme, token] = authorizationHeader.split(" ");

//   console.log("Scheme:", scheme);
//   console.log("Token exists:", !!token);
//   console.log("Token length:", token?.length ?? 0);

  if (scheme !== "Bearer" || !token) {
    // console.log("ERROR: Invalid Bearer token format");

    next(
      new AppError(
        ERROR_MESSAGES.INVALID_TOKEN,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.INVALID_TOKEN,
      ),
    );

    return;
  }

  // IMPORTANT:
  // We are NOT logging the actual token or JWT secret.
  const decodedWithoutVerification = jwt.decode(token);

//   console.log(
//     "Decoded token without verification:",
//     decodedWithoutVerification,
//   );

  try {
    // console.log("Verifying JWT...");

    const decoded = jwt.verify(
      token,
      env.JWT_ACCESS_SECRET,
    );

    // console.log("JWT verification SUCCESS");
    // console.log("Verified payload:", decoded);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("userId" in decoded) ||
      !("role" in decoded)
    ) {
    //   console.log("ERROR: JWT payload missing userId or role");

      throw new AppError(
        ERROR_MESSAGES.INVALID_TOKEN,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.INVALID_TOKEN,
      );
    }

    const role = decoded.role;

    // console.log("JWT role:", role);
    // console.log(
    //   "Valid roles:",
    //   Object.values(ROLES),
    // );

    if (!Object.values(ROLES).includes(role as Role)) {
      console.log("ERROR: Invalid role inside JWT");

      throw new AppError(
        ERROR_MESSAGES.INVALID_TOKEN,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.INVALID_TOKEN,
      );
    }

    request.user = {
      userId: String(decoded.userId),
      role: role as Role,
    };

    // console.log("request.user created:", request.user);
    // console.log("========== AUTH DEBUG SUCCESS ==========\n");

    next();
  } catch (error) {
    // console.log("========== AUTH DEBUG FAILED ==========");

    if (error instanceof jwt.TokenExpiredError) {
    //   console.log("JWT ERROR: TokenExpiredError");
    //   console.log("Message:", error.message);
    } else if (error instanceof jwt.JsonWebTokenError) {
    //   console.log("JWT ERROR: JsonWebTokenError");
    //   console.log("Message:", error.message);
    } else {
    //   console.log("UNKNOWN AUTH ERROR:", error);
    }

    // console.log("=======================================\n");

    if (error instanceof AppError) {
      next(error);
      return;
    }

    if (error instanceof jwt.TokenExpiredError) {
      next(
        new AppError(
          ERROR_MESSAGES.TOKEN_EXPIRED,
          HTTP_STATUS.UNAUTHORIZED,
          ERROR_CODES.TOKEN_EXPIRED,
        ),
      );

      return;
    }

    next(
      new AppError(
        ERROR_MESSAGES.INVALID_TOKEN,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.INVALID_TOKEN,
      ),
    );
  }
};
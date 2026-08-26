import jwt, {
  type SignOptions,
} from "jsonwebtoken";

import { env } from "../../config/env.js";

import type {AuthTokenPayload,} from "./auth.types.js";


const generateToken = (
  payload: AuthTokenPayload,
  secret: string,
  expiresIn: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn as NonNullable<jwt.SignOptions["expiresIn"]>,
  });
};

export const generateAccessToken = (
  payload: AuthTokenPayload,
): string => {
  return generateToken(
    payload,
    env.JWT_ACCESS_SECRET,
    env.JWT_ACCESS_EXPIRES_IN,
  );
};

export const generateRefreshToken = (
  payload: AuthTokenPayload,
): string => {
  return generateToken(
    payload,
    env.JWT_REFRESH_SECRET,
    env.JWT_REFRESH_EXPIRES_IN,
  );
};
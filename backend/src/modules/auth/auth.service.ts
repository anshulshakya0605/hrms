import bcrypt from "bcrypt"

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  ROLES,
  SUCCESS_MESSAGES,
} from "../../shared/constant/index.js";
import { AppError } from "../../shared/errors/AppError.js";

import { AuthRepository } from "./auth.repository.js";
import type {
  AuthResponse,
  AuthUser,
  LoginInput,
  RegisterInput,
} from "./auth.types.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "./auth.utils.js";

export class AuthService {
  private readonly authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  private buildAuthUser(user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: AuthUser["role"];
  }): AuthUser {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }

  private generateAuthResponse(user: AuthUser): AuthResponse {
    const payload = {
      userId: user.id,
      role: user.role,
    };

    return {
      user,
      tokens: {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload),
      },
    };
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    const existingUser = await this.authRepository.findByEmail(
      input.email,
    );

    if (existingUser) {
      throw new AppError(
        ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT,
        ERROR_CODES.EMAIL_ALREADY_EXIST,
      );
    }

    const user = await this.authRepository.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: input.password,
    });

    const authUser = this.buildAuthUser({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });

    return this.generateAuthResponse(authUser);
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.authRepository.findByEmailWithPassword(
      input.email,
    );

    console.log("LOGIN DEBUG");
    console.log("Email:", input.email);
    console.log("User found:", !!user);

    if (user) {
      console.log("User ID:", user._id.toString());
      console.log("User role:", user.role);
      console.log("Password hash exists:", !!user.password);
    }

    if (!user) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.INVALID_CREDENTIALS,
      );
    }

    if (!user.isActive) {
      throw new AppError(
        ERROR_MESSAGES.UNAUTHORIZED,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    console.log("Password valid:", isPasswordValid);
    
    if (!isPasswordValid) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.INVALID_CREDENTIALS,
      );
    }


    const authUser = this.buildAuthUser({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });

    return this.generateAuthResponse(authUser);
  }

  async getCurrentUser(userId: string): Promise<AuthUser> {
    const user = await this.authRepository.findById(userId);

    if (!user) {
      throw new AppError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.USER_NOT_FOUND,
      );
    }

    return this.buildAuthUser({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  }
}
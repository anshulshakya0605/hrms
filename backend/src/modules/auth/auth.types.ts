import type { Role } from "../../shared/constant/index.js";

export interface AuthTokenPayload {
    userId: string,
    role: Role
}

export interface RegisterInput {
    firstName: string,
    lastName: string,
    email: string,
    password: string 
}

export interface LoginInput {
    email: string, 
    password: string
}

export interface AuthUser {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: Role
}

export interface AuthTokens {
    accessToken: string,
    refreshToken: string
}

export interface AuthResponse {
    user: AuthUser,
    tokens: AuthTokens
}


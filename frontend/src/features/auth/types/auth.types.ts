
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isActive: boolean
}

export interface LoginResponse {
    user: LoginUser;
    accessToken: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
    confirmPassword: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface MessageResponse {
    message: string;
}


export interface AuthContextValue {
    user: LoginUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}
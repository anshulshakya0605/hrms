import { API_ENDPOINTS } from "../../../constants/api";
import api from "../../../lib/axios";
import type { ChangePasswordRequest, ForgotPasswordRequest, LoginRequest, LoginResponse, LoginUser, MessageResponse, ResetPasswordRequest } from "../types/auth.types";


export const authApi = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
        return response.data;
    },

    logout: async (): Promise<MessageResponse> => {
        const response = await api.post<MessageResponse>(API_ENDPOINTS.AUTH.LOGOUT)
        return response.data;
    },

    getCurrentUser: async (): Promise<LoginUser> => {
        const response = await api.get<LoginUser>(API_ENDPOINTS.AUTH.ME);
        return response.data;
    },

    refresh: async (): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.REFRESH);
        return response.data;
    },

    forgotPassword: async (data: ForgotPasswordRequest): Promise<MessageResponse> => {
        const response = await api.post<MessageResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
        return response.data;
    },

    resetPassword: async (data: ResetPasswordRequest): Promise<MessageResponse> => {
        const response = await api.post<MessageResponse>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
        return response.data;
    },

    changePassword: async (data: ChangePasswordRequest): Promise<MessageResponse> => {
        const response = await api.patch<MessageResponse>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
        return response.data;
    }
} as const


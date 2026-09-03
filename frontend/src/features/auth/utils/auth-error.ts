import axios from "axios";
import { ERROR_MESSAGES } from "../../../constants/messages";


interface ApiErrorResponse {
    message?: string;
    error?: string;
    errors?: Record<string, string[]>;
}

export const getApiErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        if (!error.response) {
            return ERROR_MESSAGES.NETWORK
        }
        const data = error.response.data;
        if (data?.message) {
            return data.message;
        }
        if (data?.error) {
            return data.error;
        }

        if (error.response.status === 400) {
            return ERROR_MESSAGES.VALIDATION;
        }

        if (error.response.status === 401) {
            return ERROR_MESSAGES.UNAUTHORIZED;
        }

        if (error.response.status === 403) {
            return ERROR_MESSAGES.FORBIDDEN;
        }

        if (error.response.status === 404) {
            return ERROR_MESSAGES.NOT_FOUND;
        }
    }
    if (error instanceof Error) {
        return error.message;
    }
    return ERROR_MESSAGES.GENERIC
}   
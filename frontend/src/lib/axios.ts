import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import env from "../config/env";
import { ERROR_MESSAGES } from "../constants/messages";
import { authStorage } from "../features/auth/utils/auth-storage";


const api = axios.create({
    baseURL: env.apiBaseUrl,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 15000,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = authStorage.getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

api.interceptors.response.use((response) => response,
    (error: AxiosError) => {
        if (!error.response) {
            return Promise.reject(
                new Error(ERROR_MESSAGES.NETWORK)
            )
        }

        if (error.status === 401) {
            authStorage.clear();
        }
        return Promise.reject(error)
    }
)


export default api
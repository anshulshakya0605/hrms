import { useState } from "react"
import type { LoginRequest } from "../types/auth.types";
import { useAuth } from "./use.auth";


export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useAuth();

    const loginUser = async (data: LoginRequest) => {
        try {
            setIsLoading(true)
            await login(data);
        } finally {
            setIsLoading(false)
        }
    }
    return {
        loginUser, isLoading
    }
}
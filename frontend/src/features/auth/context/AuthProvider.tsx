import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthContextValue, LoginRequest, LoginUser } from "../types/auth.types";
import { authStorage } from "../utils/auth-storage";
import { authApi } from "../api/auth.api";


export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({children}:AuthProviderProps) {
    const [user, setUser] = useState<LoginUser | null>(null)

    const [isLoading, setIsLoading] = useState(true);

    const refreshUser = useCallback( async () => {
        const token = authStorage.getAccessToken();

        if (!token) {
            setUser(null)
            setIsLoading(false)
            return
        }

        try {
            const currentUser = await authApi.getCurrentUser();
            setUser(currentUser)
            authStorage.setUser(currentUser)
        } catch (error) {
            authStorage.clear()
            setUser(null)
        }finally{
            setIsLoading(false)
        }

    },[])

    useEffect(() => {
        void refreshUser();
    }, [refreshUser])

    const login = useCallback( async(data:LoginRequest) => {
        const response = await authApi.login(data);
        authStorage.setAccessToken(response.accessToken)

        authStorage.setUser(response.user)
        setUser(response.user)
    }, [])

    const logout = useCallback(async() => {
        try{
            await authApi.logout();
        }finally{
            authStorage.clear()
            setUser(null)
        }
    }, [])

    const value = useMemo<AuthContextValue>(() => ({
        user, isAuthenticated: Boolean(user),isLoading, login, logout, refreshUser
    }), [user, isLoading, login, logout, refreshUser])

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

}

const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'authUser';

export const authStorage = {
    getAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN_KEY)
    },

    setAccessToken(token: string): void{
        localStorage.setItem(ACCESS_TOKEN_KEY, token)
    },

    removeAccessToken(): void {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
    },

    getUser():void{
        localStorage.getItem(USER_KEY)
    },

    setUser(user: unknown): void {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    removeUser(): void{
        localStorage.removeItem(USER_KEY);
    },

    clear():void{
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(USER_KEY);
    }
} as const


export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/logout',
        ME: '/auth.me',
        REFRESH: "/auth/refresh",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: "/auth/reset-password",
        CHANGE_PASSWORD: "/auth/change-password",
    },

    USERS: {
        BASE: "/users",
    },

    TEAMS: {
        BASE: "/teams",
    },

    EMPLOYEES: {
        BASE: "/employees",
    },

    PROJECTS: {
        BASE: "/projects",
    },
} as const
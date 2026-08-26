export const ROLES = {
    ADMIN: "ADMIN",
    MANAGER: "MANAGER",
    EMPLOYEE: "EMPLOYEE"
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES]; 
import { PERMISSIONS, type Permission } from "./permissions.constants.js";
import { ROLES, type Role } from "./roles.constants.js";


export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
    [ROLES.ADMIN]: Object.values(PERMISSIONS),

    [ROLES.MANAGER]: [
        PERMISSIONS.TEAM_VIEW,

        PERMISSIONS.EMPLOYEE_VIEW,
        PERMISSIONS.EMPLOYEE_UPDATE,

        PERMISSIONS.PROJECT_CREATE,
        PERMISSIONS.PROJECT_VIEW,
        PERMISSIONS.PROJECT_UPDATE,
    ],

    [ROLES.EMPLOYEE]: [
        PERMISSIONS.TEAM_VIEW,
        PERMISSIONS.EMPLOYEE_VIEW,
        PERMISSIONS.PROJECT_VIEW
    ]
}as const;
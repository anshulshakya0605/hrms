
export const PROJECT_STATUS = {
    PLANNING: "PLANNING",
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED",
    ON_HOLD: "ON_HOLD",
    CANCELLED: "CANCELLED"
} as const;

export type ProjectStatus = (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

export interface CreateProjectInput {
    name: string;
    projectCode: string;
    description?: string;
    teamId: string;
    managerId: string;
    status?: ProjectStatus;
    startDate?: Date;
    endDate?: Date;
}

export interface UpdateProjectInput {
    name?: string;
    description?: string;
    teamId?: string;
    managerId?: string;
    status?: ProjectStatus;
    startDate?: Date;
    endDate?: Date;
}

export interface ProjectQuery {
    page?: number;
    limit?: number;
    search?: string;
    teamId?: string;
    managerId?: string;
    status?: ProjectStatus;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export interface ProjectIdParams {
    id: string;
}
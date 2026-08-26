import type { Types } from "mongoose";

export const TEAM_STATUSES = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
} as const;

export type TeamStatus = (typeof TEAM_STATUSES)[keyof typeof TEAM_STATUSES];

export interface CreateTeamInput {
    name: string,
    description: string,
}

export interface UpdateTeamInput {
    name: string, 
    description: string,
    status?: TeamStatus
}

export interface TeamQuery {
    page?: number,
    limit?: number,
    search?: string,
    status?: TeamStatus,
    sortBy?: "name" | "createdAt" | "updatedAt",
    sortOrder?: "asc" | "desc"
} 

export interface TeamDocument {
    _id: Types.ObjectId,
    name: string,
    description?: string,
    status: TeamStatus,
    createdAt: Date,
    updatedAt: Date 
}


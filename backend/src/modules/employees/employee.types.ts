import type {Types} from "mongoose";

export const EMPLOYEE_STATUSES = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE"
} as const;

export type EmployeeStatus = (typeof EMPLOYEE_STATUSES)[keyof typeof EMPLOYEE_STATUSES];

export interface CreateEmployeeInput {
    userId: string;
    employeeCode: string,
    designation: string;
    teamId?: string;
    joiningDate: string;
}

export interface UpdateEmployeeInput {
    employeeCode?: string;
    designation?: string;
    teamId?: string;
    joiningDate?: string;
    status?: EmployeeStatus;
}

export interface EmployeeQuery {
    page?: number;
    limit?: number;
    search?: string;
    status?: EmployeeStatus;
    teamId?: string;
    sortBy?: "employeeCode" | "designation" | "joiningDate" | "createdAt";
    sortOrder?: 'asc' | 'desc';
}

export interface EmployeeDocument {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    employeeCode: string;
    designation: string;
    teamId?: Types.ObjectId;
    joiningDate: string;
    status: EmployeeStatus;
    createdAt: Date;
    updatedAt: Date;
}
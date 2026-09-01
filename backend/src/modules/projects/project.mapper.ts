import type { IProject } from "./project.model.js";


export interface ProjectResponse {
    id: string;
    name: string;
    projectCode: string;
    description?: string;
    teamId: string;
    managerId: string;
    status: string;
    startDate?: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export const mapProject = (project: IProject): ProjectResponse => {
    return {
        id: project._id.toString(),
        name: project.name,
        projectCode: project.projectCode,
        description: project.description,
        teamId: project.teamId.toString(),
        managerId: project.managerId.toString(),
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
    }
};
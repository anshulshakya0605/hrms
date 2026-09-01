import type { Request, Response } from "express";
import { ProjectService } from "./project.service.js";
import type { CreateProjectInput, ProjectQuery, UpdateProjectInput } from "./project.types.js";
import { HTTP_STATUS, PROJECT_MESSAGES } from "../../shared/constant/index.js";


export class ProjectController {
    private readonly projectService: ProjectService;

    constructor(){
        this.projectService = new ProjectService();
    }

    create = async(request: Request, response: Response): Promise<void> => {
        const project = await this.projectService.createProject(request.body as CreateProjectInput);

        response.status(HTTP_STATUS.CREATE).json({
            success: true,
            message: PROJECT_MESSAGES.CREATED,
            data: project
        })
    }

    getAll = async (request: Request, response: Response): Promise<void> => {
        const result = await this.projectService.getProjects(request.query as unknown as ProjectQuery);

        response.status(HTTP_STATUS.OK).json({
            success: true,
            message: PROJECT_MESSAGES.LIST_FETCHED,
            data: result
        })
    }

    getById = async(request: Request, response: Response): Promise<void> => {
        const project = await this.projectService.getProjectById(request.params.id as string);

        response.status(HTTP_STATUS.OK).json({
            success: true,
            message: PROJECT_MESSAGES.FETCHED,
            data: project
        })
    }

    update = async (request: Request, response: Response): Promise<void> => {
        const project = await this.projectService.updateProject(request.params.id as string, request.body as unknown as UpdateProjectInput)

        response.status(HTTP_STATUS.OK).json({
            success: true,
            message: PROJECT_MESSAGES.UPDATED,
            data: project
        })
    }

    delete = async (request: Request, response: Response): Promise<void> => {
        const project = await this.projectService.deleteProject(request.params.id as string)

        response.status(HTTP_STATUS.OK).json({
            success: true,
            message: PROJECT_MESSAGES.DELETED,
            data: null
        })
    }

}

export const projectController = new ProjectController();
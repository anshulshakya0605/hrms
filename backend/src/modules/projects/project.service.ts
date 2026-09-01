import { HTTP_STATUS } from "../../shared/constant/http-status.constants.js";
import { PROJECT_ERROR_CODES, PROJECT_MESSAGES } from "../../shared/constant/project.message.js";
import { AppError } from "../../shared/errors/AppError.js";
import { mapProject } from "./project.mapper.js";
import { ProjectRepository } from "./project.repository.js";
import type { CreateProjectInput, ProjectQuery, UpdateProjectInput } from "./project.types.js";


export class ProjectService {
    private readonly projectRepository: ProjectRepository;

    constructor(){
        this.projectRepository = new ProjectRepository();
    }

    async createProject(input: CreateProjectInput) {
        const existingProject = await this.projectRepository.findByProjectCode(input.projectCode);

        if(existingProject){
            throw new AppError(
                PROJECT_MESSAGES.ALREADY_EXISTS,
                HTTP_STATUS.CONFLICT,
                PROJECT_ERROR_CODES.ALREADY_EXISTS
            )
        }

        const project = await this.projectRepository.create(input);

        return mapProject(project);
    }

    async getProjectById(id: string){
        const project = await this.projectRepository.findById(id);

        if (!project) {
            throw new AppError(
                PROJECT_MESSAGES.NOT_FOUND,
                HTTP_STATUS.NOT_FOUND,
                PROJECT_ERROR_CODES.NOT_FOUND
            )
        }

        return mapProject(project);
    }

    async getProjects( query: ProjectQuery){
        
        const {items, totalItems} = await this.projectRepository.findMany(query);

        const page = query.page ?? 1;
        const limit = query.limit ?? 10;

        const totalPages = Math.ceil(totalItems / limit);

        return {
            items: items.map(mapProject),

            pagination: {
                page,
                limit,
                totalItems,
                totalPages
            }
        }
    }

    async updateProject(id: string, input: UpdateProjectInput){
        const existingProject = await this.projectRepository.findById(id);

        if (!existingProject) {
            throw new AppError(
                PROJECT_MESSAGES.NOT_FOUND,
                HTTP_STATUS.NOT_FOUND,
                PROJECT_ERROR_CODES.NOT_FOUND
            )
        }

        const project = await this.projectRepository.update(id, input);

        if (!project) {
            throw new AppError(
                PROJECT_MESSAGES.NOT_FOUND,
                HTTP_STATUS.NOT_FOUND,
                PROJECT_ERROR_CODES.NOT_FOUND
            )
        }

        return mapProject(project);
    }

    async deleteProject(id: string){
        const project = await this.projectRepository.delete(id);
        if (!project) {
            throw new AppError(
                PROJECT_MESSAGES.NOT_FOUND,
                HTTP_STATUS.NOT_FOUND,
                PROJECT_ERROR_CODES.NOT_FOUND
            )
        }
        
    }
}
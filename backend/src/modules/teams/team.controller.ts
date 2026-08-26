

import type { Request, RequestHandler, Response } from "express";
import { HTTP_STATUS } from "../../shared/constant/index.js";
import { TeamService } from "./team.service.js";
import type { CreateTeamInput, TeamQuery, UpdateTeamInput } from "./team.types.js";

interface TeamIdParams {
    id: string
}

export class TeamController {
    private readonly teamService: TeamService;

    constructor() {
        this.teamService = new TeamService();
    }

    create: RequestHandler = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const data =
            await this.teamService.createTeam(
                request.body as CreateTeamInput,
            );

        response.status(HTTP_STATUS.CREATE).json({
            success: true,
            message: "Team created successfully",
            data,
        });
    };

    getAll: RequestHandler = async (request: Request, response: Response): Promise<void> => {
        const data = await this.teamService.getTeams(request.query as unknown as TeamQuery)
        response.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Teams fetched successfully",
            data
        })
    }

    getById: RequestHandler = async(request: Request, response: Response): Promise<void> => {
        const params = request.params as unknown as TeamIdParams;
        const data = await this.teamService.getTeamById(params.id);
        response.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Team fetched successfully",
            data
        })
    }

    update: RequestHandler = async(request: Request, response: Response): Promise<void> => {
        const params = request.params as unknown as TeamIdParams;
        const data = await this.teamService.updateTeam(params.id, request.body as UpdateTeamInput);

        response.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Team updated successfully",
            data,
        })
    }

    delete: RequestHandler = async(request: Request, response: Response): Promise<void> => {
        const params = request.params as unknown as TeamIdParams;
        await this.teamService.deleteTeam(params.id);
        response.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Team deleted successfully",
            data: null
        })
    }

}
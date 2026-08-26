import { ERROR_CODES } from "../../shared/constant/error-codes.constants.js";
import { HTTP_STATUS } from "../../shared/constant/http-status.constants.js";
import { ERROR_MESSAGES } from "../../shared/constant/messages.constants.js";
import { AppError } from "../../shared/errors/AppError.js";
import { buildPaginationMeta } from "../../shared/pagination/pagination.js";
import { mapTeamResponse } from "./team.mapper.js";
import { TeamRepository } from "./team.repository.js";
import type { CreateTeamInput, TeamQuery, UpdateTeamInput } from "./team.types.js";


export class TeamService {
    private readonly teamRepository: TeamRepository;

    constructor() {
        this.teamRepository = new TeamRepository()
    }

    async createTeam(input: CreateTeamInput) {
        const existingTeam = await this.teamRepository.findByName(input.name);

        if (existingTeam) {
            throw new AppError(
                "Team with this name already exists",
                HTTP_STATUS.CONFLICT,
                ERROR_CODES.DUPLICATE_RESOURCE,
            )
        }

        const team = await this.teamRepository.create(input)

        return mapTeamResponse(team);
    }

    async getTeamById(id: string) {
        const team = await this.teamRepository.findById(id)

        if (!team) {
            throw new AppError(
                "Team not found",
                HTTP_STATUS.NOT_FOUND,
                ERROR_CODES.RESOURCE_NOT_FOUND
            )
        }

        return mapTeamResponse(team);
    }

    async getTeams(query: TeamQuery) {
        const { page = 1, limit = 10 } = query;

        const { items, totalItems } = await this.teamRepository.findMany(query);
        return {
            items: items.map(mapTeamResponse),
            pagination: buildPaginationMeta(page, limit, totalItems)
        }
    }

    async updateTeam(id: string, input: UpdateTeamInput) {
        const existingTeam = await this.teamRepository.findById(id)

        if (!existingTeam) {
            throw new AppError(
                "Team not found",
                HTTP_STATUS.NOT_FOUND,
                ERROR_CODES.RESOURCE_NOT_FOUND
            )
        }

        if (input.name) {
            const duplicateTeam = await this.teamRepository.findByName(input.name);

            if (
                duplicateTeam &&
                duplicateTeam._id.toString() !== id
            ) {
                throw new AppError(
                    "Team with this name already exists",
                    HTTP_STATUS.CONFLICT,
                    ERROR_CODES.DUPLICATE_RESOURCE,
                );
            }
        }

        const updateTeam = await this.teamRepository.update(id, input)

        if (!updateTeam) {
            throw new AppError(
                ERROR_MESSAGES.RESOURCE_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND,
                ERROR_CODES.RESOURCE_NOT_FOUND
            )
        }

        return mapTeamResponse(updateTeam);
    }

    async deleteTeam(id: string){
        const existingTeam = await this.teamRepository.findById(id);

        if (!existingTeam) {
            throw new AppError(
                "Team not found",
                HTTP_STATUS.NOT_FOUND,
                ERROR_CODES.RESOURCE_NOT_FOUND
            )
        }

        await this.teamRepository.delete(id)
        return null;
    }

}


import type { ITeam } from "./team.model.js";


export const mapTeamResponse = (team: ITeam) => {
    return {
        id: team._id.toString(),
        name: team.name,
        description: team.description ?? null,
        status: team.status,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt
    }
}

import { TeamModel, type ITeam } from "./team.model.js"
import type { TeamQuery } from "./team.types.js"


export class TeamRepository {
    async create(data: {
        name: string
        description: string
    }): Promise<ITeam> {
        return TeamModel.create(data)
    }

    async findById(id: string): Promise<ITeam | null> {
        return TeamModel.findById(id)
    }

    async findByName(name: string): Promise<ITeam | null> {
        return TeamModel.findOne({
            name: {
                $regex: `^${name}$`,
                $options: "i",
            },
        });
    }

    async update(id: string, data: Partial<ITeam>,): Promise<ITeam | null> {
        return TeamModel.findByIdAndUpdate(id, {
            $set: data,
        },
            {
                new: true,
                runValidators: true,
            }
        )
    }

    async findMany(query: TeamQuery) {
        const {
            page = 1,
            limit = 10,
            search,
            status,
            sortBy = "createdAt",
            sortOrder = "desc"
        } = query;

        const filter: Record<string, unknown> = {};

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i",
            }
        }

        if (status) {
            filter.status = status
        }

        const skip = (page - 1) * limit;

        const sortValue = sortOrder === "asc" ? 1 : -1;

        const [items, totalItems] = await Promise.all([
            TeamModel.find(filter)
                .sort({
                    [sortBy]: sortValue,
                })
                .skip(skip)
                .limit(limit)
                .lean(),

            TeamModel.countDocuments(filter),
        ])

        return {
            items, totalItems
        }

    }

    async delete(id: string): Promise<ITeam | null> {
        return TeamModel.findByIdAndDelete(id);
    }

}
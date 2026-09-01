import { Types } from "mongoose";
import { ProjectModel, type IProject } from "./project.model.js";
import type { CreateProjectInput, ProjectQuery, UpdateProjectInput } from "./project.types.js";


export interface ProjectListResult {
    items: IProject[];
    totalItems: number
}

export class ProjectRepository {

    async create(
    data: CreateProjectInput,
): Promise<IProject> {

    const projectData = {
        name: data.name,

        projectCode: data.projectCode,

        ...(data.description !== undefined && {
            description: data.description,
        }),

        teamId: new Types.ObjectId(
            data.teamId,
        ),

        managerId: new Types.ObjectId(
            data.managerId,
        ),

        ...(data.status !== undefined && {
            status: data.status,
        }),

        ...(data.startDate !== undefined && {
            startDate: new Date(data.startDate),
        }),

        ...(data.endDate !== undefined && {
            endDate: new Date(data.endDate),
        }),
    };

    return ProjectModel.create(projectData);
}

    async findById(id: string): Promise<IProject | null>{
        return ProjectModel.findById(id);
    }

    async findByProjectCode(projectCode: string): Promise<IProject | null> {
        return ProjectModel.findOne({projectCode: projectCode.toUpperCase()})
    }

    async update(
    id: string,
    data: UpdateProjectInput,
): Promise<IProject | null> {

    const updateData = {
        ...(data.name !== undefined && {
            name: data.name,
        }),

        ...(data.description !== undefined && {
            description: data.description,
        }),

        ...(data.teamId !== undefined && {
            teamId: new Types.ObjectId(
                data.teamId,
            ),
        }),

        ...(data.managerId !== undefined && {
            managerId: new Types.ObjectId(
                data.managerId,
            ),
        }),

        ...(data.status !== undefined && {
            status: data.status,
        }),

        ...(data.startDate !== undefined && {
            startDate: data.startDate,
        }),

        ...(data.endDate !== undefined && {
            endDate: data.endDate,
        }),
    };

    return ProjectModel.findByIdAndUpdate(
        id,
        {
            $set: updateData,
        },
        {
            new: true,
            runValidators: true,
        },
    );
}

    async delete(id: string): Promise<IProject | null> {
        return ProjectModel.findByIdAndDelete(id);
    }

    async findMany(query: ProjectQuery): Promise<ProjectListResult> {
        const {
            page = 1,
            limit = 10,
            search,
            teamId,
            managerId,
            status,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = query;

        const filter: Record<string, unknown> = {};

        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: "search",
                        $options: "i"
                    }
                },
                {
                    projectCode: {
                        $reges: 'search',
                        $options: 'i'
                    }
                },
            ]
        }

        if (teamId) {
            filter.teamId = teamId;
        }

        if(managerId){
            filter.managerId = managerId
        }

        if (status) {
            filter.status = status
        }

        const skip = (page -1) * limit;

        const sortValue = sortOrder === "asc" ? 1 : -1;

        const [items, totalItems] = await Promise.all([
            ProjectModel.find(filter)
            .sort({
                [sortBy]: sortValue,
            })
            .skip(skip)
            .limit(limit)
            .lean(),

            ProjectModel.countDocuments(filter)
        ])

        return {
            items: items as IProject[], totalItems
        }
    }
} 
import { EmployeeModel, type IEmployee } from "./employee.model.js";
import type { EmployeeQuery } from "./employee.types.js";


export interface EmployeeListResult {
    items: IEmployee[];
    totalItems: number
}

export class EmployeeRepository {

    async create(
        data: {
            userId: string;
            employeeCode: string;
            designation: string;
            teamId?: string;
            joiningDate: Date
        }
    ): Promise<IEmployee> {
        
        return EmployeeModel.create(data);
    }

    async findById (id: string): Promise<IEmployee | null> {
        return EmployeeModel.findById(id);
    }

    async findByUserId (userId: string): Promise<IEmployee | null> {
        return EmployeeModel.findOne({userId});
    }

    async findByEmployeeCode (employeeCode: string): Promise<IEmployee | null>{
        return EmployeeModel.findOne({employeeCode});
    }

    async update (id: string, data: Partial<IEmployee>): Promise<IEmployee | null>{
        return EmployeeModel.findByIdAndUpdate(id, {$set: data}, {new: true, runValidators: true})
    }

    async delete (id: string): Promise<IEmployee | null>{
        return EmployeeModel.findByIdAndDelete(id);
    }

    async findMany (query: EmployeeQuery): Promise<EmployeeListResult> {
        const {
            page = 1,
            limit = 10,
            search,
            status,
            teamId,
            sortBy = "createdAt",
            sortOrder = "desc"
        } = query;

        const filter: Record<string, unknown> = {};

        if (search) {
            filter.$or = [
                {
                    employeeCode: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    designation: {
                        $regex: search,
                        $options: "i",
                    },
                },

            ]
        }

        if(status){
            filter.status = status;
        }

        if(teamId){
            filter.teamId = teamId;
        }

        const skip = (page - 1) * limit;

        const sortValue = sortOrder === "asc" ? 1 : -1;

        const [items, totalItems] = await Promise.all([
            EmployeeModel.find(filter).sort({
                [sortBy]: sortValue,
            })
            .skip(skip)
            .limit(limit)
            .lean(),

            EmployeeModel.countDocuments(filter),
        ])

        return {
            items, totalItems
        }
    }

}
import { model, Schema, type Types } from "mongoose";
import { EMPLOYEE_STATUSES, type EmployeeStatus } from "./employee.types.js";


export interface IEmployee {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    employeeCode: string;
    designation: string;
    teamId?: Types.ObjectId;
    joiningDate: Date;
    status: EmployeeStatus
    createdAt: Date;
    updatedAt: Date
}

const employeeSchema = new Schema<IEmployee> (
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true
        },

        employeeCode: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
            minlength: 2,
            maxlength: 30,
            unique: true,
            index: true
        },

        designation: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        teamId: {
            type: Schema.Types.ObjectId,
            ref: "Team",
            index: true
        },

        joiningDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: Object.values(EMPLOYEE_STATUSES),
            default: EMPLOYEE_STATUSES.ACTIVE,
            required: true,
            index: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

employeeSchema.index({destination: 1});

employeeSchema.index({status: 1, createdAt: -1})

export const EmployeeModel = model<IEmployee>("Employee", employeeSchema);
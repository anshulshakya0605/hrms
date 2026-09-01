import { model, Model, Schema, type Types } from "mongoose";
import { PROJECT_STATUS, type ProjectStatus } from "./project.types.js";


export interface IProject extends Document {
    _id: Types.ObjectId;
    name: string;
    projectCode: string;
    description?: string;

    teamId: Types.ObjectId;
    managerId: Types.ObjectId;

    status: ProjectStatus;

    startDate?: Date;
    endDate?: Date;

    createdAt: Date;
    updatedAt: Date;

}

const projectSchema = new Schema<IProject>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        projectCode: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
            index: true,
        },

        description: {
            type: String,
            trim: true
        },

        teamId: {
            type: Schema.Types.ObjectId,
            ref: "Team",
            required: true,
            index: true
        },

        managerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        status: {
            type: String,
            enum: Object.values(PROJECT_STATUS),
            default: PROJECT_STATUS.PLANNING,
            index: true
        },

        startDate: {
            type: Date
        },

        endDate: {
            type: Date
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


projectSchema.index({ teamId: 1, status: 1 });

projectSchema.index({ managerId: 1, status: 1 });

projectSchema.index({ name: "text", projectCode: "text" })

export const ProjectModel: Model<IProject> = model<IProject>("Project", projectSchema);
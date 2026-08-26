import { model, Schema, type Types } from "mongoose";
import { TEAM_STATUSES, type TeamStatus } from "./team.types.js";


export interface ITeam {
    _id: Types.ObjectId,
    name: string,
    description: string,
    status: TeamStatus,
    createdAt: Date,
    updatedAt: Date
}

const teamSchema = new Schema<ITeam>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 500
        },

        status: {
            type: String,
            enum: Object.values(TEAM_STATUSES),
            default: TEAM_STATUSES.ACTIVE,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

teamSchema.index({name: 1})

teamSchema.index({
    status: 1,
    createdAt: -1
})


export const TeamModel = model<ITeam>("Team", teamSchema);

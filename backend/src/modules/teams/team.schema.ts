import z from "zod";
import { TEAM_STATUSES } from "./team.types.js";


const teamNameSchema = z.string().trim().min(2).max(100);


const descriptionSchema = z.string().trim().max(500).optional();

export const createTeamSchema = z.object({
    body: z.object({
        name: teamNameSchema,
        description: descriptionSchema
    })
})

export const updateTeamSchema = z.object({
    body: z.object({
        name: teamNameSchema.optional(),
        description: descriptionSchema,
        status: 
        z.enum([
            TEAM_STATUSES.ACTIVE,
            TEAM_STATUSES.INACTIVE
        ]).optional()
    })
})

export const teamIdSchema = z.object({
  params: z.object({
    id: z.string().regex(
      /^[0-9a-fA-F]{24}$/,
      "Invalid team ID",
    ),
  }),
});

export const teamListSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1).default(1),

        limit: z.coerce.number().int().min(1).max(100).default(10),

        search: z.string().trim().optional(),

        status: z.enum([TEAM_STATUSES.ACTIVE, TEAM_STATUSES.INACTIVE]).optional(),

        sortBy: z.enum([
            "name",
            "createdAt",
            "updatedAt"
        ]).optional(),

        sortOrder: z.enum(["asc", "desc"]).default("desc")
    })
})
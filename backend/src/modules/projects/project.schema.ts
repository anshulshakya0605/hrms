import z from "zod";
import { objectIdSchema } from "../../shared/validation/object-id.schema.js";
import { PROJECT_STATUS } from "./project.types.js";


const projectNameSchema = z
    .string()
    .trim()
    .min(2)
    .max(100)


const projectCodeSchema = z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(
        /^[A-Za-z0-9_-]+$/,
        "Project code contains invalid characters",
    );



const descriptionSchema = z
    .string()
    .trim()
    .max(1000)
    .optional();


const dateSchema = z.coerce.date();

export const createProjectSchema = z.object({
    body: z.object({
        name: projectNameSchema,
        projectCode: projectCodeSchema,
        description: descriptionSchema,
        teamId: objectIdSchema,
        managerId: objectIdSchema,

        status: z
            .enum(Object.values(PROJECT_STATUS) as [string, ...string[]]).optional(),

        startDate: dateSchema.optional(),
        endDate: dateSchema.optional(),
    })
})


export const updateProjectSchema = z.object({
    params: z.object({
        id: objectIdSchema
    }),

    body: z.object({
        name: projectNameSchema.optional(),
        description: descriptionSchema,
        teamId: objectIdSchema.optional(),
        managerId: objectIdSchema.optional(),

        status: z.enum(Object.values(PROJECT_STATUS) as [string, ...string[]]).optional(),

        startDate: objectIdSchema.optional(),
        endDate: objectIdSchema.optional()
    })
})

export const projectIdSchema = z.object({
    params: z.object({
        id: objectIdSchema
    })
})

export const ProjectListSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1).optional(),

        limit: z.coerce.number().int().min(1).max(100).optional(),

        search: z.string().trim().max(100).optional(),

        teamId: objectIdSchema.optional(),

        managerId: objectIdSchema.optional(),

        status: z.
                enum(Object.values(PROJECT_STATUS) as [string, ...string[]]).optional(),

        
        sortBy: z.enum([
            "name",
            "projectCode",
            "status",
            "createdAt",
            "startDate",
        ]).optional(),

        sortOrder: z.enum(["asc" , "desc"]).optional()
    })
})
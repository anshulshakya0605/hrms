import z from "zod";
import { EMPLOYEE_STATUSES } from "./employee.types.js";
import { objectIdSchema } from "../../shared/validation/object-id.schema.js";


const employeeCodeSchema = z
    .string()
    .trim()
    .min(2)
    .max(30)
    .transform((value) => value.toUpperCase());


const designationSchema = z
    .string()
    .trim()
    .min(2)
    .max(100)


const joiningDateSchema = z
    .string()
    .datetime()


export const createEmployeeSchema = z.object({
    body: z.object({
        userId: objectIdSchema,
        employeeCode: employeeCodeSchema,
        designation: designationSchema,
        teamId: objectIdSchema.optional(),
        joiningDate: joiningDateSchema
    })
})


export const updateEmployeeSchema = z.object({
    body: z.object({
        employeeCode: employeeCodeSchema.optional(),
        designation: designationSchema.optional(),
        teamId: objectIdSchema.optional(),
        joiningDate: joiningDateSchema.optional(),
        status: z.enum([EMPLOYEE_STATUSES.ACTIVE, EMPLOYEE_STATUSES.INACTIVE]).optional()
    })
})

export const employeeIdSchema = z.object({
    params: z.object({
        id: objectIdSchema
    })
})

export const employeeListSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1).default(1),

        limit: z.coerce.number().int().min(1).max(100).default(10),

        search: z.string().trim().optional(),

        status: z.enum([EMPLOYEE_STATUSES.ACTIVE, EMPLOYEE_STATUSES.INACTIVE]).optional(),

        teamId: objectIdSchema.optional(),

        sortBy: z.enum([
            "employeeCode",
            "designation",
            "joiningDate",
            "createdAt"
        ]).default("createdAt"),

        sortOrder: z.enum([
            "asc", "desc"
        ]).default("desc")
    })
})
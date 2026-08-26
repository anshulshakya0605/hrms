import z, { email } from "zod";


const nameSchema = z.string().trim().min(2).max(100);

const passwordSchema = z.string().min(6).max(32)

const emailSchema = z.string().trim().email().toLowerCase();

export const registerSchema = z.object({
    body: z.object({
        firstName: nameSchema,
        lastName: nameSchema,

        email: emailSchema,

        password: passwordSchema
    })
})

export const loginSchema = z.object({
    body: z.object({
        email: emailSchema,
        password: z.string().min(1)
    })
})
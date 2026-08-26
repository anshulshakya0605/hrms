import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
    path: ".env"
})

console.log("ENV CHECK:", {
  mongodbUri: process.env.MONGODB_URI,
  port: process.env.PORT,
});

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),

    PORT: z.coerce.number().int().positive().default(5000),

    MONGODB_URI: z.string().min(1),

    JWT_ACCESS_SECRET: z.string().min(32),
    JWT_REFRESH_SECRET: z.string().min(32),

    JWT_ACCESS_EXPIRES_IN: z.string().min(1),
    JWT_REFRESH_EXPIRES_IN: z.string().min(1),

    CORS_ORIGIN: z.string().min(1),

})

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors,
  );

  process.exit(1);
}

export const env = parsedEnv.data;
import cors from "cors";
import express, {type Application } from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { apiRateLimiter } from "./middlewares/rateLimit.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import { APP_CONSTANTS, HTTP_STATUS, SUCCESS_MESSAGES } from "./shared/constant/index.js"
import { pinoHttp } from "pino-http";


import authRouter from './modules/auth/auth.routes.js'
import teamRouter from './modules/teams/team.routes.js'
import employeeRouter from './modules/employees/employee.routes.js'
import projectRouter from './modules/projects/project.routes.js'

const app: Application = express();

app.use(helmet());

app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true
    })
)

app.use(express.json());

app.use(
  pinoHttp({
    logger,
  }),
);

app.use(apiRateLimiter);

app.get(`${APP_CONSTANTS.API_PREFIX}/health`, (_request, response) => {
  response.status(HTTP_STATUS.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.HEALTH_CHECK_SUCCESS,
    data: null,
  });
});

app.use(`${APP_CONSTANTS.API_PREFIX}/auth`, authRouter)
app.use(`${APP_CONSTANTS.API_PREFIX}/teams`, teamRouter)
app.use(`${APP_CONSTANTS.API_PREFIX}/employee`, employeeRouter)

app.use(`${APP_CONSTANTS.API_PREFIX}/projects`, projectRouter)

app.use(notFoundMiddleware);

app.use(errorMiddleware);



export default app;
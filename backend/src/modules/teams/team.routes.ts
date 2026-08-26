import { Router } from "express";
import { TeamController } from "./team.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../../middlewares/authorization.middleware.js";
import { PERMISSIONS } from "../../shared/constant/index.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { createTeamSchema, teamIdSchema, teamListSchema, updateTeamSchema } from "./team.schema.js";


const router = Router();

const teamController = new TeamController();

router.post("/", 
    authenticate, 
    authorize(PERMISSIONS.TEAM_CREATE),
    validate(createTeamSchema),
    teamController.create
)

router.get("/",
    authenticate,
    authorize(PERMISSIONS.TEAM_VIEW),
    validate(teamListSchema),
    teamController.getAll
);

router.get('/:id',
    authenticate,
    authorize(PERMISSIONS.TEAM_VIEW),
    validate(teamIdSchema),
    teamController.getById
)

router.patch('/:id',
    authenticate,
    authorize(PERMISSIONS.TEAM_UPDATE),
    validate(updateTeamSchema),
    validate(teamIdSchema),
    teamController.update
)

router.delete('/:id',
    authenticate,
    authorize(PERMISSIONS.TEAM_DELETE),
    validate(teamIdSchema),
    teamController.delete
)

export default router;
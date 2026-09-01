import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../../middlewares/authorization.middleware.js";
import { PERMISSIONS } from "../../shared/constant/permissions.constants.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { createProjectSchema, projectIdSchema, ProjectListSchema, updateProjectSchema } from "./project.schema.js";
import { projectController } from "./project.controller.js";



const router = Router();

router.post('/',
    authenticate,
    authorize(PERMISSIONS.PROJECT_CREATE),
    validate(createProjectSchema),
    projectController.create
)


router.get('/',
    authenticate,
    authorize(PERMISSIONS.PROJECT_VIEW),
    validate(ProjectListSchema),
    projectController.getAll
)


router.get('/:id',
    authenticate,
    authorize(PERMISSIONS.PROJECT_VIEW),
    validate(projectIdSchema),
    projectController.getById
)


router.patch('/:id',
    authenticate,
    authorize(PERMISSIONS.PROJECT_UPDATE),
    validate(updateProjectSchema),
    projectController.update
)


router.delete('/:id',
    authenticate,
    authorize(PERMISSIONS.PROJECT_DELETE),
    validate(projectIdSchema),
    projectController.delete
)


export default router;
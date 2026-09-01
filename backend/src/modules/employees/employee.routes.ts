import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../../middlewares/authorization.middleware.js";
import { PERMISSIONS } from "../../shared/constant/permissions.constants.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { createEmployeeSchema, employeeIdSchema, employeeListSchema, updateEmployeeSchema } from "./employee.schema.js";
import { employeeController } from "./employee.controller.js";


const router = Router();

router.post(
    "/",

    (request, _response, next) => {
        console.log("EMPLOYEE ROUTE: reached");
        next();
    },

    (request, _response, next) => {
        console.log("BEFORE AUTHENTICATE");
        next();
    },

    authenticate,

    (request, _response, next) => {
        console.log("AFTER AUTHENTICATE");
        console.log("Authenticated user:", request.user);
        next();
    },

    authorize(PERMISSIONS.EMPLOYEE_CREATE),

    (request, _response, next) => {
        console.log("AFTER AUTHORIZATION");
        next();
    },

    validate(createEmployeeSchema),

    (request, _response, next) => {
        console.log("AFTER VALIDATION");
        next();
    },

    employeeController.create,
);

router.get("/",
    authenticate,
    authorize(PERMISSIONS.EMPLOYEE_VIEW),
    validate(employeeListSchema),
    employeeController.getAll
);

router.get("/:id",
    authenticate,
    authorize(PERMISSIONS.EMPLOYEE_VIEW),
    validate(employeeIdSchema),
    employeeController.getById

)

router.patch("/:id", 
    authenticate,
    authorize(PERMISSIONS.EMPLOYEE_UPDATE),
    validate(updateEmployeeSchema),
    employeeController.update
)

router.delete("/:id",
    authenticate,
    authorize(PERMISSIONS.EMPLOYEE_DELETE),
    validate(employeeIdSchema),
    employeeController.delete
)

export default router
import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { authenticate } from "./auth.middleware.js";


const router = Router();

const authController = new AuthController();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.get("/me", authenticate, authController.me)

export default router
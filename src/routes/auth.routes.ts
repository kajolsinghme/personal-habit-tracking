import { Router } from "express";
import { login, register } from "../controllers/auth.controller.ts";
import { validate } from "../middleware/validate.middleware.ts";
import { loginSchema, registerSchema } from "../validators/auth.validator.ts";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
import { Router } from "express";
import { register } from "../controllers/auth.controller.ts";
import { validate } from "../middleware/validate.middleware.ts";
import { registerSchema } from "../validators/auth.validator.ts";

const router = Router();

router.post("/register", validate(registerSchema), register);

export default router;
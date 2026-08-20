import { Router } from "express";
import { createHabit, getAllHabits } from "../controllers/habit.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { validate } from "../middleware/validate.middleware.ts";
import { createHabitSchema } from "../validators/habit.validator.ts";

const router = Router();

router.post(
  "/habits",
  authMiddleware,
  validate(createHabitSchema),
  createHabit,
);

router.get(
  "/habits",
  authMiddleware,
  getAllHabits,
);

export default router;
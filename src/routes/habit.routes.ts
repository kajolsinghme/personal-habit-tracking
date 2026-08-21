import { Router } from "express";
import { createHabit, getAllHabits, getHabitById, updateHabit } from "../controllers/habit.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { validate } from "../middleware/validate.middleware.ts";
import { createHabitSchema, updateHabitSchema } from "../validators/habit.validator.ts";

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

router.get(
  "/habits/:id",
  authMiddleware,
  getHabitById,
);

router.put(
  "/habits/:id",
  authMiddleware,
  validate(updateHabitSchema),
  updateHabit,
);

export default router;
import { Router } from "express";
import { createHabit, deleteHabit, getAllHabits, getHabitById, updateHabit } from "../controllers/habit.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { validate } from "../middleware/validate.middleware.ts";
import { createHabitSchema, updateHabitSchema } from "../validators/habit.validator.ts";
import { getHabitHistory, trackHabit } from "../controllers/tracking.controller.ts";

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

router.delete(
  "/habits/:id",
  authMiddleware,
  deleteHabit,
);

router.post(
  "/habits/:id/track",
  authMiddleware,
  trackHabit,
);

router.get(
  "/habits/:id/history",
  authMiddleware,
  getHabitHistory,
);
export default router;
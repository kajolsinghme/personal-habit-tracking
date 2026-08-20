import type { Request, Response, NextFunction } from "express";
import { createHabitService } from "../services/habit.service.ts";

export const createHabit = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const habit = await createHabitService(
      req.userId,
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Habit created successfully",
      habit,
    });
  } catch (error) {
    next(error);
  }
};
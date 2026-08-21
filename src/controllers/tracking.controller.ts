import type { Request, Response, NextFunction } from "express";
import { trackHabitService } from "../services/tracking.service.ts";

export const trackHabit = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const trackingLog = await trackHabitService(req.params.id as string, req.userId!);

    res.status(201).json({
      success: true,
      message: "Habit marked as completed",
      trackingLog,
    });
  } catch (error) {
    next(error);
  }
};

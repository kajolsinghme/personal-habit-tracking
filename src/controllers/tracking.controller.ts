import type { Request, Response, NextFunction } from "express";
import { getHabitHistoryService, trackHabitService } from "../services/tracking.service.ts";

export const trackHabit = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const trackingLog = await trackHabitService(req.params.id as string, req.userId);

    res.status(201).json({
      success: true,
      message: "Habit marked as completed",
      trackingLog,
    });
  } catch (error) {
    next(error);
  }
};

export const getHabitHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {history, streak} = await getHabitHistoryService(req.params.id as string, req.userId);

    res.status(200).json({
      success: true,
      message: "Habit history fetched successfully",
      history,
      streak
    });
  } catch (error) {
    next(error);
  }
};
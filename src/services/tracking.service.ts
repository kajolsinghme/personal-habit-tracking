import Habit from "../models/habit.model.ts";
import TrackingLog from "../models/tracking-log.model.ts";
import { AppError } from "../utils/errors.ts";

export const trackHabitService = async (habitId: string, userId: string) => {
  const habit = await Habit.findOne({ _id: habitId, user: userId });

  if (!habit) {
    throw new AppError("Habit not found", 404);
  }

  const date = new Date().toISOString().split("T")[0];

  try {
    const trackingLog = await TrackingLog.create({
      habit: habitId,
      user: userId,
      date,
    });

    return trackingLog;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new AppError("Habit already completed today", 409);
    }
    throw error
  }
};

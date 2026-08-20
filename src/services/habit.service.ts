import Habit from "../models/habit.model.ts";
import { AppError } from "../utils/errors.ts";
import type { CreateHabitInput } from "../validators/habit.validator.ts";

export const createHabitService = async (
  userId: string,
  data: CreateHabitInput,
) => {
  const habit = await Habit.create({
    user: userId,
    title: data.title,
    description: data.description,
    frequency: data.frequency,
  });

  return habit;
};

export const getAllHabitsService = async (userId: string) => {
  const habits = await Habit.find({ user: userId }).sort({ createdAt: -1 });

  return habits;
};

export const getHabitByIdService = async (
  habitId: string,
  userId: string,
) => {
  const habit = await Habit.findOne({
    _id: habitId,
    user: userId,
  });

  if (!habit) {
    throw new AppError("Habit not found", 404);
  }

  return habit;
};
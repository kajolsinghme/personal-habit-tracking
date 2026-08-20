import Habit from "../models/habit.model.ts";
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
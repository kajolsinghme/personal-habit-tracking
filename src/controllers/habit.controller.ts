import type { Request, Response, NextFunction } from "express";
import {
  createHabitService,
  getAllHabitsService,
  getHabitByIdService,
  updateHabitService,
} from "../services/habit.service.ts";

export const createHabit = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const habit = await createHabitService(req.userId!, req.body);

    res.status(201).json({
      success: true,
      message: "Habit created successfully",
      habit,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllHabits = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const habits = await getAllHabitsService(req.userId!);

    res.status(200).json({
      success: true,
      message: "Habits retrieved successfully",
      habits,
    });
  } catch (error) {
    next(error);
  }
};

export const getHabitById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const habit = await getHabitByIdService(
      req.params.id as string,
      req.userId!,
    );

    res.status(200).json({
      success: true,
      habit,
    });
  } catch (error) {
    next(error);
  }
};

export const updateHabit = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const habit = await updateHabitService(
      req.params.id as string,
      req.userId!,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Habit updated successfully",
      habit,
    });
  } catch (error) {
    next(error);
  }
};
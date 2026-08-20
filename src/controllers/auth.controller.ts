import type { Request, Response, NextFunction } from "express";
import { registerUser } from "../services/auth.service.ts";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await registerUser(req.body);

    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

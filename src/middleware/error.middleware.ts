import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.ts";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(error);

  if (error instanceof AppError) {
    const appError = error as AppError;

    res.status(appError.statusCode).json({
      success: false,
      message: appError.message,
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
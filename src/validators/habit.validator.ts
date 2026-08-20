import { z } from "zod";

export const createHabitSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),

  description: z.string().trim().optional(),

  frequency: z.enum(["daily", "weekly"], {
    message: "Frequency must be daily or weekly",
  }),
});

export const updateHabitSchema = z.object({
  title: z.string().trim().min(1, "Title is required").optional(),

  description: z.string().trim().optional(),

  frequency: z
    .enum(["daily", "weekly"], {
      message: "Frequency must be daily or weekly",
    })
    .optional(),
});

export type CreateHabitInput = z.infer<typeof createHabitSchema>;
export type UpdateHabitInput = z.infer<typeof updateHabitSchema>;

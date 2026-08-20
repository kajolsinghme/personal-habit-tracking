import mongoose, { Schema } from "mongoose";

export interface IHabit {
  user: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  frequency: "daily" | "weekly";
}

const habitSchema = new Schema<IHabit>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Habit = mongoose.model<IHabit>("Habit", habitSchema);

export default Habit;
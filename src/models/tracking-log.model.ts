import mongoose, { Schema } from "mongoose";

export interface ITrackingLog {
  habit: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  date: string;
}

const trackingLogSchema = new Schema(
  {
    habit: {
      type: Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

trackingLogSchema.index({ habit: 1, date: 1 }, { unique: true });

const TrackingLog = mongoose.model<ITrackingLog>(
  "TrackingLog",
  trackingLogSchema,
);

export default TrackingLog;

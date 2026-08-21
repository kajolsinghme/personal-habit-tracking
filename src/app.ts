import express from "express";
import authRoutes from "./routes/auth.routes";
import habitRoutes from "./routes/habit.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.use("/", authRoutes);
app.use("/", habitRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up",
  });
});

app.use(errorMiddleware);

export default app;
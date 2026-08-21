import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import habitRoutes from "./routes/habit.routes";
import { errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

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

const PORT = process.env.PORT || 4000;

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

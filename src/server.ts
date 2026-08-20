import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.ts";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

const PORT = process.env.PORT || 4000;

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

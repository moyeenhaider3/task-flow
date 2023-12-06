import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import taskRouter from "./routes/task.js";
import userRouter from "./routes/user.js";

export const app = express();

config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task",taskRouter);

app.get("/", (req, res) => {
  res.send("Welcome Home!.");
});

// Using Error Middleware
app.use(errorMiddleware);

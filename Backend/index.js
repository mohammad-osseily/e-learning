import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js"; // Ensure the path is correct
import classRouter from "./routes/classRoutes.js";
import enrollmentRouter from "./routes/enrollmentRoutes.js";
import withdrawalRouter from "./routes/withdrawalRoutes.js";
dotenv.config();

const app = express();
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust based on your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/api/users", userRouter);
app.use("/api/classes", classRouter);
app.use("/api/enrollment", enrollmentRouter);
app.use("/api/withdrawal", withdrawalRouter);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected to MongoDB & listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));

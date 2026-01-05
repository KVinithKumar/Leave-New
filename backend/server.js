import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import staffRoutes from "./routes/staffRoute.js";
import studentRoutes from "./routes/studentRoute.js";
import leaveRoutes from "./routes/leaveRoute.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

const app = express();

/* ---------- MIDDLEWARES ---------- */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

/* ---------- DATABASE ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

/* ---------- ROUTES ---------- */
app.use("/api/staff", staffRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/leave-request", leaveRoutes);
app.use("/api/auth", authRoutes);


/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend running successfully" });
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import {
  getAttendance,
  updateAttendance,
  submitAttendance,
  attendanceSummary
} from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply protection to all routes
router.use(protect);

router.get("/", getAttendance);                 // fetch / create daily
router.patch("/:id", updateAttendance);         // mark status
router.post("/submit", submitAttendance);       // lock attendance
router.get("/summary", attendanceSummary);   // attendance summary
export default router;

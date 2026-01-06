import express from "express";
import {
  getAttendance,
  updateAttendance,
  submitAttendance,
  attendanceSummary
} from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", getAttendance);                 // fetch / create daily
router.patch("/:id", updateAttendance);         // mark status
router.post("/submit", submitAttendance);       // lock attendance
router.get("/summary", attendanceSummary);   // attendance summary
export default router;

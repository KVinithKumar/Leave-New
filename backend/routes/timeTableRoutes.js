import express from "express";
import {
  addTimetable,
  getTimetable,
  updateTimetable,
  deleteTimetable,
  searchTimetable,
  getTodayTimetable
} from "../controllers/timeTableController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply protection to all routes
router.use(protect);

router.get("/today", getTodayTimetable);
router.post("/add", addTimetable);
router.get("/search", searchTimetable);
router.get("/:className/:section", getTimetable);
router.put("/update/:id", updateTimetable);
router.delete("/delete/:id", deleteTimetable);

export default router;

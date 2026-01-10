import express from "express";
import {
  createAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("Principal", "Admin"), createAnnouncement);
router.get("/", getAllAnnouncements); // Staff and Students can also view
router.put("/:id", authorize("Principal", "Admin"), updateAnnouncement);
router.delete("/:id", authorize("Principal", "Admin"), deleteAnnouncement);

export default router;

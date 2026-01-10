import express from "express";
import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  bulkDeleteStaff,
  getTeachers
} from "../controllers/staffController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes (if any) - None for staff management

// Protected routes
router.use(protect);

router.post("/", authorize("Principal"), createStaff);
router.get("/", authorize("Principal", "Admin"), getAllStaff); // Admin might need to see staff too
router.get("/teachers", authorize("Principal", "Admin", "Staff", "Student"), getTeachers); // Publicly accessible within org? Let's restrict broadly
router.get("/:id", authorize("Principal", "Admin"), getStaffById);
router.put("/:id", authorize("Principal"), updateStaff);
router.delete("/:id", authorize("Principal"), deleteStaff);
router.post("/bulk-delete", authorize("Principal"), bulkDeleteStaff);

export default router;

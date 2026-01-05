import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  bulkDeleteStaff,
} from "../controllers/staffController.js";
import express from "express";

const router = express.Router();

router.post("/", createStaff);
router.get("/", getAllStaff);
router.get("/:id", getStaffById);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);
router.post("/bulk-delete", bulkDeleteStaff);

export default router;

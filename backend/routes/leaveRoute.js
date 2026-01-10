import express from 'express';
import { upload, createLeaveRequest } from '../controllers/leaveController.js';
import LeaveRequest from "../models/LeaveRequest.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply protection to all routes
router.use(protect);

router.post(
  "/submit",
  (req, res, next) => {
    upload.fields([
      { name: "studentPhoto", maxCount: 1 },
      { name: "guardianPhoto", maxCount: 1 },
    ])(req, res, (err) => {
      if (err) {
        console.error("MULTER ERROR:", err);
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
          error: err.message,
        });
      }
      next();
    });
  },
  createLeaveRequest
);
router.get("/", async (req, res) => {
  try {
    const leaves = await LeaveRequest.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    console.error("FETCH LEAVES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leave history",
    });
  }
});

export default router;

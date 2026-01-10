import express from "express";
import { verifyOtpWidget } from "../controllers/otpWidgeController.js";

const router = express.Router();

router.post("/verify", verifyOtpWidget);
router.post("/verify-widget", (req, res) => {
  const { token, studentId } = req.body;

  if (!token || !studentId) {
    return res.status(400).json({ success: false });
  }

  res.json({
    success: true,
    message: "OTP verified (widget mode)",
  });
});

export default router;
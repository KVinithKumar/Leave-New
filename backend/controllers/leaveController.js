import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import LeaveRequest from "../models/LeaveRequest.js";
import cloudinary from "../config/cloudinary.js";

/* ================================
   CONFIG
================================ */
const MAX_LOGS_PER_STUDENT = 2; // keep latest 4 leave requests

/* ================================
   CLOUDINARY STORAGE
================================ */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const { studentId } = req.body;

    const studentClass = req.body.studentClass || "UNKNOWN_CLASS";
    const studentSection = req.body.studentSection || "UNKNOWN_SECTION";

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    return {
      folder: `leave_requests/Class_${studentClass}-${studentSection}/Roll_${studentId}/${timestamp}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      resource_type: "image",
      overwrite: false,
    };
  },
});

/* ================================
   MULTER
================================ */
export const upload = multer({ storage });

/* ================================
   CREATE LEAVE REQUEST
================================ */
export const createLeaveRequest = async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      staffId,
      leaveReason,
      startDate,
      endDate,
    } = req.body;

    let studentPhotoUrl = "";
    let guardianPhotoUrl = "";
    let studentPhotoPublicId = "";
    let guardianPhotoPublicId = "";

    if (req.files?.studentPhoto) {
      studentPhotoUrl = req.files.studentPhoto[0].path;
      studentPhotoPublicId = req.files.studentPhoto[0].public_id;
    }

    if (req.files?.guardianPhoto) {
      guardianPhotoUrl = req.files.guardianPhoto[0].path;
      guardianPhotoPublicId = req.files.guardianPhoto[0].public_id;
    }

    /* ================================
       SAVE NEW LEAVE
    ================================ */
    const newLeave = await LeaveRequest.create({
      studentId,
      studentName,
      staffId,
      leaveReason,
      startDate,
      endDate,
      studentPhotoUrl,
      guardianPhotoUrl,
      studentPhotoPublicId,
      guardianPhotoPublicId,
      status: "pending",
    });

    if (req.user) {
        await logAction({
          action: "CREATE_LEAVE_REQUEST",
          userId: req.user._id,
          role: req.user.role,
          email: req.user.email,
          ip: req.ip,
          details: { studentName, startDate, endDate },
        });
    }

    /* ================================
       AUTO DELETE OLD LOGS
    ================================ */
    const allLeaves = await LeaveRequest.find({ studentId }).sort({
      createdAt: 1, // oldest first
    });

    if (allLeaves.length > MAX_LOGS_PER_STUDENT) {
      const excessLeaves = allLeaves.slice(
        0,
        allLeaves.length - MAX_LOGS_PER_STUDENT
      );

      for (const leave of excessLeaves) {
        try {
          if (leave.studentPhotoPublicId) {
            const res1 = await cloudinary.uploader.destroy(
              leave.studentPhotoPublicId,
              { resource_type: "image" }
            );
            console.log("Student photo delete:", res1);
          }

          if (leave.guardianPhotoPublicId) {
            const res2 = await cloudinary.uploader.destroy(
              leave.guardianPhotoPublicId,
              { resource_type: "image" }
            );
            console.log("Guardian photo delete:", res2);
          }

          await leave.deleteOne();
        } catch (err) {
          console.error("AUTO DELETE FAILED:", err.message);
        }
      }
    }

    res.status(201).json({
      success: true,
      message: "Leave request submitted successfully",
      data: newLeave,
    });
  } catch (error) {
    console.error("LEAVE REQUEST ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

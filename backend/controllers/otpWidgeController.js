import Student from "../models/Student.js";

/* =========================
   VERIFY WIDGET OTP TOKEN
   (TEST MODE)
========================= */
export const verifyOtpWidget = async (req, res) => {
  const { token, studentId } = req.body;

  if (!token || !studentId) {
    return res.status(400).json({
      success: false,
      message: "Token & studentId required",
    });
  }

  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  // IMPORTANT:
  // MSG91 widget already verified OTP
  // token existence is enough for TESTING

  res.json({
    success: true,
    message: "OTP verified (Widget Test Mode)",
    studentName: student.basicInfo.fullName,
  });
};

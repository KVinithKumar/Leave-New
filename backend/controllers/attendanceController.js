import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";

/* =========================
   GET ATTENDANCE (DAILY)
========================== */
export const getAttendance = async (req, res) => {
  try {
    const { class: cls, section, date } = req.query;

    if (!cls || !section || !date) {
      return res.status(400).json({ message: "Class, section, date required" });
    }

    const day = new Date(date);
    day.setHours(0, 0, 0, 0);

    let attendance = await Attendance.find({
      class: cls,
      section,
      date: day,
    }).populate("studentId", "basicInfo.fullName");

    if (attendance.length === 0) {
      const students = await Student.find({
        "basicInfo.class": cls,
        "basicInfo.section": section,
        status: "Active",
      });

      const records = students.map((s) => ({
        studentId: s._id,
        roll: s.basicInfo.rollNumber,
        class: cls,
        section,
        date: day,
        status: "Not Marked",
      }));

      await Attendance.insertMany(records);

      attendance = await Attendance.find({
        class: cls,
        section,
        date: day,
      }).populate("studentId", "basicInfo.fullName");
    }

    res.json(attendance);
  } catch (err) {
    console.error("GET ATTENDANCE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE ATTENDANCE STATUS
========================== */
export const updateAttendance = async (req, res) => {
  try {
    const { status } = req.body;

    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    // ✅ allow update anytime
    attendance.status = status;
    await attendance.save();

    if (req.user) {
        await logAction({
          action: "UPDATE_ATTENDANCE",
          userId: req.user._id,
          role: req.user.role,
          email: req.user.email,
          ip: req.ip,
          details: { studentId: attendance.studentId, date: attendance.date, status },
        });
    }

    res.json(attendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   SUBMIT ATTENDANCE
========================== */
export const submitAttendance = async (req, res) => {
  try {
    const { class: cls, section, date } = req.body;

    const day = new Date(date);
    day.setHours(0, 0, 0, 0);

    // ✅ no locking, only confirmation
    res.json({ message: "Attendance submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const attendanceSummary = async (req, res) => {
  const day = new Date(req.query.date);
  day.setHours(0,0,0,0);

  const records = await Attendance.find({ date: day });

  const total = records.length;
  const present = records.filter(r => r.status === "Present").length;
  const absent = records.filter(r => r.status === "Absent").length;
  const sick = records.filter(r => r.status === "Sick").length;
  const leave = records.filter(r => r.status === "Leave").length;

  const percentage = total
    ? ((present / total) * 100).toFixed(1)
    : 0;

  res.json({ total, present, absent, sick, leave, percentage });
};

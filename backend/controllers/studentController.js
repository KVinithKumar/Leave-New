import Student from "../models/Student.js";
import Attendance from "../models/Attendance.js";

/* =========================
   CREATE STUDENT
========================== */
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      roll,
      class: studentClass,
      section,
      gender,
      daysschoolarhostel,
      roomno,
      dob,
      phone,
      email,
      address,
      fatherName,
      motherName,
      fathermobile,
      fatheroccupation,
      motheroccupation,
      fatheraadhar,
      motheraadhar,
      attendance,
    } = req.body;

    const student = new Student({
      basicInfo: {
        fullName: name,
        rollNumber: roll,
        class: studentClass,
        section,
        gender,
        studentType: daysschoolarhostel === "hostel" ? "Hostel" : "Day Scholar",
        roomNumber: roomno || "",
        dateOfBirth: dob,
      },
      contactInfo: {
        studentPhoneNumber: phone,
        email,
        address,
      },
      parentInfo: {
        fatherName,
        motherName,
        fatherMobile: fathermobile,
        fatherOccupation: fatheroccupation,
        motherOccupation: motheroccupation,
        fatherAadhar: fatheraadhar,
        motherAadhar: motheraadhar,
      },
      academicInfo: {
        attendancePercentage: attendance,
      },
    });

    const savedStudent = await student.save();

    // 🔹 CREATE ATTENDANCE ENTRY
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await Attendance.findOneAndUpdate(
  {
    studentId: savedStudent._id,
    date: today,
  },
  {
    roll: savedStudent.basicInfo.rollNumber,
    class: savedStudent.basicInfo.class,
    section: savedStudent.basicInfo.section,
    status: "Not Marked",
  },
  {
    upsert: true,
    new: true,
  }
);


    res.status(201).json(savedStudent);

  } catch (err) {
    console.error("CREATE STUDENT ERROR:", err);
    res.status(400).json({ message: err.message });
  }
};


/* =========================
   GET ALL STUDENTS
========================== */
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().lean();

    const formatted = students.map(s => ({
      _id: s._id,

      name: s.basicInfo.fullName,
      roll: s.basicInfo.rollNumber,
      class: s.basicInfo.class,
      section: s.basicInfo.section,
      gender: s.basicInfo.gender,
      daysschoolarhostel: s.basicInfo.studentType === "Hostel" ? "hostel" : "schoolar",
      roomno: s.basicInfo.roomNumber,
      dob: s.basicInfo.dateOfBirth,

      phone: s.contactInfo.studentPhoneNumber,
      email: s.contactInfo.email,
      address: s.contactInfo.address,

      fatherName: s.parentInfo.fatherName,
      motherName: s.parentInfo.motherName,
      fathermobile: s.parentInfo.fatherMobile,
      fatheroccupation: s.parentInfo.fatherOccupation,
      motheroccupation: s.parentInfo.motherOccupation,
      fatheraadhar: s.parentInfo.fatherAadhar,
      motheraadhar: s.parentInfo.motherAadhar,

      attendance: `${s.academicInfo.attendancePercentage}%`,
      status: s.status,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =========================
   GET STUDENT BY ID
========================== */
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE STUDENT
========================== */
export const updateStudent = async (req, res) => {
  try {
    const data = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const oldRoll = student.basicInfo.rollNumber;
    const oldClass = student.basicInfo.class;
    const oldSection = student.basicInfo.section;

    const updatedStudent = {
      basicInfo: {
        fullName: data.name,
        rollNumber: data.roll,
        class: data.class,
        section: data.section,
        gender: data.gender,
        studentType: data.daysschoolarhostel === "hostel" ? "Hostel" : "Day Scholar",
        roomNumber: data.roomno || "",
        dateOfBirth: data.dob,
      },
      contactInfo: {
        studentPhoneNumber: data.phone,
        email: data.email,
        address: data.address,
      },
      parentInfo: {
        fatherName: data.fatherName,
        motherName: data.motherName,
        fatherMobile: data.fathermobile,
        fatherOccupation: data.fatheroccupation,
        motherOccupation: data.motheroccupation,
        fatherAadhar: data.fatheraadhar,
        motherAadhar: data.motheraadhar,
      },
      academicInfo: {
        attendancePercentage: data.attendance,
      },
    };

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      updatedStudent,
      { new: true, runValidators: true }
    );

    // 🔹 UPDATE ATTENDANCE RECORDS
    await Attendance.updateMany(
      {
        studentId: updated._id,
        roll: oldRoll,
        class: oldClass,
        section: oldSection,
      },
      {
        roll: updated.basicInfo.rollNumber,
        class: updated.basicInfo.class,
        section: updated.basicInfo.section,
      }
    );

    res.json(updated);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


/* =========================
   DELETE STUDENT
========================== */
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 🔹 DELETE ATTENDANCE RECORDS
    await Attendance.deleteMany({ studentId: student._id });

    // 🔹 DELETE STUDENT
    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: "Student and attendance deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


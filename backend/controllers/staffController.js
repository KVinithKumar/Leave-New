import Staff from "../models/Staff.js";

/* =========================
   AUTO EMPLOYEE ID GENERATOR
========================== */


/* AUTO EMPLOYEE ID */
const generateEmployeeId = async () => {
  const last = await Staff.findOne().sort({ createdAt: -1 });
  if (!last?.contactInfo?.employeeId) return "TCH001";
  const num = Number(last.contactInfo.employeeId.replace("TCH", ""));
  return `TCH${String(num + 1).padStart(3, "0")}`;
};

export const createStaff = async (req, res) => {
  try {
    const data = req.body;

    const staff = new Staff({
      personalInfo: {
        fullName: data.fullName,
        fatherName: data.fatherName,
        motherName: data.motherName,
        dateOfBirth: data.dob,
        gender:
          data.gender === "male"
            ? "Male"
            : data.gender === "female"
            ? "Female"
            : "Other",
        aadharNumber: data.aadharNumber,
      },

      contactInfo: {
        phoneNumber: data.phoneNumber,
        email: data.email,
        emergencyContact: data.emergencyContact,
        employeeId: data.employeeId || (await generateEmployeeId()),
      },

      addressInfo: {
        currentAddress: data.currentAddress,
        permanentAddress: data.permanentAddress,
      },

      professionalInfo: {
        qualification: data.qualification,
        experienceYears: Number(data.experience),
        subjectSpecialization: data.subjectSpecialization,
        subjectDealing: data.subjectDealing,
        teacherType:
          data.teacherType === "primary"
            ? "Primary Teacher"
            : "Secondary Teacher",
      },

      assignedClasses: data.assignedClasses || [],
      assignedSections: data.assignedSections || [],
    });

    await staff.save();
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// GET ALL STAFF (CRITICAL FIX)
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().lean();

    const formatted = staff.map(s => ({
      _id: s._id,

      // Personal
      fullName: s.personalInfo.fullName,
      fatherName: s.personalInfo.fatherName,
      motherName: s.personalInfo.motherName,
      dob: s.personalInfo.dateOfBirth,
      gender: s.personalInfo.gender,
      aadharNumber: s.personalInfo.aadharNumber,

      // Contact
      employeeId: s.contactInfo.employeeId,
      phoneNumber: s.contactInfo.phoneNumber,
      email: s.contactInfo.email,
      emergencyContact: s.contactInfo.emergencyContact,

      // Address
      currentAddress: s.addressInfo.currentAddress,
      permanentAddress: s.addressInfo.permanentAddress,

      // Professional
      qualification: s.professionalInfo.qualification,
      experience: s.professionalInfo.experienceYears,
      subjectSpecialization: s.professionalInfo.subjectSpecialization,
      subjectDealing: s.professionalInfo.subjectDealing,
      teacherType:
        s.professionalInfo.teacherType === "Primary Teacher"
          ? "primary"
          : "secondary",

      assignedClasses: s.assignedClasses,
      assignedSections: s.assignedSections,
      status: "Active"
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("GET STAFF ERROR:", err);
    res.status(500).json({ message: "Failed to fetch staff" });
  }
};


/* =========================
   GET STAFF BY ID
========================== */
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE STAFF
========================== */
export const updateStaff = async (req, res) => {
  try {
    const data = req.body;

    const updated = {
      personalInfo: {
        fullName: data.fullName,
        fatherName: data.fatherName,
        motherName: data.motherName,
        dateOfBirth: data.dob,
        gender:
          data.gender === "male"
            ? "Male"
            : data.gender === "female"
            ? "Female"
            : "Other",
        aadharNumber: data.aadharNumber,
      },
      contactInfo: {
        phoneNumber: data.phoneNumber,
        email: data.email,
        emergencyContact: data.emergencyContact,
        employeeId: data.employeeId,
      },
      addressInfo: {
        currentAddress: data.currentAddress,
        permanentAddress: data.permanentAddress,
      },
      professionalInfo: {
        qualification: data.qualification,
        experienceYears: Number(data.experience),
        subjectSpecialization: data.subjectSpecialization,
        subjectDealing: data.subjectDealing,
        teacherType:
          data.teacherType === "primary"
            ? "Primary Teacher"
            : "Secondary Teacher",
      },
      assignedClasses: data.assignedClasses,
      assignedSections: data.assignedSections,
    };

    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      updated,
      { new: true }
    );

    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   DELETE STAFF
========================== */
export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   BULK DELETE STAFF
========================== */
export const bulkDeleteStaff = async (req, res) => {
  try {
    const { ids } = req.body; // array of staff IDs
    await Staff.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Selected staff deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

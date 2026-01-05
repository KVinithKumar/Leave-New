import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    /* =========================
       BASIC INFORMATION
    ========================== */
    basicInfo: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      rollNumber: {
        type: Number,
        required: true,
      },
      class: {
        type: String,
        required: true, // Class 1, Class 2, ...
      },
      section: {
        type: String,
        required: true, // A, B, C
      },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      studentType: {
        type: String,
        enum: ["Day Scholar", "Hostel"],
        required: true,
      },
      roomNumber: {
        type: String, // Only for hostel students
        default: "",
      },
      dateOfBirth: {
        type: Date,
      },
    },

    /* =========================
       CONTACT INFORMATION
    ========================== */
    contactInfo: {
      studentPhoneNumber: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/,
      },
      email: {
        type: String,
        lowercase: true,
      },
      address: {
        type: String,
        required: true,
      },
    },

    /* =========================
       PARENT INFORMATION
    ========================== */
    parentInfo: {
      fatherName: {
        type: String,
        required: true,
      },
      motherName: {
        type: String,
        required: true,
      },
      fatherMobile: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/,
      },
      fatherOccupation: {
        type: String,
      },
      motherOccupation: {
        type: String,
      },
      fatherAadhar: {
        type: String,
        match: /^[0-9]{12}$/,
      },
      motherAadhar: {
        type: String,
        match: /^[0-9]{12}$/,
      },
    },

    /* =========================
       ACADEMIC INFORMATION
    ========================== */
    academicInfo: {
      attendancePercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
    },

    /* =========================
       STATUS & SYSTEM FIELDS
    ========================== */
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

/* =========================
   UNIQUE INDEX
   (Roll Number per Class & Section)
========================== */
studentSchema.index(
  {
    "basicInfo.rollNumber": 1,
    "basicInfo.class": 1,
    "basicInfo.section": 1,
  },
  { unique: true }
);

export default mongoose.model("Student", studentSchema);

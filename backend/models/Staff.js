import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const staffSchema = new mongoose.Schema(
  {
    personalInfo: {
      fullName: { type: String, required: true },
      fatherName: { type: String, required: true },
      motherName: { type: String, required: true },
      dateOfBirth: { type: Date, required: true },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      aadharNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{12}$/,
      },
    },

    contactInfo: {
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      emergencyContact: { type: String, required: true },
      employeeId: {
        type: String,
        unique: true,
        index: true,
      },
    },

    addressInfo: {
      currentAddress: { type: String, required: true },
      permanentAddress: { type: String, required: true },
    },

    professionalInfo: {
      qualification: { type: String, required: true },
      experienceYears: { type: Number, required: true },
      subjectSpecialization: { type: String, required: true },
      subjectDealing: { type: String, required: true },
      teacherType: {
        type: String,
        enum: ["Primary Teacher", "Secondary Teacher"],
        required: true,
      },
    },

    assignedClasses: [String],
    assignedSections: [String],

    status: { type: String, default: "Active" },
    
    password: { type: String, required: true },
    role: { type: String, default: "Staff" },
  },
  { timestamps: true }
);

// Hash password before saving
staffSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err;
  }
});

// Compare password method
staffSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Staff", staffSchema);
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Staff from "./models/Staff.js";

dotenv.config({ path: "./.env" });

const seedStaff = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const staffEmail = "teacher@kodebloom.com";
    const existingStaff = await Staff.findOne({ "contactInfo.email": staffEmail });

    if (existingStaff) {
      console.log("Staff already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("teacher123", 10);
    const staff = new Staff({
      personalInfo: {
        fullName: "John Smith",
        fatherName: "Robert Smith",
        motherName: "Mary Smith",
        dateOfBirth: new Date("1985-05-15"),
        gender: "Male",
        aadharNumber: "987654321098",
      },
      contactInfo: {
        phoneNumber: "9876543210",
        email: staffEmail,
        emergencyContact: "9876543211",
        employeeId: "TCH001",
      },
      addressInfo: {
        currentAddress: "456 Teacher Lane, Education City",
        permanentAddress: "456 Teacher Lane, Education City",
      },
      professionalInfo: {
        qualification: "M.Ed",
        experienceYears: 8,
        subjectSpecialization: "Mathematics",
        subjectDealing: "Mathematics",
        teacherType: "Secondary Teacher",
      },
      assignedClasses: ["10", "9", "8"],
      assignedSections: ["A", "B", "C"],
      status: "Active",
      password: hashedPassword,
      role: "Staff",
    });

    await staff.save();
    console.log("Staff created successfully");
    console.log("Email: teacher@kodebloom.com");
    console.log("Password: teacher123");
    process.exit();
  } catch (error) {
    console.error("Error seeding staff:", error);
    process.exit(1);
  }
};

seedStaff();
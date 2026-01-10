import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config({ path: "./.env" });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const adminEmail = "admin@kodebloom.com";
    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = new Admin({
      name: "Super Admin",
      email: adminEmail,
      password: "adminpassword123", // Will be hashed by pre-save hook
      role: "Admin",
    });

    await admin.save();
    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();

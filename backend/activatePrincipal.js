import mongoose from "mongoose";
import dotenv from "dotenv";
import Principal from "./models/principal.js";

dotenv.config({ path: "./.env" });

const activatePrincipal = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const principal = await Principal.findOne({ email: "principal@gmail.com" });

    if (!principal) {
      console.log("Principal not found");
      process.exit(1);
    }

    principal.isActive = true;
    await principal.save();

    console.log("Principal account activated successfully");
    process.exit();
  } catch (error) {
    console.error("Error activating principal:", error);
    process.exit(1);
  }
};

activatePrincipal();
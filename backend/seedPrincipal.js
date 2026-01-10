import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Principal from "./models/principal.js";

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    const existingPrincipal = await Principal.findOne({ email: "principal@gmail.com" });
    if (existingPrincipal) {
      console.log("Principal already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("principal123", 10);
    const newPrincipal = new Principal({
      email: "principal@gmail.com",
      password: hashedPassword,
    });

    await newPrincipal.save();
    console.log("Principal created successfully");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

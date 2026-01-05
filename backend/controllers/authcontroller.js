import Principal from "../models/Principal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginPrincipal = async (req, res) => {
  try {
    const { email, password } = req.body;

    const principal = await Principal.findOne({ email });
    if (!principal) {
      return res.status(404).json({ message: "Principal not found" });
    }

    const isMatch = await bcrypt.compare(password, principal.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: principal._id, role: "principal" }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });

    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

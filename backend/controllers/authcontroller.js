import Admin from "../models/Admin.js";
import Principal from "../models/principal.js";
import Staff from "../models/Staff.js";
import jwt from "jsonwebtoken";
import { logAction } from "../utils/logAction.js";

// Helper to generate token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1d",
  });
};

// Generic Login Handler
const handleLogin = async (req, res, Model, roleName) => {
  try {
    const { email, password } = req.body;
    const ip = req.ip;

    // Normalize email to lowercase for case-insensitive search
    const normalizedEmail = email.toLowerCase().trim();

    // Try to find user by email (different models have different email locations)
    let user;
    if (roleName === "Staff") {
      // Staff model has email in contactInfo.email
      user = await Model.findOne({ "contactInfo.email": normalizedEmail });
    } else {
      // Admin and Principal models have email at top level
      user = await Model.findOne({ email: normalizedEmail });
    }

    if (!user) {
      await logAction({
        action: "LOGIN_FAILED",
        email: normalizedEmail,
        ip,
        role: roleName,
        details: { reason: "User not found" },
      });
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await logAction({
        action: "LOGIN_FAILED",
        userId: user._id,
        email: normalizedEmail,
        ip,
        role: roleName,
        details: { reason: "Invalid credentials" },
      });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check active status if applicable
    if (roleName === "Principal" && !user.isActive) {
      await logAction({
        action: "LOGIN_FAILED",
        userId: user._id,
        role: roleName,
        email: normalizedEmail,
        ip,
        details: { reason: "Account inactive" },
      });
      return res.status(403).json({ message: "Account is not active. Please contact Admin." });
    }
    
    // Staff status check
    if (roleName === "Staff" && user.status !== "Active") {
      await logAction({
        action: "LOGIN_FAILED",
        userId: user._id,
        role: roleName,
        email: normalizedEmail,
        ip,
        details: { reason: "Account is not active" },
      });
      return res.status(403).json({ message: "Account is not active." });
    }

    const token = generateToken(user._id, roleName);

    // Get the correct email and name fields based on role
    const userEmail = roleName === "Staff" 
      ? (user.contactInfo && user.contactInfo.email) 
      : user.email;
    
    const userName = roleName === "Staff"
      ? (user.personalInfo && user.personalInfo.fullName)
      : user.name;

    await logAction({
      action: "LOGIN",
      userId: user._id,
      role: roleName,
      email: userEmail,
      ip,
      details: { message: "Login successful" },
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: userName,
        email: userEmail,
        role: roleName,
      },
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const loginAdmin = (req, res) => handleLogin(req, res, Admin, "Admin");
export const loginPrincipal = (req, res) => handleLogin(req, res, Principal, "Principal");
export const loginStaff = (req, res) => handleLogin(req, res, Staff, "Staff");

export const logoutUser = async (req, res) => {
    const { id, role, email } = req.user || {};
    await logAction({
        action: "LOGOUT",
        userId: id,
        role,
        email,
        ip: req.ip,
    });
    res.status(200).json({ message: "Logged out successfully" });
};

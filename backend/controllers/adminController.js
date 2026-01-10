import Principal from "../models/principal.js";
import Log from "../models/Log.js";
import Admin from "../models/Admin.js";
import { logAction } from "../utils/logAction.js";
import bcrypt from "bcryptjs";

/**
 * CREATE PRINCIPAL
 */
export const createPrincipal = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if principal already exists
    const existingPrincipal = await Principal.findOne({ email });
    if (existingPrincipal) {
      return res.status(400).json({ message: "Principal with this email already exists" });
    }

    const principal = new Principal({
      email,
      password, // Password hashing is handled in the model pre-save hook
      isActive: false, // Default to inactive until approved? Or maybe true if admin creates it.
      // Let's assume Admin creating it means it's approved, OR we follow the "approve" flow.
      // Based on "approvePrincipal" existing, maybe it defaults to false.
      // But usually if Admin creates it, it should be active.
      // However, the previous code had an "approve" button. Let's keep it consistent.
    });

    await principal.save();

    await logAction({
      action: "CREATE_PRINCIPAL",
      userId: req.user._id,
      role: req.user.role,
      email: req.user.email,
      ip: req.ip,
      details: { createdPrincipalEmail: email }
    });

    res.status(201).json({ message: "Principal account created successfully", principal });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * APPROVE PRINCIPAL
 */
export const approvePrincipal = async (req, res) => {
  try {
    const { id } = req.params;
    const principal = await Principal.findById(id);

    if (!principal) {
      return res.status(404).json({ message: "Principal not found" });
    }

    principal.isActive = true;
    await principal.save();

    await logAction({
      action: "APPROVE_PRINCIPAL",
      userId: req.user._id,
      role: req.user.role,
      email: req.user.email,
      ip: req.ip,
      details: { approvedPrincipalId: id, email: principal.email }
    });

    res.json({ message: "Principal approved successfully", principal });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * DELETE PRINCIPAL
 */
export const deletePrincipal = async (req, res) => {
  try {
    const { id } = req.params;
    const principal = await Principal.findByIdAndDelete(id);

    if (!principal) {
      return res.status(404).json({ message: "Principal not found" });
    }

    await logAction({
      action: "DELETE_PRINCIPAL",
      userId: req.user._id,
      role: req.user.role,
      email: req.user.email,
      ip: req.ip,
      details: { deletedPrincipalEmail: principal.email }
    });

    res.json({ message: "Principal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * GET ALL PRINCIPALS
 */
export const getAllPrincipals = async (req, res) => {
  try {
    const principals = await Principal.find().select("-password");
    res.json(principals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * GET SYSTEM LOGS
 */
export const getLogs = async (req, res) => {
  try {
    const { limit = 100, page = 1, email, role, action, startDate, endDate } = req.query;
    console.log("getLogs called with params:", { limit, page, email, role, action, startDate, endDate });
    
    // Build query object
    let query = {};
    if (email && email.trim() !== "" && email !== "undefined" && email !== "null") {
      try {
        query.email = new RegExp(email.trim(), "i");
      } catch (error) {
        // Invalid regex, skip this filter
        console.warn("Invalid email regex:", email);
      }
    }
    if (role && role.trim() !== "" && role !== "undefined" && role !== "null") query.role = role.trim();
    if (action && action.trim() !== "" && action !== "undefined" && action !== "null") query.action = action.trim();
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate && startDate.trim() !== "" && startDate !== "undefined" && startDate !== "null") {
        const start = new Date(startDate);
        if (!isNaN(start.getTime())) {
          query.createdAt.$gte = start;
        }
      }
      if (endDate && endDate.trim() !== "" && endDate !== "undefined" && endDate !== "null") {
        const end = new Date(endDate);
        if (!isNaN(end.getTime())) {
          query.createdAt.$lte = end;
        }
      }
      // If object is empty after checks, remove it
      if (Object.keys(query.createdAt).length === 0) delete query.createdAt;
    }

    console.log("Built query:", query);

    // Pagination
    const limitNum = parseInt(limit) || 100;
    const pageNum = parseInt(page) || 1;
    const skip = (pageNum - 1) * limitNum;

    const logs = await Log.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Log.countDocuments(query);

    res.json({
      logs,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalLogs: total
    });
  } catch (error) {
    console.error("GET LOGS ERROR:", error);
    res.status(500).json({ message: "Server error fetching logs", error: error.message, stack: error.stack });
  }
};

/**
 * DOWNLOAD LOGS PDF
 */
export const downloadLogsPDF = async (req, res) => {
  try {
    const { email, role, action, startDate, endDate } = req.query;

    let query = {};
    if (email && email.trim() !== "") query.email = new RegExp(email, "i");
    if (role && role.trim() !== "") query.role = role;
    if (action && action.trim() !== "") query.action = action;
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate && startDate.trim() !== "") query.createdAt.$gte = new Date(startDate);
      if (endDate && endDate.trim() !== "") query.createdAt.$lte = new Date(endDate);
      if (Object.keys(query.createdAt).length === 0) delete query.createdAt;
    }

    const logs = await Log.find(query).sort({ createdAt: -1 });

    const doc = new PDFDocument();

    // Set headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=system_logs.pdf");

    // Pipe PDF to response
    doc.pipe(res);

    // Title
    doc.fontSize(20).text("System Activity Logs", { align: "center" });
    doc.moveDown();

    // Filters used
    doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`);
    if (email) doc.text(`Filter Email: ${email}`);
    if (role) doc.text(`Filter Role: ${role}`);
    if (action) doc.text(`Filter Action: ${action}`);
    doc.moveDown();

    // Table Header
    const tableTop = 150;
    let y = tableTop;

    doc.font("Helvetica-Bold");
    doc.text("Time", 50, y);
    doc.text("Action", 200, y);
    doc.text("User", 350, y);
    doc.text("Details", 450, y);
    
    y += 20;
    doc.font("Helvetica");

    // Draw lines
    doc.moveTo(50, y).lineTo(550, y).stroke();
    y += 10;

    // Logs
    logs.forEach((log) => {
      // Check for page break
      if (y > 700) {
        doc.addPage();
        y = 50;
        doc.font("Helvetica-Bold");
        doc.text("Time", 50, y);
        doc.text("Action", 200, y);
        doc.text("User", 350, y);
        doc.text("Details", 450, y);
        y += 20;
        doc.font("Helvetica");
        doc.moveTo(50, y).lineTo(550, y).stroke();
        y += 10;
      }

      const date = new Date(log.createdAt).toLocaleString();
      const details = JSON.stringify(log.details || {}).substring(0, 50); // Truncate details

      doc.text(date, 50, y, { width: 140 });
      doc.text(log.action, 200, y, { width: 140 });
      doc.text(`${log.email} (${log.role})`, 350, y, { width: 90 });
      doc.text(details, 450, y, { width: 100 });

      y += 30; // Row height
    });

    doc.end();

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * UPDATE ADMIN PROFILE
 */
export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const ip = req.ip;

    const admin = await Admin.findById(req.user._id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if email is taken by another admin
    if (email && email !== admin.email) {
      const existing = await Admin.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    const oldEmail = admin.email;
    if (name) admin.name = name;
    if (email) admin.email = email;

    await admin.save();

    await logAction({
      action: "UPDATE_ADMIN_PROFILE",
      userId: req.user._id,
      role: req.user.role,
      email: req.user.email,
      ip,
      details: { oldEmail, newEmail: email, name },
    });

    res.json({
      message: "Profile updated successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * CHANGE ADMIN PASSWORD
 */
export const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const ip = req.ip;

    const admin = await Admin.findById(req.user._id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      await logAction({
        action: "PASSWORD_CHANGE_FAILED",
        userId: req.user._id,
        role: req.user.role,
        email: req.user.email,
        ip,
        details: { reason: "Incorrect current password" },
      });
      return res.status(400).json({ message: "Incorrect current password" });
    }

    admin.password = newPassword;
    await admin.save();

    await logAction({
      action: "CHANGE_ADMIN_PASSWORD",
      userId: req.user._id,
      role: req.user.role,
      email: req.user.email,
      ip,
      details: { message: "Password changed successfully" },
    });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

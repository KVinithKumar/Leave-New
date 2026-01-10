import Announcement from "../models/Announcement.js";
import { logAction } from "../utils/logAction.js";

// Create Announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, targetAudience, priority } = req.body;
    const ip = req.ip;

    const announcement = new Announcement({
      title,
      message,
      targetAudience,
      priority,
      createdBy: req.user._id,
    });

    await announcement.save();

    await logAction({
      action: "CREATE_ANNOUNCEMENT",
      userId: req.user._id,
      role: req.user.role,
      email: req.user.email,
      ip,
      details: { title, targetAudience },
    });

    res.status(201).json({ message: "Announcement created", announcement });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Announcements
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, targetAudience, priority } = req.body;
    const ip = req.ip;

    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { title, message, targetAudience, priority },
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    await logAction({
      action: "UPDATE_ANNOUNCEMENT",
      userId: req.user._id,
      role: req.user.role,
      email: req.user.email,
      ip,
      details: { title, id },
    });

    res.status(200).json({ message: "Announcement updated", announcement });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const ip = req.ip;

    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    await logAction({
      action: "DELETE_ANNOUNCEMENT",
      userId: req.user._id,
      role: req.user.role,
      email: req.user.email,
      ip,
      details: { title: announcement.title, id },
    });

    res.status(200).json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

import Timetable from "../models/timetable.js";
import { logAction } from "../utils/logAction.js";

/**
 * GET TODAY'S TIMETABLE
 */
export const getTodayTimetable = async (req, res) => {
  try {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    // Optional: filter by className/section/teacher if provided in query
    const { className, section, teacher } = req.query;
    
    let query = { day: today };
    if (className) query.className = className;
    if (section) query.section = section;
    if (teacher) query.teacher = new RegExp(teacher, 'i');

    const timetable = await Timetable.find(query)
      .sort({ "period.startTime": 1 });

    res.json({ success: true, day: today, data: timetable });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * ADD CLASS
 */
export const addTimetable = async (req, res) => {
  try {
    const entry = await Timetable.create(req.body);

    // LOGGING
    if (req.user) {
      await logAction({
        action: "CREATE_TIMETABLE",
        userId: req.user._id,
        role: req.user.role,
        email: req.user.email,
        ip: req.ip,
        details: { 
          className: entry.className, 
          section: entry.section,
          subject: entry.subject,
          teacher: entry.teacher,
          day: entry.day,
          period: entry.period
        },
      });
    }

    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This period is already assigned for the class",
      });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

export const searchTimetable = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json({ success: true, data: [] });

    const searchRegex = new RegExp(query, "i");
    const results = await Timetable.find({
      $or: [
        { subject: searchRegex },
        { teacher: searchRegex },
        { room: searchRegex },
        { className: searchRegex }
      ]
    }).sort({ day: 1, "period.id": 1 });

    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET TIMETABLE BY CLASS & SECTION
 */
export const getTimetable = async (req, res) => {
  try {
    const { className, section } = req.params;

    const timetable = await Timetable.find({ className, section })
      .sort({ day: 1, "period.id": 1 });

    res.json({ success: true, data: timetable });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * UPDATE CLASS
 */
export const updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Timetable.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }

    // LOGGING
    if (req.user) {
      await logAction({
        action: "UPDATE_TIMETABLE",
        userId: req.user._id,
        role: req.user.role,
        email: req.user.email,
        ip: req.ip,
        details: { 
          className: updated.className, 
          section: updated.section,
          subject: updated.subject,
          teacher: updated.teacher,
          day: updated.day,
          period: updated.period
        },
      });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE CLASS
 */
export const deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Timetable.findById(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }

    await Timetable.findByIdAndDelete(id);

    // LOGGING
    if (req.user) {
      await logAction({
        action: "DELETE_TIMETABLE",
        userId: req.user._id,
        role: req.user.role,
        email: req.user.email,
        ip: req.ip,
        details: { 
          className: deleted.className, 
          section: deleted.section,
          subject: deleted.subject,
          teacher: deleted.teacher,
          day: deleted.day,
          period: deleted.period
        },
      });
    }

    res.json({ success: true, message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

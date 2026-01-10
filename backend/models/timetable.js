import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true, // "6", "7", "8"
    },

    section: {
      type: String,
      required: true, // "A", "B"
    },

    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      required: true,
    },

    period: {
      id: {
        type: Number,
        required: true, // 1,2,3...
      },
      label: {
        type: String,
        required: true, // "Period 1"
      },
      startTime: {
        type: String,
        required: true, // "08:00"
      },
      endTime: {
        type: String,
        required: true, // "09:00"
      },
    },

    subject: {
      type: String,
      required: true,
    },

    teacher: {
      type: String,
      required: true,
    },

    room: {
      type: String,
      required: true,
    },

    createdBy: {
      type: String,
      default: "Principal",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

/**
 * Prevent duplicate class in same slot
 * (same class + section + day + period)
 */
TimetableSchema.index(
  { className: 1, section: 1, day: 1, "period.id": 1 },
  { unique: true }
);

export default mongoose.model("Timetable", TimetableSchema);

import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    roll: {
      type: Number,
      required: true,
    },

    class: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Leave", "Sick", "Not Marked"],
      default: "Not Marked",
    },

    isFinal: {
      type: Boolean,
      default: false, // locked after submit
    },
  },
  {
    timestamps: true,
  }
);

/* One attendance per student per day */
attendanceSchema.index(
  { studentId: 1, date: 1 },
  { unique: true }
);

export default mongoose.model("Attendance", attendanceSchema);

import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true, // e.g., "LOGIN", "LOGOUT", "CREATE_PRINCIPAL", "APPROVE_PRINCIPAL"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Might be null if login fails or system event
    },
    role: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false, // Store email even if user ID is missing (e.g. failed login)
    },
    details: {
      type: mongoose.Schema.Types.Mixed, // Flexible field for extra info
    },
    ip: {
      type: String,
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

export default Log;

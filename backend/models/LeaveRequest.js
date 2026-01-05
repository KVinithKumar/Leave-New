import mongoose from 'mongoose';

const leaveRequestSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  staffId: {
    type: String,
    required: true
  },
  leaveReason: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  studentPhotoUrl: {
    type: String,
    required: false
  },
  guardianPhotoUrl: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('LeaveRequest', leaveRequestSchema);

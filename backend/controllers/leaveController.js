import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import LeaveRequest from '../models/LeaveRequest.js';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = 'leave_requests';
    if (file.fieldname === 'studentPhoto') {
      folderName = 'leave_requests/student_photos';
    } else if (file.fieldname === 'guardianPhoto') {
      folderName = 'leave_requests/guardian_photos';
    }
    
    return {
      folder: folderName,
      allowed_formats: ['jpg', 'jpeg', 'png'],
      public_id: `${file.fieldname}-${Date.now()}`
    };
  },
});

export const upload = multer({ storage: storage });

// Controller to create leave request
export const createLeaveRequest = async (req, res) => {
  try {
    const { studentId, studentName, staffId, leaveReason, startDate, endDate } = req.body;
    
    let studentPhotoUrl = '';
    let guardianPhotoUrl = '';

    if (req.files && req.files.studentPhoto) {
      studentPhotoUrl = req.files.studentPhoto[0].path;
    }

    if (req.files && req.files.guardianPhoto) {
      guardianPhotoUrl = req.files.guardianPhoto[0].path;
    }

    const newLeaveRequest = new LeaveRequest({
      studentId,
      studentName,
      staffId,
      leaveReason,
      startDate,
      endDate,
      studentPhotoUrl,
      guardianPhotoUrl,
      status: 'pending'
    });

    await newLeaveRequest.save();

    res.status(201).json({
      success: true,
      message: 'Leave request submitted successfully',
      data: newLeaveRequest
    });
  } catch (error) {
    console.error('Error creating leave request:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

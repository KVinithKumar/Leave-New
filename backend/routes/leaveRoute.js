import express from 'express';
import { upload, createLeaveRequest } from '../controllers/leaveController.js';

const router = express.Router();

router.post('/submit', upload.fields([
  { name: 'studentPhoto', maxCount: 1 },
  { name: 'guardianPhoto', maxCount: 1 }
]), createLeaveRequest);

export default router;

import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  markAttendance,
  getStudentAttendance,
  getTeacherAttendanceRecords,
  updateAttendance
} from '../controllers/attendanceController.js';

const router = express.Router();
router.post('/mark', protect, authorize('teacher'), markAttendance);
router.get('/teacher', protect, authorize('teacher'), getTeacherAttendanceRecords);
router.put('/:id', protect, authorize('teacher'), updateAttendance);

router.get('/student/:id', protect, authorize('student'), getStudentAttendance);

export default router; 
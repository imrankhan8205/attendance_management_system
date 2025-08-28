import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/students', protect, authorize('teacher'), async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('name uniRollNo admissionNo contactNo')
      .sort('name');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

export default router; 
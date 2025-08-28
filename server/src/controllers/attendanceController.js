import Attendance from '../models/Attendance.js';
import User from '../models/User.js';


export const markAttendance = async (req, res) => {
  try {
    const { date, subject, attendanceData } = req.body;
    const teacher = req.user._id;

    if (!date || !subject || !attendanceData || !Array.isArray(attendanceData)) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    } 
    const operations = attendanceData.map(record => ({
      updateOne: {
        filter: {
          student: record.studentId,
          date: new Date(date),
          subject
        },
        update: {
          $set: {
            student: record.studentId,
            teacher,
            date: new Date(date),
            subject,
            isPresent: record.isPresent,
            rollNumber: record.rollNumber,
            studentName: record.studentName,
            admissionNo: record.admissionNo
          }
        },
        upsert: true
      }
    }));

    await Attendance.bulkWrite(operations);

    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Duplicate attendance record found' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};


export const getStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, startDate, endDate } = req.query;

    
    const query = { student: id };
    if (subject) query.subject = subject;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const records = await Attendance.find(query)
      .sort({ date: -1 })
      .populate('teacher', 'name')
      .lean();

    
    const stats = await Attendance.aggregate([
      { $match: { student: id } },
      { $group: {
        _id: '$subject',
        total: { $sum: 1 },
        present: { $sum: { $cond: ['$isPresent', 1, 0] } }
      }},
      { $project: {
        subject: '$_id',
        total: 1,
        present: 1,
        percentage: {
          $multiply: [{ $divide: ['$present', '$total'] }, 100]
        }
      }}
    ]);

    res.json({ records, stats });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const getTeacherAttendanceRecords = async (req, res) => {
  try {
    const { subject, date } = req.query;

    const query = { teacher: req.user._id };
    if (subject) query.subject = subject;
    if (date) query.date = new Date(date);

    const records = await Attendance.find(query)
      .sort({ date: -1 })
      .populate('student', 'name rollNumber')
      .lean();
    const students = await User.find({ role: 'student' })
      .select('name rollNumber admissionNo')
      .sort('rollNumber')
      .lean();

    res.json({ 
      records,
      students,
      subjects: ['discrete-math', 'daa', 'coa', 'operating-system']
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPresent } = req.body;

    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    if (attendance.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this record' });
    }

    attendance.isPresent = isPresent;
    await attendance.save();

    res.json({ message: 'Attendance updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 
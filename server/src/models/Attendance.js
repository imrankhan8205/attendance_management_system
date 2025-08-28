import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['discrete-math', 'daa', 'coa', 'operating-system']
  },
  date: {
    type: Date,
    required: true
  },
  isPresent: {
    type: Boolean,
    required: true,
    default: false
  },
  rollNumber: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  admissionNo: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
attendanceSchema.index({ student: 1, date: 1, subject: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance; 
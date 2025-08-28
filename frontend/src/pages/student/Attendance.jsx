import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiCheck, FiX } from 'react-icons/fi';

const subjects = [
  {
    id: 1,
    name: 'Design and Analysis of Algorithms (DAA)',
    code: 'CS301',
    attendance: {
      present: 32,
      total: 40,
      records: [
        { date: '2024-03-01', status: 'present' },
        { date: '2024-03-04', status: 'present' },
        { date: '2024-03-06', status: 'absent' },
        { date: '2024-03-08', status: 'present' },
      ]
    }
  },
  {
    id: 2,
    name: 'Computer Organization and Architecture (COA)',
    code: 'CS302',
    attendance: {
      present: 28,
      total: 35,
      records: [
        { date: '2024-03-01', status: 'present' },
        { date: '2024-03-05', status: 'present' },
        { date: '2024-03-07', status: 'present' },
        { date: '2024-03-12', status: 'absent' },
      ]
    }
  },
  {
    id: 3,
    name: 'Operating Systems (OS)',
    code: 'CS303',
    attendance: {
      present: 30,
      total: 38,
      records: [
        { date: '2024-03-01', status: 'present' },
        { date: '2024-03-04', status: 'absent' },
        { date: '2024-03-06', status: 'present' },
        { date: '2024-03-08', status: 'present' },
      ]
    }
  },
  {
    id: 4,
    name: 'Discrete Mathematics',
    code: 'CS304',
    attendance: {
      present: 34,
      total: 40,
      records: [
        { date: '2024-03-01', status: 'present' },
        { date: '2024-03-05', status: 'present' },
        { date: '2024-03-07', status: 'present' },
        { date: '2024-03-12', status: 'present' },
      ]
    }
  }
];

const Attendance = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const getAttendancePercentage = (present, total) => {
    return ((present / total) * 100).toFixed(1);
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Attendance Record</h2>
        <p className="mt-1 text-sm text-gray-600">
          View your attendance records for each subject.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {subjects.map((subject) => (
          <motion.div
            key={subject.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {subject.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Course Code: {subject.code}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    getStatusColor(
                      getAttendancePercentage(
                        subject.attendance.present,
                        subject.attendance.total
                      )
                    )
                  }`}>
                    {getAttendancePercentage(
                      subject.attendance.present,
                      subject.attendance.total
                    )}%
                  </div>
                  <p className="text-sm text-gray-500">
                    {subject.attendance.present} / {subject.attendance.total} classes
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSubject(
                  selectedSubject?.id === subject.id ? null : subject
                )}
                className="mt-4 text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                {selectedSubject?.id === subject.id ? 'Hide Details' : 'View Details'}
              </button>

              {selectedSubject?.id === subject.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 border-t border-gray-200 pt-4"
                >
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Recent Attendance Records
                  </h4>
                  <div className="space-y-2">
                    {subject.attendance.records.map((record, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center space-x-2">
                          <FiCalendar className="text-gray-400" />
                          <span>{record.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {record.status === 'present' ? (
                            <FiCheck className="text-green-500" />
                          ) : (
                            <FiX className="text-red-500" />
                          )}
                          <span
                            className={
                              record.status === 'present'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }
                          >
                            {record.status.charAt(0).toUpperCase() +
                              record.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Attendance; 
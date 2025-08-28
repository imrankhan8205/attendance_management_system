import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaSearch, FaDownload } from 'react-icons/fa';

const AttendanceRecords = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [dateRange, setDateRange] = useState({
    from: '',
    to: new Date().toISOString().split('T')[0]
  });

  // Load attendance records from localStorage
  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    setAttendanceRecords(savedRecords);
    setFilteredRecords(savedRecords);
  }, []);

  // Filter records based on search, subject, and date range
  useEffect(() => {
    let filtered = [...attendanceRecords];

    if (searchQuery) {
      filtered = filtered.filter(record =>
        record.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.students.some(student =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.rollNumber.includes(searchQuery)
        )
      );
    }

    if (selectedSubject) {
      filtered = filtered.filter(record => record.subject === selectedSubject);
    }

    if (dateRange.from) {
      filtered = filtered.filter(record => record.date >= dateRange.from);
    }

    if (dateRange.to) {
      filtered = filtered.filter(record => record.date <= dateRange.to);
    }

    setFilteredRecords(filtered);
  }, [searchQuery, selectedSubject, dateRange, attendanceRecords]);

  const subjects = [
    'Operating Systems',
    'Design and Analysis of Algorithms',
    'Discrete Mathematics',
    'Computer Organization and Architecture'
  ];

  const exportToCSV = (record) => {
    // Implementation for exporting to CSV
    console.log('Exporting record:', record);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Attendance Records</h1>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="From Date"
          />

          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="To Date"
          />
        </div>

        {/* Records List */}
        <div className="space-y-6">
          {filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{record.subject}</h2>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <FaCalendarAlt className="mr-2" />
                      <span>{record.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => exportToCSV(record)}
                    className="flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <FaDownload className="mr-2" />
                    Export
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600">Total Students</p>
                    <p className="text-2xl font-semibold text-blue-900">{record.totalStudents}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600">Present</p>
                    <p className="text-2xl font-semibold text-green-900">{record.presentCount}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600">Absent</p>
                    <p className="text-2xl font-semibold text-red-900">{record.absentCount}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600">Attendance %</p>
                    <p className="text-2xl font-semibold text-purple-900">{record.attendancePercentage}%</p>
                  </div>
                </div>

                {/* Students Table */}
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Roll No.
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {record.students.map((student, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student.rollNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                student.status === 'Present'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {student.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceRecords; 
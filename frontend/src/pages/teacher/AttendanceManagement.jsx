import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import generateStudents from '../../utils/generateStudents';

const AttendanceManagement = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const subjects = [
    'Operating Systems',
    'Design and Analysis of Algorithms',
    'Discrete Mathematics',
    'Computer Organization and Architecture',

  ];

  useEffect(() => {
    const loadedStudents = generateStudents();
    setStudents(loadedStudents);
  }, []);

  // Filter students based on search query
  const filteredStudents = students.filter(student => {
    const searchLower = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(searchLower) ||
      student.rollNumber.includes(searchLower) ||
      student.uniRollNumber.toLowerCase().includes(searchLower)
    );
  });

  // Handle marking all students present/absent
  const handleMarkAll = (isPresent) => {
    setStudents(students.map(student => ({ ...student, isPresent })));
  };

  // Handle individual student attendance toggle
  const handleToggleAttendance = (studentId) => {
    setStudents(students.map(student =>
      student.id === studentId
        ? { ...student, isPresent: !student.isPresent }
        : student
    ));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedSubject) {
      alert('Please select a subject');
      return;
    }
    
    // Calculate attendance statistics
    const presentCount = students.filter(s => s.isPresent).length;
    const absentCount = students.length - presentCount;
    const attendancePercentage = (presentCount / students.length * 100).toFixed(2);

    // Create attendance record
    const attendanceRecord = {
      id: Date.now(), // Unique ID for the record
      date: selectedDate,
      subject: selectedSubject,
      totalStudents: students.length,
      presentCount,
      absentCount,
      attendancePercentage: parseFloat(attendancePercentage),
      students: students.map(student => ({
        name: student.name,
        rollNumber: student.rollNumber,
        status: student.isPresent ? 'Present' : 'Absent'
      }))
    };

    // Here you would typically send this data to your backend
    console.log('Attendance Record:', attendanceRecord);

    // Store in localStorage for demo purposes
    const existingRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    localStorage.setItem('attendanceRecords', JSON.stringify([...existingRecords, attendanceRecord]));

    alert('Attendance submitted successfully!');
    
    // Redirect to attendance records page
    window.location.href = '/attendance-records';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Attendance Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Subject Dropdown */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          {/* Date Input */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Mark All Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleMarkAll(true)}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Mark All Present
            </button>
            <button
              onClick={() => handleMarkAll(false)}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Mark All Absent
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  University Roll No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.uniRollNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleAttendance(student.id)}
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                        student.isPresent
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {student.isPresent ? 'Present' : 'Absent'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement; 
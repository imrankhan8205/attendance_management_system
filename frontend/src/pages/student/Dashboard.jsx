import { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { FiCalendar, FiBook } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Roll Number: {user?.rollNumber}</p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* View Attendance Card */}
        <div 
          onClick={() => window.location.href = '/student/attendance'}
          className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <FiCalendar className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">View Attendance</h2>
              <p className="text-sm text-gray-500">Check your attendance records</p>
            </div>
          </div>
        </div>

        {/* Subjects Card */}
        <div 
          onClick={() => window.location.href = '/student/subjects'}
          className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiBook className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Subjects</h2>
              <p className="text-sm text-gray-500">View your enrolled subjects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
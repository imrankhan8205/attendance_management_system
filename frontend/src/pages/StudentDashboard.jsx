import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { FaUserGraduate, FaSignOutAlt, FaCalendarAlt, FaBook, FaEnvelope, FaPhone, FaIdCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [showProfileCard, setShowProfileCard] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-yellow-100 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-2xl -z-10 animate-pulse" style={{ filter: 'blur(80px)' }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full opacity-20 blur-2xl -z-10 animate-pulse" style={{ filter: 'blur(100px)' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-2xl -z-10 animate-pulse" style={{ filter: 'blur(90px)', transform: 'translate(-50%, -50%)' }}></div>
      {/* Navbar */}
      <nav className="bg-white/90 shadow-lg backdrop-blur border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <FaUserGraduate className="h-9 w-9 text-indigo-600 drop-shadow" />
              <span className="ml-2 text-2xl font-extrabold text-gray-900 tracking-tight">Student Portal</span>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setShowProfileCard(!showProfileCard)}
                  className="flex items-center space-x-2 mr-4 focus:outline-none hover:bg-blue-50 px-2 py-1 rounded transition"
                >
                  <img
                    className="h-9 w-9 rounded-full bg-gray-200 border-2 border-blue-200"
                    src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                    alt={user?.name}
                  />
                  <span className="text-gray-700 font-semibold">Welcome, {user?.name}</span>
                </button>
                {/* Profile Dropdown Card */}
                {showProfileCard && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-blue-100 animate-fade-in">
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          className="h-16 w-16 rounded-full bg-gray-200 border-2 border-blue-200"
                          src={`https://ui-avatars.com/api/?name=${user?.name}&background=random&size=64`}
                          alt={user?.name}
                        />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{user?.name}</h3>
                          <p className="text-sm text-indigo-600 font-semibold">Student</p>
                        </div>
                      </div>
                      <div className="space-y-3 border-t pt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <FaEnvelope className="w-4 h-4 mr-2 text-blue-400" />
                          <span className="truncate">{user?.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaPhone className="w-4 h-4 mr-2 text-green-400" />
                          <span>{user?.contactNo}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaIdCard className="w-4 h-4 mr-2 text-purple-400" />
                          <span>Roll No: {user?.rollNumber}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaIdCard className="w-4 h-4 mr-2 text-yellow-400" />
                          <span>University Roll: {user?.uniRollNo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-900 font-semibold bg-white/80 hover:bg-red-50 rounded transition ml-2 border border-red-100"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 z-10">
        {/* Welcome Section */}
        <div className="bg-white/90 overflow-hidden shadow-xl rounded-2xl mb-10 p-8 border border-blue-100">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Welcome, {user?.name}!</h1>
          <p className="text-lg text-gray-600">Roll Number: <span className="font-semibold text-indigo-600">{user?.rollNumber}</span></p>
        </div>
        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div 
            onClick={() => window.location.href = '/attendance'}
            className="bg-gradient-to-r from-blue-50 via-purple-50 to-yellow-50 overflow-hidden shadow-lg rounded-xl cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200 border border-blue-100"
          >
            <div className="p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaCalendarAlt className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-gray-900">View Attendance</h3>
                  <p className="mt-1 text-md text-gray-500">
                    Check your attendance records
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div 
            onClick={() => navigate('/dashboard/student/subjects')}
            className="bg-gradient-to-r from-blue-50 via-purple-50 to-yellow-50 overflow-hidden shadow-lg rounded-xl cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200 border border-blue-100"
          >
            <div className="p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaBook className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-gray-900">Subjects</h3>
                  <p className="mt-1 text-md text-gray-500">
                    View your enrolled subjects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
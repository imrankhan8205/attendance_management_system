import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext';
import { FiUser, FiUsers, FiLogOut } from 'react-icons/fi';
import Profile from './Profile';
import AttendanceManagement from './AttendanceManagement';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, logout } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile user={user} />;
      case 'attendance':
        return <AttendanceManagement />;
      default:
        return <Profile user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-purple-600">Teacher Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-800"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiUser className="mr-3" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                  activeTab === 'attendance'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiUsers className="mr-3" />
                Attendance Management
              </button>
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            className="flex-1 bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import {
  FaUserGraduate,
  FaChartBar,
  FaCalendarAlt,
  FaClipboardList,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaGraduationCap,
  FaChartLine,
  FaUserFriends
} from 'react-icons/fa';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();

  // Mock data for dashboard statistics
  const stats = [
    {
      title: 'Total Students',
      value: '55',
      icon: <FaUserGraduate className="h-8 w-8" />,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Average Attendance',
      value: '85%',
      icon: <FaChartBar className="h-8 w-8" />,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Classes Today',
      value: '4',
      icon: <FaCalendarAlt className="h-8 w-8" />,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Pending Tasks',
      value: '3',
      icon: <FaClipboardList className="h-8 w-8" />,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    }
  ];

  const quickActions = [
    {
      title: 'Mark Attendance',
      description: 'Take attendance for your classes',
      icon: <FaClipboardList className="h-8 w-8" />,
      link: '/attendance-management',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      hoverBg: 'hover:bg-blue-100'
    },
    {
      title: 'View Records',
      description: 'Check attendance records',
      icon: <FaChartLine className="h-8 w-8" />,
      link: '/attendance-records',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      hoverBg: 'hover:bg-green-100'
    },
    {
      title: 'Student List',
      description: 'Manage your students',
      icon: <FaUserFriends className="h-8 w-8" />,
      link: '/students',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      hoverBg: 'hover:bg-purple-100'
    }
  ];

  const recentActivity = [
    {
      title: 'Attendance marked for Class CS-301',
      time: '2 hours ago',
      icon: <FaClipboardList />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Monthly attendance report generated',
      time: 'Yesterday',
      icon: <FaChartBar />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'New student enrolled in CS-302',
      time: '2 days ago',
      icon: <FaGraduationCap />,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <FaBell className="w-6 h-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <FaCog className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Welcome, {user?.name || 'Teacher'}</span>
                <button
                  onClick={logout}
                  className="flex items-center text-red-600 hover:text-red-700"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-full text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${action.bgColor} ${action.hoverBg} rounded-lg p-6 transition-all duration-200`}
            >
              <div className="flex items-center space-x-4">
                <div className={action.textColor}>{action.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`${activity.bgColor} p-3 rounded-full ${activity.textColor}`}>
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard; 
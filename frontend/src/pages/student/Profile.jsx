import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiHash, FiCalendar, FiBook } from 'react-icons/fi';

const Profile = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
        <p className="mt-1 text-sm text-gray-600">
          Your personal information and academic details.
        </p>
      </div>

      {/* Profile Summary */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-full">
            <FiUser className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-purple-100">Computer Science & Engineering</p>
          </div>
        </div>
      </div>

      {/* Main Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FiMail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email Address</p>
                <p className="text-sm text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FiPhone className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Contact Number</p>
                <p className="text-sm text-gray-900">{user.contactNo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FiHash className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Roll Number</p>
                <p className="text-sm text-gray-900">{user.rollNumber}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FiHash className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">University Roll Number</p>
                <p className="text-sm text-gray-900">{user.uniRollNo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Semester */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Current Semester</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FiCalendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Semester</p>
                <p className="text-sm text-gray-900">5th Semester</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FiBook className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Branch</p>
                <p className="text-sm text-gray-900">Computer Science & Engineering</p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Summary</h3>
          <div className="space-y-4">
            {[
              { subject: 'Design and Analysis of Algorithms', percentage: 85 },
              { subject: 'Computer Organization and Architecture', percentage: 90 },
              { subject: 'Operating Systems', percentage: 82 },
              { subject: 'Discrete Mathematics', percentage: 88 }
            ].map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{subject.subject}</span>
                  <span className="font-medium text-gray-900">{subject.percentage}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 rounded-full h-2"
                    style={{ width: `${subject.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile; 
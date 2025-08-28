import { motion } from 'framer-motion';
import { FiUser, FiMail } from 'react-icons/fi';

const Profile = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
        <p className="mt-1 text-sm text-gray-600">
          Your personal information and teaching details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <FiUser className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="text-lg font-semibold text-gray-800">{user.name}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <FiMail className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <p className="text-lg font-semibold text-gray-800">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-purple-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Teaching Subjects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Design and Analysis of Algorithms (DAA)',
              'Computer Organization and Architecture (COA)',
              'Operating Systems (OS)',
              'Discrete Mathematics'
            ].map((subject, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md border border-purple-100"
              >
                <p className="text-sm font-medium text-gray-800">{subject}</p>
                <p className="text-xs text-gray-500 mt-1">CS30{index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile; 
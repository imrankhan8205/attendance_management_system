import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Access Denied
        </h2>
        
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. Please log in with appropriate credentials.
        </p>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Go to Login
          </button>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized; 
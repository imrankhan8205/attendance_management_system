import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-4xl w-full mx-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Attendance Management System
          </h1>
          <p className="text-lg text-gray-600">
            Choose your role to continue
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Student Card */}
          <div 
            onClick={() => navigate('/register', { state: { role: 'student' } })}
            className="bg-white rounded-xl shadow-xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex flex-col items-center">
              <FaUserGraduate className="w-20 h-20 text-indigo-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Student Portal</h2>
              <p className="text-gray-600 text-center">
                Access your attendance records and view your schedule
              </p>
              <button className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors">
                Register as Student
              </button>
            </div>
          </div>

          {/* Teacher Card */}
          <div 
            onClick={() => navigate('/register', { state: { role: 'teacher' } })}
            className="bg-white rounded-xl shadow-xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex flex-col items-center">
              <FaChalkboardTeacher className="w-20 h-20 text-purple-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Teacher Portal</h2>
              <p className="text-gray-600 text-center">
                Manage attendance and view student records
              </p>
              <button className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors">
                Register as Teacher
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 
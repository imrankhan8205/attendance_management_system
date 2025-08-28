import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiBook } from 'react-icons/fi';

const Register = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: location.state?.role || 'student',
    rollNumber: '',
    contactNo: '',
    uniRollNo: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register, error } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (formData.role === 'student') {
      if (!formData.rollNumber) newErrors.rollNumber = 'Roll number is required';
      if (!formData.uniRollNo) newErrors.uniRollNo = 'University roll number is required';
      if (!formData.contactNo) newErrors.contactNo = 'Contact number is required';
      else if (!/^\d{10}$/.test(formData.contactNo)) newErrors.contactNo = 'Invalid contact number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = {
        ...formData,
        ...(formData.role === 'student' ? {
          rollNumber: formData.rollNumber,
          contactNo: formData.contactNo,
          uniRollNo: formData.uniRollNo
        } : {})
      };
      delete userData.confirmPassword;
      await register(userData);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4A2A8A] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full max-w-7xl">
            <div className="flex flex-wrap -mx-4 items-center">
              {/* Left Section with Image */}
              <motion.div 
                className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative bg-white rounded-3xl p-6 shadow-2xl overflow-hidden">
                  <motion.div
                    className="relative z-10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      alt="Students"
                      height={200}
                      src="https://img.freepik.com/free-vector/happy-student-concept-illustration_114360-8268.jpg?ga=GA1.1.1488016379.1744603702&semt=ais_hybrid&w=740"
                      className="w-full h-40 object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </motion.div>
                  <div className="relative z-20 text-center mt-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                      Welcome to
                    </h1>
                    <div className="text-2xl font-bold text-[#5E35B1] mt-2">
                      Attendance Management System
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Section with Form */}
              <motion.div 
                className="w-full lg:w-1/2 px-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Create your {formData.role} account
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiUser className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`pl-10 w-full px-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                            placeholder="John Doe"
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                      </div>

                      {formData.role === 'student' && (
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiBook className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="rollNumber"
                              value={formData.rollNumber}
                              onChange={handleChange}
                              className={`pl-10 w-full px-4 py-3 bg-gray-50 border ${errors.rollNumber ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                              placeholder="2022BTCS001"
                            />
                            {errors.rollNumber && <p className="text-red-500 text-xs mt-1">{errors.rollNumber}</p>}
                          </div>
                        </div>
                      )}

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiMail className="text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`pl-10 w-full px-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                            placeholder="john@example.com"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      {formData.role === 'student' && (
                        <>
                          <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">University Roll Number</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiBook className="text-gray-400" />
                              </div>
                              <input
                                type="text"
                                name="uniRollNo"
                                value={formData.uniRollNo}
                                onChange={handleChange}
                                className={`pl-10 w-full px-4 py-3 bg-gray-50 border ${errors.uniRollNo ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                                placeholder="220741"
                              />
                              {errors.uniRollNo && <p className="text-red-500 text-xs mt-1">{errors.uniRollNo}</p>}
                            </div>
                          </div>

                          <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiPhone className="text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                name="contactNo"
                                value={formData.contactNo}
                                onChange={handleChange}
                                className={`pl-10 w-full px-4 py-3 bg-gray-50 border ${errors.contactNo ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                                placeholder="1234567890"
                              />
                              {errors.contactNo && <p className="text-red-500 text-xs mt-1">{errors.contactNo}</p>}
                            </div>
                          </div>
                        </>
                      )}

                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock className="text-gray-400" />
                          </div>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`pl-10 w-full px-4 py-3 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                            placeholder="••••••••"
                          />
                          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                      </div>

                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock className="text-gray-400" />
                          </div>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`pl-10 w-full px-4 py-3 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                            placeholder="••••••••"
                          />
                          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl"
                      >
                        {error}
                      </motion.div>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#5E35B1] hover:bg-[#4527A0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        {loading ? (
                          <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          'Create account'
                        )}
                      </button>
                    </motion.div>

                    <div className="text-sm text-center">
                      <Link 
                        to="/login" 
                        className="font-medium text-[#5E35B1] hover:text-[#4527A0] transition-colors duration-200"
                      >
                        Already have an account? Sign in here
                      </Link>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 
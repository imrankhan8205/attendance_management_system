import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, error: authError } = useAuth();
  const [error, setError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'email' ? value.trim() : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    
    try {
      const credentials = {
        email: formData.email.trim(),
        password: formData.password
      };
      
      console.log('Submitting credentials:', credentials);
      await login(credentials);
      // Login successful - navigation is handled in AuthContext
    } catch (err) {
      console.error('Login error in component:', err);
      setError(err.message || 'Failed to login. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4A2A8A] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full max-w-6xl">
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
                      alt="Login"
                      src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png"
                      className="w-full h-auto max-h-80 object-contain"
                    />
                  </motion.div>
                  <div className="relative z-20 text-center mt-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                      Welcome Back
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
                    Sign in to your account
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-5">
                      <div>
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
                            placeholder="Enter your email"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div>
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
                            placeholder="Enter your password"
                          />
                          {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                          </label>
                        </div>

                        <div className="text-sm">
                          <Link to="/forgot-password" className="font-medium text-[#5E35B1] hover:text-[#4527A0]">
                            Forgot your password?
                          </Link>
                        </div>
                      </div>
                    </div>

                    {(error || authError) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl"
                      >
                        {error || authError}
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
                          'Sign in'
                        )}
                      </button>
                    </motion.div>

                    <div className="text-sm text-center">
                      <span className="text-gray-600">Don't have an account?</span>{' '}
                      <Link 
                        to="/register" 
                        className="font-medium text-[#5E35B1] hover:text-[#4527A0] transition-colors duration-200"
                      >
                        Sign up here
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

export default Login; 
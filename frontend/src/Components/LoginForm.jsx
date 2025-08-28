import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import { 
  UserIcon, 
  LockClosedIcon, 
  EnvelopeIcon,
  IdentificationIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const LoginForm = () => {
  const { role } = useParams();
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: role || 'student',
    rollNumber: '',
    contactNo: '',
    uniRollNo: ''
  });

  useEffect(() => {
    // Validate role
    if (role !== 'student' && role !== 'teacher') {
      navigate('/');
    }
    setFormData(prev => ({ ...prev, role }));
  }, [role, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    if (isRegistering) {
      if (!formData.name) {
        toast.error('Please enter your name');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }

      if (formData.role === 'student') {
        if (!formData.rollNumber || !formData.contactNo || !formData.uniRollNo) {
          toast.error('Please fill in all student details');
          return false;
        }
        if (!formData.contactNo.match(/^\d{10}$/)) {
          toast.error('Please enter a valid 10-digit contact number');
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isRegistering) {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          ...(formData.role === 'student' && {
            rollNumber: formData.rollNumber,
            contactNo: formData.contactNo,
            uniRollNo: formData.uniRollNo
          })
        };
        await register(userData);
        toast.success('Registration successful!');
      } else {
        const credentials = {
          email: formData.email,
          password: formData.password
        };
        await login(credentials);
        toast.success('Login successful!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const roleIcon = formData.role === 'student' ? (
    <FaUserGraduate className="h-12 w-12 text-white" />
  ) : (
    <FaChalkboardTeacher className="h-12 w-12 text-white" />
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex justify-center mb-4">
              {roleIcon}
            </div>
            <h2 className="text-center text-3xl font-extrabold text-white">
              {isRegistering ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="mt-2 text-center text-sm text-indigo-200">
              {isRegistering ? "Join our community" : "Sign in to your account"}
            </p>
          </div>

          {/* Form Section */}
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegistering && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={isRegistering}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {isRegistering && (
                <>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required={isRegistering}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  {formData.role === 'student' && (
                    <>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IdentificationIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="rollNumber"
                          name="rollNumber"
                          type="text"
                          required={isRegistering}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Roll Number"
                          value={formData.rollNumber}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IdentificationIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="uniRollNo"
                          name="uniRollNo"
                          type="text"
                          required={isRegistering}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="University Roll Number"
                          value={formData.uniRollNo}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PhoneIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="contactNo"
                          name="contactNo"
                          type="tel"
                          required={isRegistering}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Contact Number"
                          value={formData.contactNo}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                  formData.role === 'student' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-purple-600 hover:bg-purple-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  formData.role === 'student' ? 'focus:ring-indigo-500' : 'focus:ring-purple-500'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In')}
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {isRegistering
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full filter blur-xl opacity-10" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-full filter blur-xl opacity-10" />
      </div>
    </div>
  );
};

export default LoginForm;

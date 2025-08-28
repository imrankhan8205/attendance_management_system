import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);


const API_URL = 'http://localhost:8400/api';


axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (user?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8400/api/auth/register', userData);
      setUser(response.data);
      navigate('/login');
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      console.log('Sending login request with:', credentials);
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: credentials.email,
        password: credentials.password
      });
      
      console.log('Login response:', response.data);
      
      if (response.data && response.data.success) {
        const userData = response.data.data;
        
        if (!userData.role || !['student', 'teacher'].includes(userData.role)) {
          throw new Error('Invalid user role');
        }
        
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        
        if (userData.role === 'student') {
          navigate('/student/dashboard');
        } else if (userData.role === 'teacher') {
          navigate('/teacher/dashboard');
        }
        return userData;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Invalid email or password';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const register = async (req, res) => {
  try {
    const { name, email, password, role, rollNumber, contactNo, uniRollNo } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    if (role === 'student' && (!rollNumber || !contactNo || !uniRollNo)) {
      return res.status(400).json({ 
        message: 'Roll number, contact number, and university roll number are required for students' 
      });
    }

   
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

   
    if (role === 'student') {
      const rollNumberExists = await User.findOne({ 
        $or: [
          { rollNumber },
          { uniRollNo }
        ]
      });
      
      if (rollNumberExists) {
        return res.status(400).json({ 
          message: 'A student with this roll number or university roll number already exists' 
        });
      }
    }

   
    const user = await User.create({
      name,
      email,
      password,
      role,
      ...(role === 'student' && {
        rollNumber,
        contactNo,
        uniRollNo
      })
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          ...(role === 'student' && {
            rollNumber: user.rollNumber,
            contactNo: user.contactNo,
            uniRollNo: user.uniRollNo
          })
        },
        message: 'Registration successful'
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed',
      error: error.message 
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ...(user.role === 'student' && {
          rollNumber: user.rollNumber,
          contactNo: user.contactNo,
          uniRollNo: user.uniRollNo
        })
      },
      token: generateToken(user._id),
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Login failed',
      error: error.message 
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      message: 'Failed to get user information',
      error: error.message 
    });
  }
}; 
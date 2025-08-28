import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const students = [
  { uniRollNo: '2340993', admissionNo: '2023BTCS200', name: 'AAYUSH KUMAR SINGH', contactNo: '6284046869' },
  { uniRollNo: '2306718', admissionNo: '2023BTCS095', name: 'ABHINAV ANAND', contactNo: '9031123677' },
  { uniRollNo: '2306362', admissionNo: '2023BTCS032', name: 'ABHISHEK', contactNo: '7508317625' },
  { uniRollNo: '2306363', admissionNo: '2023BTCS132', name: 'ABHISHEK PANDEY', contactNo: '9628213302' },
  { uniRollNo: '2457425', admissionNo: '2023BTCS247', name: 'ADITI KUMARI', contactNo: '8709881011' },
  { uniRollNo: '2339767', admissionNo: '2023BTCS114', name: 'AKASH RAJ', contactNo: '6299696321' },
  { uniRollNo: '2360638', admissionNo: '2023BTCS131', name: 'ALOK RANJAN', contactNo: '6200963515' },
  { uniRollNo: '2340995', admissionNo: '2023BTCS016', name: 'ANKIT KUMAR', contactNo: '9973921614' },
  { uniRollNo: '2306724', admissionNo: '2023BTCS142', name: 'ANKIT SHIVHARE', contactNo: '9131871340' },
  { uniRollNo: '2306384', admissionNo: '2023BTCS019', name: 'ANUBHAV PATHAK', contactNo: '9310093229' },
  { uniRollNo: '2306387', admissionNo: '2023BTCS094', name: 'ARYAN KUMAR', contactNo: '9341075252' },
  { uniRollNo: '2306388', admissionNo: '2023BTCS178', name: 'ASHISH KUMAR JHA', contactNo: '9508272452' },
  { uniRollNo: '2306492', admissionNo: '2023BTEC013', name: 'BOBY KUMAR', contactNo: '8252536302' },
  { uniRollNo: '2306728', admissionNo: '2023BTCS060', name: 'DEEPA KUMARI', contactNo: '9835313218' },
  { uniRollNo: '2306399', admissionNo: '2023BTCS018', name: 'DEEPAK SINGH RANA', contactNo: '6283511769' },
  { uniRollNo: '2306402', admissionNo: '2023BTCS183', name: 'DHRUV', contactNo: '8968678847' },
  { uniRollNo: '2306403', admissionNo: '2023BTCS028', name: 'DIVYANSHU CHAUHAN', contactNo: '9720619887' },
  { uniRollNo: '2306495', admissionNo: '2023BTEC022', name: 'HARSH KUMAR', contactNo: '9905426100' },
  { uniRollNo: '2306414', admissionNo: '2023BTCS054', name: 'HASNAIN KHAN WARSI', contactNo: '6203557929' },
  { uniRollNo: '2306417', admissionNo: '2023BTCS050', name: 'IMRAN ANSARI', contactNo: '7710374317' },
  { uniRollNo: '2306418', admissionNo: '2023BTCS179', name: 'ISHANT RAJ', contactNo: '7903881663' },
  { uniRollNo: '2306731', admissionNo: '2023BTCS147', name: 'JASPREET SINGH CHHABRA', contactNo: '8986678670' },
  { uniRollNo: '2306422', admissionNo: '2023BTCS067', name: 'JOSHIKANT KUMAR SINGH', contactNo: '8340557804' },
  { uniRollNo: '2306432', admissionNo: '2023BTCS092', name: 'MANISH YADAV', contactNo: '8340677401' },
  { uniRollNo: '2341018', admissionNo: '2023BTCS089', name: 'MUSKAN KUMARI', contactNo: '8521999579' },
  { uniRollNo: '2306740', admissionNo: '2023BTCS231', name: 'NANDITA KUMARI', contactNo: '7643050737' },
  { uniRollNo: '2306437', admissionNo: '2023BTCS096', name: 'NILESH KUMAR', contactNo: '7250863230' },
  { uniRollNo: '2306439', admissionNo: '2023BTCS057', name: 'NITISH KUMAR', contactNo: '6203237073' },
  { uniRollNo: '2306500', admissionNo: '2023BTEC020', name: 'PAWAN KUMAR', contactNo: '9341458493' },
  { uniRollNo: '2341023', admissionNo: '2023BTCS023', name: 'PRABHLEEN KAUR', contactNo: '7814007601' },
  { uniRollNo: '2306501', admissionNo: '2023BTEC021', name: 'PRIYANSHU KUMAR', contactNo: '8102645950' },
  { uniRollNo: '2306747', admissionNo: '2023BTCS088', name: 'PRIYANSHU PRAKASH', contactNo: '6299796515' },
  { uniRollNo: '2306449', admissionNo: '2023BTCS080', name: 'ROHIT BURMAN', contactNo: '9931798188' },
  { uniRollNo: '2306452', admissionNo: '2023BTCS029', name: 'SAHIL RAWAT', contactNo: '9646715446' },
  { uniRollNo: '2306453', admissionNo: '2023BTCS093', name: 'SAKSHI SANSKRITI MISHRA', contactNo: '7303996196' },
  { uniRollNo: '2341036', admissionNo: '2023BTCS049', name: 'SAMEER ANSARI', contactNo: '8728869577' },
  { uniRollNo: '2306753', admissionNo: '2023BTCS181', name: 'SANJANA SHARMA', contactNo: '7865945220' },
  { uniRollNo: '2306455', admissionNo: '2023BTCS086', name: 'SANTOSH KUMAR', contactNo: '6203092809' },
  { uniRollNo: '2306456', admissionNo: '2023BTCS108', name: 'SANYA KUMARI', contactNo: '9263227143' },
  { uniRollNo: '2306757', admissionNo: '2023BTCS134', name: 'SHIV BHUSHAN KUMAR', contactNo: '9905061039' },
  { uniRollNo: '2306758', admissionNo: '2023BTCS063', name: 'SHIVAM KUMAR', contactNo: '9262662713' },
  { uniRollNo: '2306465', admissionNo: '2023BTCS218', name: 'SONI KUMARI', contactNo: '7903696469' },
  { uniRollNo: '2341044', admissionNo: '2023BTCS116', name: 'SUBHAJIT MONDAL', contactNo: '7508585976' },
  { uniRollNo: '2306466', admissionNo: '2023BTCS193', name: 'SUKHVINDER KAUR', contactNo: '9646953285' },
  { uniRollNo: '2306471', admissionNo: '2023BTCS157', name: 'SWEETY RANI', contactNo: '8603269299' },
  { uniRollNo: '2306472', admissionNo: '2023BTCS187', name: 'UDIT KUMAR PATHAK', contactNo: '9304998429' },
  { uniRollNo: '2306769', admissionNo: '2023BTCS185', name: 'VAISHNAVI KUMARI', contactNo: '6200334087' },
  { uniRollNo: '2306476', admissionNo: '2023BTCS052', name: 'VIDYA SAGAR', contactNo: '7282089286' },
  { uniRollNo: '2306484', admissionNo: '2023BTCS234', name: 'VIVEK KUMAR PASWAN', contactNo: '6289107437' },
  { uniRollNo: '2306774', admissionNo: '2023BTCS223', name: 'YASH BHANDARI', contactNo: '9334845299' },
  { uniRollNo: '2457432', admissionNo: '2023BTCS253', name: 'SHASHI BHUSHNA SINGH', contactNo: '8210368392' },
  { uniRollNo: '2457428', admissionNo: '2023BTCS249', name: 'ARPIT KUMAR', contactNo: '6207454453' },
  { uniRollNo: '2306396', admissionNo: '2023BTCS035', name: 'CHANDAN DUBEY', contactNo: '8368219820' },
  { uniRollNo: '2457431', admissionNo: '2023BTCS252', name: 'MITHLESH KUMAR', contactNo: '7631574672' },
  { uniRollNo: '2341001', admissionNo: '2023BTCS053', name: 'BALAJI KUMAR', contactNo: '7646067336' },
  { uniRollNo: '2457433', admissionNo: '2023BTCS260', name: 'SHIVANGANI SINGH', contactNo: '9554318518' }
];

const seedStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    await User.deleteMany({ role: 'student' });


    for (const student of students) {
      const email = student.admissionNo.toLowerCase() + '@nitjsr.ac.in';
      const password = await bcrypt.hash(student.admissionNo, 10); 

      await User.create({
        name: student.name,
        email,
        password,
        role: 'student',
        uniRollNo: student.uniRollNo,
        admissionNo: student.admissionNo,
        contactNo: student.contactNo
      });
    }

    console.log('Students seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding students:', error);
    process.exit(1);
  }
};

seedStudents(); 
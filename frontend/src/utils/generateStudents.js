const generateStudents = () => {
  const students = [];
  const names = [
    'Aarav Kumar', 'Aditi Sharma', 'Arjun kumar', 'Ananya Singh', 'Dhruv Kumar', 
    'Khushi', 'Ishaan kumar', 'Isha Dubey', 'Kabir Khan', 'Khushbu singh',
    'Laksh Singh', 'Mira Rajput', 'Nehal kumar', 'Nisha Mahto', 'Om Prakash',
    'Priya Tiwari', 'Rahul Kumar', 'Riya Shah', 'Samar Singh', 'Anam Khan',
    'Rani mahto', 'Veer Singh', 'Yash Bhandari', 'Zoha rehman', 'Aditya Thakur',
    'Avni Singh', 'Divyanshu Chauhan', 'Neelam Kumari', 'Jay Prakash', 'lalit singh',
    'Rohan Kumar', 'Sana Qureshi', 'Vivaan Ray', 'Zaheer Ahmed', 'Aryan Mahto',
    'Maya Singh', ' Malik Adil', 'Siya singh', 'Aayush Sharma', 'Pallavi Singh',
    'Arnav Rajput', 'Manish Yadav', 'Muskan Kumari', 'Anni Singh', 'Vivek Singh',
    'Anjali Tiwari', 'Prince Tiwari', 'Dhoni Gupta', 'Ashwit Kumar', 'Anvi Sharma',
    'Krishna Kumar', 'Maya Kumari', 'Rohit kumar', 'Nikhil Kumar Rajput', 'Aarohi singh'
  ];

  for (let i = 0; i < 55; i++) {
    const rollNumber = String(i + 1).padStart(2, '0');
    const uniRollNumber = `20CS${String(i + 1).padStart(3, '0')}`;
    
    let studentName = names[i];
    if (!studentName) {
      const baseIndex = i % names.length;
      const suffix = Math.floor(i / names.length) + 1;
      studentName = `${names[baseIndex]} ${suffix}`;
    }

    students.push({
      id: i + 1,
      rollNumber: rollNumber,
      uniRollNumber: uniRollNumber,
      name: studentName,
      isPresent: false
    });
  }

  return students;
};

export default generateStudents; 
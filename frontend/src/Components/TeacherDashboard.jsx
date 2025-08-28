import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const SUBJECTS = ['Discrete Math', 'DAA', 'COA', 'Operating System'];

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.token) {
      fetchStudents();
    }
  }, [user]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      
      const response = await axios.get('http://localhost:5000/api/students');
      console.log('Students data:', response.data); 
      if (Array.isArray(response.data)) {
        setStudents(response.data);
        const initialAttendance = {};
        response.data.forEach(student => {
          initialAttendance[student._id] = true; 
        });
        setAttendance(initialAttendance);
      } else {
        console.error('Invalid students data format:', response.data);
        toast.error('Invalid data format received from server');
      }
    } catch (error) {
      console.error('Error fetching students:', error.response || error);
      toast.error(error.response?.data?.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handleSubmit = async () => {
    if (!selectedSubject) {
      toast.error('Please select a subject');
      return;
    }

    try {
      setLoading(true);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      
      const attendanceData = students.map(student => ({
        studentId: student._id,
        isPresent: attendance[student._id],
        rollNumber: student.uniRollNo,
        studentName: student.name,
        admissionNo: student.admissionNo
      }));

      const response = await axios.post('http://localhost:5000/api/attendance/mark', {
        date: selectedDate,
        subject: selectedSubject,
        attendanceData
      });

      console.log('Attendance submission response:', response.data);
      toast.success('Attendance marked successfully');
    
      const resetAttendance = {};
      students.forEach(student => {
        resetAttendance[student._id] = true;
      });
      setAttendance(resetAttendance);
      setSelectedSubject(''); 
    } catch (error) {
      console.error('Error marking attendance:', error.response || error);
      toast.error(error.response?.data?.message || 'Failed to mark attendance');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.uniRollNo.includes(searchTerm) ||
    student.admissionNo.includes(searchTerm)
  );

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-gray-600">
          Please log in to access the dashboard
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mark Attendance</h1>
        <div className="text-sm text-gray-600">
          Welcome, {user?.name}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Subject</option>
              {SUBJECTS.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, roll no, or admission no"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uni. Roll No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admission No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact No.
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student, index) => (
                <tr key={student._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.uniRollNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.admissionNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.contactNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleAttendanceChange(student._id)}
                      className="inline-flex items-center justify-center"
                    >
                      {attendance[student._id] ? (
                        <CheckCircleIcon className="h-8 w-8 text-green-500 hover:text-green-600" />
                      ) : (
                        <XCircleIcon className="h-8 w-8 text-red-500 hover:text-red-600" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Total Students: {filteredStudents.length}
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || !selectedSubject}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Attendance'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 
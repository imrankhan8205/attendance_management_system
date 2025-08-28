import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';

const StudentRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    subject: '',
    startDate: '',
    endDate: ''
  });

  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    total: 0
  });

  useEffect(() => {
    console.log('Current user:', user); // Debug log
    if (user?._id) {
      fetchAttendanceRecords();
    } else {
      console.log('No user ID found'); // Debug log
    }
  }, [user?._id, filters]);

  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      console.log('Fetching records for user:', user._id); // Debug log
      
      // Ensure axios has the auth token
      const token = user.token;
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.get(`http://localhost:5000/api/attendance/student/${user._id}`, {
        params: filters
      });
      
      console.log('API Response:', response.data); // Debug log
      
      setRecords(response.data.records || []);
      
      // Calculate statistics
      const total = response.data.records ? response.data.records.length : 0;
      const present = response.data.records ? response.data.records.filter(record => record.isPresent).length : 0;
      
      setStats({
        present,
        absent: total - present,
        total
      });
    } catch (error) {
      console.error('Error fetching attendance:', error.response || error); // Debug log
      toast.error(error.response?.data?.message || 'Failed to fetch attendance records');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateAttendancePercentage = () => {
    if (stats.total === 0) return 0;
    return ((stats.present / stats.total) * 100).toFixed(1);
  };

  // Early return if no user
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          Please log in to view your attendance records
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Attendance Records</h1>
        <div className="text-sm text-gray-600">
          Welcome, {user?.name}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
            placeholder="Filter by subject"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Attendance Statistics</h2>
          <div className="h-64">
            {stats.total > 0 ? (
              <PieChart
                data={[
                  { title: 'Present', value: stats.present, color: '#10B981' },
                  { title: 'Absent', value: stats.absent, color: '#EF4444' },
                ]}
                label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                labelStyle={{ fontSize: '5px' }}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No attendance data available
              </div>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-100 p-2 rounded">
              <p className="text-green-800">Present</p>
              <p className="font-semibold">{stats.present} days</p>
            </div>
            <div className="bg-red-100 p-2 rounded">
              <p className="text-red-800">Absent</p>
              <p className="font-semibold">{stats.absent} days</p>
            </div>
            <div className="bg-blue-100 p-2 rounded">
              <p className="text-blue-800">Percentage</p>
              <p className="font-semibold">{calculateAttendancePercentage()}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Records</h2>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {records.map((record) => (
                    <tr key={record._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.isPresent
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.isPresent ? 'Present' : 'Absent'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {records.length === 0 && !loading && (
                <div className="text-center py-4 text-gray-500">
                  No records found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentRecords; 
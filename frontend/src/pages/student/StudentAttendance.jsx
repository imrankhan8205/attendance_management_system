import React, { useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentAttendance = () => {
  // Mock data for demonstration
  const attendanceStats = {
    total: 236,
    present: 226,
    absent: 2,
    percentage: 95.76,
  };

  const subjects = [
    {
      name: "Computer Architecture and Organisation",
      total: 18,
      present: 17,
      absent: 0,
      percentage: 94.44,
    },
    {
      name: "Operating System",
      total: 16,
      present: 15,
      absent: 0,
      percentage: 93.75,
    },
    {
      name: "Technical Training 4Th sem",
      total: 94,
      present: 91,
      absent: 2,
      percentage: 96.81,
    },
    {
      name: "Practice Session 4TH",
      total: 26,
      present: 26,
      absent: 0,
      percentage: 100,
    },
    {
      name: "Design & Analysis of An Algorithm",
      total: 13,
      present: 13,
      absent: 0,
      percentage: 100,
    },
    {
      name: "Discrete Mathematics",
      total: 15,
      present: 15,
      absent: 0,
      percentage: 100,
    },
    { name: "OS-LAB", total: 31, present: 30, absent: 0, percentage: 96.77 },
    {
      name: "PDP(Soft Skill)",
      total: 9,
      present: 8,
      absent: 0,
      percentage: 88.89,
    },
    { name: "COA-LAB", total: 5, present: 5, absent: 0, percentage: 100 },
    { name: "DAA-LAB", total: 5, present: 5, absent: 0, percentage: 100 },
    {
      name: "EVENING-CLASSES",
      total: 1,
      present: 1,
      absent: 0,
      percentage: 100,
    },
  ];

  const [dateRange, setDateRange] = useState({
    from: "2024-03-26",
    to: "2024-03-26",
  });

  const navigate = useNavigate();

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 75) return "bg-lime-500";
    if (percentage >= 60) return "bg-blue-500";
    if (percentage >= 45) return "bg-pink-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
        >
          <span className="mr-2">&#8592;</span> Back
        </button>
        {/* Header with Icon */}
        <div className="flex items-center mb-8">
          <FaUserCheck className="text-4xl text-blue-600 mr-4" />
          <h1 className="text-3xl font-bold text-gray-900">
            Student Attendance
          </h1>
        </div>

        {/* Overall Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-600 mb-2">Total</h2>
            <div className="bg-blue-500 text-white rounded-full py-2 px-4 text-center text-xl font-semibold">
              {attendanceStats.total}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-600 mb-2">Present</h2>
            <div className="bg-emerald-500 text-white rounded-full py-2 px-4 text-center text-xl font-semibold">
              {attendanceStats.present}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-600 mb-2">Absent</h2>
            <div className="bg-red-500 text-white rounded-full py-2 px-4 text-center text-xl font-semibold">
              {attendanceStats.absent}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-600 mb-2">%age</h2>
            <div className="bg-purple-500 text-white rounded-full py-2 px-4 text-center text-xl font-semibold">
              {attendanceStats.percentage}%
            </div>
          </div>
        </div>

        {/* Subject-wise Attendance Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Subject wise Attendance
            </h2>

            {/* Date Range Selector */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <label className="text-gray-600">Date From:</label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, from: e.target.value })
                  }
                  className="border rounded-md px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-gray-600">To:</label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, to: e.target.value })
                  }
                  className="border rounded-md px-3 py-2"
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Show
              </button>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Present
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Absent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subjects.map((subject, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {subject.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subject.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subject.present}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subject.absent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`${getStatusColor(
                            subject.percentage
                          )} text-white text-sm rounded-full px-3 py-1 text-center w-24`}
                        >
                          {subject.percentage}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Attendance Status Legend
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
              <span className="text-sm text-gray-600">Above 90%</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-lime-500 rounded-sm mr-2"></div>
              <span className="text-sm text-gray-600">
                Between 75% and 89.99%
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
              <span className="text-sm text-gray-600">
                Between 60% and 74.99%
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-pink-500 rounded-sm mr-2"></div>
              <span className="text-sm text-gray-600">
                Between 45% and 59.99%
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
              <span className="text-sm text-gray-600">Less than 45%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;

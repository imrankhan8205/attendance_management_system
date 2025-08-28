import React from 'react';
import { FaBook, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const subjectNames = [
  'Software Engineering',
  'Computer Network',
  'FLAT',
  'Python',
  'Machine Learning',
];

const Subjects = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => {
            if (window.history.length > 2) {
              navigate(-1);
            } else {
              navigate('/dashboard/student');
            }
          }}
          className="mb-8 flex items-center gap-2 px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-lg shadow transition-colors text-lg"
        >
          <FaArrowLeft className="text-xl" />
          Back to Dashboard
        </button>
        {/* Header */}
        <div className="mb-8 flex items-center">
          <FaBook className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">My Subjects</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <ul className="space-y-4">
            {subjectNames.map((subject, idx) => (
              <li key={idx} className="text-lg text-gray-800 font-medium flex items-center">
                <span className="mr-2">{idx + 1}.</span> {subject}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Subjects;

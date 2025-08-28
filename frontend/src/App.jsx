import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import HomePage from './pages/HomePage';
import { useAuth } from './Context/AuthContext';
import AttendanceManagement from './pages/teacher/AttendanceManagement';
import StudentAttendance from './pages/student/StudentAttendance';
import AttendanceRecords from './pages/teacher/AttendanceRecords';
import Subjects from './pages/student/Subjects';

function App() {
  const { user } = useAuth();

  
  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (!user.role) {
      return <Navigate to="/" />;
    }
    if (user.role !== allowedRole) {
      return <Navigate to={`/dashboard/${user.role}`} />;
    }
    return children;
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={
            user && user.role ? (
              <Navigate to={`/dashboard/${user.role}`} />
            ) : (
              <HomePage />
            )
          } 
        />

        {/* Auth routes */}
        <Route 
          path="/login" 
          element={
            user && user.role ? (
              <Navigate to={`/dashboard/${user.role}`} />
            ) : (
              <Login />
            )
          } 
        />

        <Route 
          path="/register" 
          element={
            user && user.role ? (
              <Navigate to={`/dashboard/${user.role}`} />
            ) : (
              <Register />
            )
          } 
        />

        {/* Dashboard routes */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/teacher"
          element={
            <ProtectedRoute allowedRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/student/subjects"
          element={
            <ProtectedRoute allowedRole="student">
              <Subjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance-management"
          element={
            <ProtectedRoute allowedRole="teacher">
              <AttendanceManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance-records"
          element={
            <ProtectedRoute allowedRole="teacher">
              <AttendanceRecords />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

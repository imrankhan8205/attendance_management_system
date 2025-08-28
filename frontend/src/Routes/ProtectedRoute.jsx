import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user || user.role !== role) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner size={50} color="#4A90E2" />
    </div>
  );
  
  // First check if authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Then check if the user has admin role
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/unauthorized" />;
  }
  
  // If user is authenticated and has admin role, render the children
  return children;
};

export default AdminProtectedRoute; 
import { useContext } from 'react';

import { Navigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner'; // Adjust the import path as necessary

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner size={50} color="#4A90E2" /> {/* Adjust size and color as needed */}
    </div>
  ); // Optional loading screen
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

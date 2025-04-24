// src/componants/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  if (!auth) {
    console.warn('Auth context not found. Make sure <AuthProvider> wraps your app.');
    return <Navigate to="/login" replace />;
  }

  const { isAuthenticated, loading } = auth;

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

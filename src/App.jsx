import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { AuthProvider } from './contexts/AuthContext';

import CheckEmail from './componants/Auth/CheckEmail.jsx';
import ForgotPassword from './componants/Auth/forgotPassword.jsx';
import Login from './componants/Auth/login.jsx';
import Register from './componants/Auth/Register.jsx';
import ResetPassword from './componants/Auth/ResetPassword.jsx';
import ResetSuccess from './componants/Auth/ResetSuccess.jsx';
import ProtectedRoute from './componants/ProtectedRoute.jsx';
import Layout from './layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home';
import NewOrder from './pages/NewOrder.jsx';
import NotFound from './pages/NotFound.jsx';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes that don't use Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register/*" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/check-email" element={<CheckEmail />} />
            <Route path="/reset-success" element={<ResetSuccess />} />

            {/* Routes using Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route 
                path="dashboard/*" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="new-order" 
                element={
                  <ProtectedRoute>
                    <NewOrder />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;


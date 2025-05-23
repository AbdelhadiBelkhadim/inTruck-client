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

import { AuthProvider } from '@/contexts/AuthContext.jsx';

import CheckEmail from '@/components/Auth/CheckEmail.jsx';
import ForgotPassword from '@/components/Auth/ForgotPassword.jsx';
import Login from '@/components/Auth/Login.jsx';
import Register from '@/components/Auth/Register.jsx';
import ResetPassword from '@/components/Auth/ResetPassword.jsx';
import ResetSuccess from '@/components/Auth/ResetSuccess.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import AdminProtectedRoute from '@/components/AdminProtectedRoute.jsx';
import Layout from '@/layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Home from '@/pages/Home.jsx';
import NewOrder from '@/pages/NewOrder.jsx';
import NotFound from '@/pages/NotFound.jsx';
import Unauthorized from '@/pages/Unauthorized.jsx';
import DistanceCalculator from '@/pages/DistanceCalculator.jsx';
import TestDirectCalculation from '@/pages/TestDirectCalculation.jsx';
import DashboardAdmin from '@/pages/DashboardAdmin.jsx';

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
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route 
              path="/admin/*" 
              element={
                <AdminProtectedRoute>
                  <DashboardAdmin />
                </AdminProtectedRoute>
              } 
            />

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
                path="new-order/*" 
                element={
                  <ProtectedRoute>
                    <NewOrder />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="calculate-distance" 
                element={
                  <ProtectedRoute>
                    <DistanceCalculator />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="test-direct-calculator" 
                element={<TestDirectCalculation />} 
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



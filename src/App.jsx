import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './layout/Layout.jsx';
import Home from './pages/Home';
import Dashboard from "./pages/Dashboard.jsx";
import Register from './componants/Auth/Register.jsx';
import Login from './componants/Auth/Login.jsx';
import ForgotPassword from './componants/Auth/ForgotPassword.jsx';
import ResetPassword from './componants/Auth/ResetPassword.jsx';
import CheckEmail from './componants/Auth/CheckEmail.jsx';
import ResetSuccess from './componants/Auth/ResetSuccess.jsx';
import Profile from './pages/Profile.jsx';
import NewOrder from './pages/NewOrder.jsx';
import ProtectedRoute from './componants/ProtectedRoute.jsx';
import NotFound from './pages/NotFound.jsx';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="dashboard/*" element={ <ProtectedRoute> <Dashboard /></ProtectedRoute>} />
            <Route path="new-order" element={ <ProtectedRoute><NewOrder /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;


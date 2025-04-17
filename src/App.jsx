import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import Home from './pages/Home';
import Dashboard from './pages/Dashboard.jsx';
import Register from './componants/Auth/register'; // Import the Rejester component
import Login from './componants/Auth/login'; // Import the Login component
import Profile from './pages/Profile.jsx'
import ForgotPassword from './componants/Auth/forgotPassword.jsx'
import ResetPassword from './componants/Auth/ResetPassword.jsx'
import NotFound from './pages/NotFound';

// Create a QueryClient instance (can configure options here)
const queryClient = new QueryClient();

const App = () => {

  return (
      // Wrap the entire app in QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/register/*" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>      
    </QueryClientProvider>
  );
};

export default App;

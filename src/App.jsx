import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './layout/Layout.jsx'
import Home from './pages/Home';
import Dashboard from "./pages/Dashboard.jsx"; // Import the Dashboard component
import Register from './componants/Auth/Register.jsx'; // Import the Rejester component
import Login from './componants/Auth/Login.jsx'; // Import the Login component
import ForgotPassword from './componants/Auth/ForgotPassword.jsx'
import ResetPassword from './componants/Auth/ResetPassword.jsx'
import CheckEmail from './componants/Auth/CheckEmail'; // Import the CheckEmail component
import ResetSuccess from './componants/Auth/ResetSuccess'; // Import the ResetSuccess component
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound';
import NewOrder from './pages/NewOrder'; // Import the NewOrder component

// Create a QueryClient instance (can configure options here)
const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/form-test" element={<FormTest />} /> FormTest component */}
          <Route path="/dashboard/*" element={<Dashboard />} /> {/* Dashboard with nested routes */}
          <Route path="/register/*" element={<Register />} /> {/* Rejester component */}
          <Route path="/login" element={<Login />} /> {/* Login component */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/check-email" element={<CheckEmail />} /> {/* CheckEmail component */}
          <Route path="/reset-success" element={<ResetSuccess />} /> {/* ResetSuccess component */}
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
          <Route path="/new-order" element={<NewOrder />} /> {/* NewOrder component */}
          <Route path="/new-order/:id" element={<NewOrder />} /> {/* NewOrder component with ID */}
          <Route path="/new-order/:id/edit" element={<NewOrder />} /> {/* NewOrder component with ID for editing */}
          <Route path="/profile" element={<Profile />} /> {/* Profile component */} 
        </Routes>
      </Router>
    </QueryClientProvider>

  );
};

export default App;

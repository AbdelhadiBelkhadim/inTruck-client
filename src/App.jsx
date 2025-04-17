import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Dashboard from '../src/pages/Dashboard'; 
import Register from './componants/Auth/register'; // Import the Rejester component
import Login from './componants/Auth/login'; // Import the Login component
import Profile from './pages/Profile.jsx'
import ForgotPassword from './componants/Auth/forgotPassword.jsx'
import ResetPassword from './componants/Auth/ResetPassword.jsx'
import NotFound from './pages/NotFound';
import NewOrder from './pages/NewOrder'; // Import the NewOrder component
import NewOrderDetails from './pages/NewOrderDetails'; // Import the NewOrderDetails component
import NewOrderDetailsPackage from './pages/NewOrderDetailsPackage'; // Import the NewOrderDetailsPackage component
import NewOrderFullCoverage from './pages/NewOrderFullCoverage'; // Import the NewOrderFullCoverage component
import PickUpLocation from './pages/PickUpLocation'; // Import the PickUpLocation component
import SetupPayment from './pages/SetupPayment'; // Import the SetupPayment component
import WhereDelivered from './pages/WhereDelivered'; // Import the WhereDelivered component
import CheckingOrder from './pages/CheckingOrder'; // Import the CheckingOrder component
import CheckingDone from './pages/CheckingDone'; // Import the OrderDone component

// Create a QueryClient instance (can configure options here)
const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} /> {/* Dashboard with nested routes */}
          <Route path="/register/*" element={<Register />} /> {/* Rejester component */}
          <Route path="/login" element={<Login />} /> {/* Login component */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
          <Route path="/new-order" element={<NewOrder />} /> {/* NewOrder component */}
          <Route path="/new-order/:id" element={<NewOrder />} /> {/* NewOrder component with ID */}
          <Route path="/new-order/:id/edit" element={<NewOrder />} /> {/* NewOrder component with ID for editing */}
          <Route path="/new-order-details" element={<NewOrderDetails />} /> {/* NewOrderDetails component */}
          <Route path="/new-order-details/:id" element={<NewOrderDetails />} /> {/* NewOrderDetails component with ID */}
          <Route path="/new-order-details-package" element={<NewOrderDetailsPackage />} /> {/* NewOrderDetailsPackage component */}
          <Route path="/new-order-full-coverage" element={<NewOrderFullCoverage />} /> {/* NewOrderFullCoverage component */}
          <Route path="/pick-up-location" element={<PickUpLocation />} /> {/* PickUpLocation component */}
          <Route path="/setup-payment" element={<SetupPayment />} /> {/* SetupPayment component */}
          <Route path="/where-delivered" element={<WhereDelivered />} /> {/* WhereDelivered component */}
          <Route path="/checking-order" element={<CheckingOrder />} /> {/* CheckingOrder component */}
          <Route path="/checking-done" element={<CheckingDone />} /> {/* CheckingDone component */}
          <Route path="/profile" element={<Profile />} /> {/* Profile component */} 
          
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

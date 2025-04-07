import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from '../src/pages/Dashboard'; 
import Register from './componants/Auth/register'; // Import the Rejester component
import Login from './componants/Auth/login'; // Import the Login component
import NotFound from './pages/NotFound';
import NewOrder from './pages/NewOrder'; // Import the NewOrder component
import TrackingMain from './componants/sections/dashboardsMain/trackingMain';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />} /> {/* Dashboard with nested routes */}
        <Route path="/register/*" element={<Register />} /> {/* Rejester component */}
        <Route path="/login" element={<Login />} /> {/* Login component */}
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        <Route path="/new-order" element={<NewOrder />} /> {/* NewOrder component */}
        <Route path="/tracking" element={<TrackingMain />} /> {/* TrackingMain component */}
      </Routes>
    </Router>
  );
};

export default App;

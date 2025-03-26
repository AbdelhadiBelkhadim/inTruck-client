import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from './layout/Layout';
import TrackingMain from './componants/sections/dashboardMain/trackingMain'; // Ensure TrackingMain is imported

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />} /> {/* Dashboard with nested routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

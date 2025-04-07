import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from '../src/pages/Dashboard'; 
import NotFound from './pages/NotFound';
import NewOrder from './pages/NewOrder'; // Import the NewOrder component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />} /> {/* Dashboard with nested routes */}
        <Route path="/new-order" element={<NewOrder />} /> {/* New Order page */}
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import Home from './pages/Home';
import Dashboard from './pages/Dashboard.jsx';
import Register from './componants/Auth/register'; // Import the Rejester component
import Login from './componants/Auth/login'; // Import the Login component
import NotFound from './pages/NotFound';
import NewOrder from './pages/NewOrder'; // Import the NewOrder component
import FormTest from './componants/formTest'; // Import the FormTest component
import apiClient from './api/apiClient';

// Create a QueryClient instance (can configure options here)
const queryClient = new QueryClient();

const App = () => {
  const fetchData = async () => {
    try {
      const response = await apiClient.get('/example-endpoint'); // Replace with your endpoint
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
      // Wrap the entire app in QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/register/*" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/form-test" element={<FormTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      
    </QueryClientProvider>
  );
};

export default App;

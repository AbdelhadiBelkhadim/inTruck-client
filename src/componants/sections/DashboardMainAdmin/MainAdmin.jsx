import React, { useState, useEffect, useContext } from 'react';
import { Package, Truck, Users } from 'lucide-react';
import StatsCard from '../../ui/StatsCard';
import Summary from '../Summary';
import LastOrders from '../LastOrders';
import WatingConfirmation from '../../ui/WatingConfirmation';
import axios from 'axios';
import LoadingSpinner from '../../LoadingSpinner';
import { AuthContext } from '../../../contexts/AuthContext';

// Define the API base URL - replace with your actual API URL
const API_BASE_URL = 'https://intruck-backend-production.up.railway.app'; // Remove '/admin' from base URL

const MainAdmin = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [count] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    deliveriesToday: 0,
    activeTrucks: 0,
    availableDrivers: 0,
    revenueToday: 0
  });

  // Initialize with empty status counts
  const [orderStatusCounts, setOrderStatusCounts] = useState({
    IN_TRANSIT: 0,
    DELIVERED: 0,
    PENDING: 0,
    CANCELED: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get token from localStorage instead of context
        const token = localStorage.getItem('token');
        
        // Check if token exists
        if (!token) {
          setError('Authentication token is missing. Please log in again.');
          setLoading(false);
          return;
        }

        setLoading(true);
        // Try different endpoint structure
        const response = await axios.get(`${API_BASE_URL}/admin/dashboard`, {
          // Add headers if authentication is required
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = response.data;
        console.log('Dashboard data:', data); // Log the response data for debugging
        
        setDashboardStats({
          deliveriesToday: data.deliveriesToday || 0,
          activeTrucks: data.activeTrucks || 0,
          availableDrivers: data.availableDrivers || 0,
          revenueToday: data.revenueToday || 0
        });
        
        // Check if the API returns order status counts
        if (data.orderStatusCounts) {
          setOrderStatusCounts(data.orderStatusCounts);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        // Add more detailed error message
        let errorMessage = 'Failed to load dashboard data';
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = `Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`;
          console.error('Error response:', err.response.data);
          
          // If token is invalid or expired, provide a more helpful message
          if (err.response.status === 401 || err.response.status === 403) {
            errorMessage = 'Your session has expired. Please log in again.';
          }
        } else if (err.request) {
          // The request was made but no response was received
          errorMessage = 'No response from server. Check your connection.';
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = `Request error: ${err.message}`;
        }
        
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated]);

  // Debug token
  useEffect(() => {
    console.log('Token from localStorage:', localStorage.getItem('token'));
  }, []);

  const statsData = [
    {
      icon: Package,
      value: dashboardStats.deliveriesToday,
      title: 'Deliveries Today',
    },
    {
      icon: Truck,
      value: dashboardStats.activeTrucks,
      title: 'Trucks Active',
    },
    {
      icon: Users,
      value: dashboardStats.availableDrivers,
      title: 'Available Drivers',
    },
    {
      value: dashboardStats.revenueToday,
      title: 'Revenue Today',
      currency: 'MAD',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size={50} color="#4A90E2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-xl lg:text-3xl font-bold text-primary">Welcome, Admin</h1>
        <p className="mt-2 text-primary text-[11px] lg:text-[31px]">
          Here's what's happening today in your application
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            value={stat.value}
            title={stat.title}
            currency={stat.currency}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:flex md:flex-row-reverse md:gap-4 mt-4">
        <div className="md:flex-1">
          <Summary dashboardData={orderStatusCounts} />
        </div>
        {count !== 0 && (
          <div className="md:flex-1">
            <LastOrders />
          </div>
        )}
      </div>

      <WatingConfirmation />
    </div>
  );
};

export default MainAdmin;

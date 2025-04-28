// ✅ src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://intruck-backend-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login or handle token expiration
      localStorage.removeItem('token');
      window.location.href = '/login'; // Adjust this as needed
    }
    return Promise.reject(error);
  }
);

// Authentication

export const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

export const registerIndividual = async (userData) => {
  const response = await api.post('/auth/register', {
    ...userData,
    accountType: 'INDIVIDUAL',
  });
  return response.data;
};

export const registerCompany = async (userData) => {
  const response = await api.post('/auth/register', {
    ...userData,
    accountType: 'COMPANY',
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

// User Profile

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await api.put('/users/profile', profileData);
  return response.data;
};

// Dashboard Data

export const getDashboardData = async () => {
  const response = await api.get('/dashboard');
  return response.data;
};

// Orders

export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getTrackingOrders = async () => {
  const response = await api.get('/orders/tracking');
  return response.data;
};

export const getDeliveredOrders = async () => {
  const response = await api.get('/orders/delivered');
  return response.data;
};

export const getCancelledOrders = async () => {
  const response = await api.get('/orders/cancelled');
  return response.data;
};

export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
      error.message || 
      'Failed to fetch orders';
    throw new Error(errorMessage);
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
      error.message || 
      `Failed to fetch order with ID: ${id}`;
    throw new Error(errorMessage);
  }
};

/**
 * Gets detailed information about an order including tracking status
 * @param {string} id - The ID of the order to fetch
 * @returns {Promise<Object>} - The order data with tracking details
 */
export const getOrderDetails = async (id) => {
  try {
    const response = await api.get(`/orders/${id}/details`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
      error.message || 
      `Failed to fetch detailed information for order: ${id}`;
    throw new Error(errorMessage);
  }
};

export const updateOrder = async (id, orderData) => {
  try {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
      error.message || 
      'Failed to update order';
    throw new Error(errorMessage);
  }
};

export const cancelOrder = async (id, reason) => {
  try {
    const response = await api.put(`/orders/${id}/update-status`, { 
      status: 'CANCELLED',
      reason 
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
      error.message || 
      'Failed to cancel order';
    throw new Error(errorMessage);
  }
};

// Pricing calculation

export const calculatePrice = async (requestData) => {
  console.log('Price Calculation Request Body:', requestData);
  try {
    const response = await api.post('/pricing/calculate', requestData);
    console.log('Price Calculation API Response:', response.data);
    const price = response.data.price;
    console.log('Extracted Price Value:', price);
    return price;
  } catch (error) {
    console.error('Price Calculation Error:', error);
    throw error;
  }
};

// Haversine formula for calculating distance
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

export default api;

// ✅ src/api/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://intruck-backend-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional interceptor for auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ✅ Auth API calls

export const loginUser = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  const { token } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data in local storage
  localStorage.setItem('id', response.data.user.id); // Store user ID in local storage
  return response.data;
};

export const registerIndividual = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

export const registerCompany = async (companyData) => {
  const response = await apiClient.post('/auth/register', companyData);
  return response.data;
};

export const forgotPassword = async (forgotPasswordData) => {
  const response = await apiClient.post('/auth/forgetPassword', forgotPasswordData);
  return response.data;
};

// Get user profile data
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update user profile data
export const updateUserProfile = async (profileData) => {
  try {
    const response = await apiClient.put('/auth/updateProfile', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//dashboard API calls
export const getDashboardData = async () => {
  const response = await apiClient.get('/dashboard');
  return response.data;
};

// ✅ Order API calls

export const createOrder = async (orderData) => {
  const response = await apiClient.post('/dashboard/newOrder', orderData);
  return response.data;
};

export const getTrackingOrders = async () => {
  const response = await apiClient.get('/dashboard/tracking');
  console.log(response.data);
  return response.data;
};

export const getDeliveredOrders = async () => {
  const response = await apiClient.get('/dashboard/deleveries');
  return response.data;
};

export const getCancelledOrders = async () => {
  const response = await apiClient.get('/dashboard/canceled');
  return response.data;
};

export const getOrders = async () => {
  const response = await apiClient.get('/dashboard/orders');
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await apiClient.get(`/dashboard/orders/${orderId}`);
  return response.data;
};

export const updateOrder = async (orderId, orderData) => {
  const response = await apiClient.put(`/dashboard/orders/${orderId}`, orderData);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await apiClient.delete(`/dashboard/orders/${orderId}`);
  return response.data;
};

// ✅ Pricing API calls

export const calculatePrice = async (pickupCoordinates, deliveryCoordinates, packageDetails) => {
  console.log('Calculate price called with coordinates:', { 
    pickup: pickupCoordinates, 
    delivery: deliveryCoordinates,
    packageDetails
  });
  
  try {
    // Prepare request body with coordinates in the format expected by the backend
    const requestBody = {
      origin: {
        lat: pickupCoordinates.lat,
        lng: pickupCoordinates.lng
      },
      destination: {
        lat: deliveryCoordinates.lat,
        lng: deliveryCoordinates.lng
      },
      packageDetails // Include package details for future use
    };
    
    console.log('Sending request with body:', requestBody);
    
    // Call the correct backend endpoint
    const response = await apiClient.post('/dashboard/distance', requestBody);
    console.log('Distance calculation API response:', response.data);
    console.log('Raw price value from response:', response.data.price);
    
    // Extract relevant data from the response
    const { distanceText, distanceKm, durationText, price } = response.data;
    
    // Parse the price string from the backend format "price: 123 dh"
    let priceValue = 0;
    if (typeof price === 'string') {
      // Handle string format with or without "dh" suffix
      const priceMatch = price.match(/\d+(\.\d+)?/);
      if (priceMatch) {
        priceValue = parseFloat(priceMatch[0]);
      }
    } else if (typeof price === 'number') {
      priceValue = price;
    } else if (price && typeof price === 'object') {
      // Handle if price is an object with a price property
      if (price.hasOwnProperty('price')) {
        priceValue = price.price;
      } else if (price.hasOwnProperty('value')) {
        priceValue = price.value;
      } else {
        // Try to extract the first numeric property
        const firstValue = Object.values(price).find(v => !isNaN(parseFloat(v)));
        if (firstValue) {
          priceValue = parseFloat(firstValue);
        }
      }
    }
    
    console.log('Extracted price value:', priceValue);
    
    // Return the calculated price, distance, and duration
    return {
      price: priceValue,
      distance: distanceKm || 0,
      distanceText: distanceText || `${distanceKm?.toFixed(2) || 0} km`,
      duration: durationText || 'Not available'
    };
  } catch (error) {
    console.error('Error calculating price:', error);
    throw error;
  }
};

// Calculate distance using Haversine formula (matches the controller logic)
function calculateHaversineDistance(lat1, lng1, lat2, lng2) {
  // Convert coordinates from strings to numbers if they are strings
  lat1 = parseFloat(lat1);
  lng1 = parseFloat(lng1);
  lat2 = parseFloat(lat2);
  lng2 = parseFloat(lng2);
  
  // Calculate distance using Haversine formula
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  
  return distance;
}

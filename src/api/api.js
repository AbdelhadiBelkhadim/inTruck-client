// ✅ src/api/api.js
import axios from 'axios';

// Create Axios client
const apiClient = axios.create({
  baseURL: 'https://intruck-backend-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
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

// Response interceptor for auth errors
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

// ✅ Auth API
export const loginUser = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  const { token } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  localStorage.setItem('id', response.data.user.id);
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

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await apiClient.put('/auth/updateProfile', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ Dashboard API
export const getDashboardData = async () => {
  const response = await apiClient.get('/dashboard');
  return response.data;
};

// ✅ Order API
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

// ✅ Pricing API
export const calculatePrice = async (pickupCoordinates, deliveryCoordinates, packageDetails) => {
  console.log('Calculate price called with coordinates:', { 
    pickup: pickupCoordinates, 
    delivery: deliveryCoordinates,
    packageDetails
  });
  
  try {
    const requestBody = {
      origin: {
        lat: pickupCoordinates.lat,
        lng: pickupCoordinates.lng,
      },
      destination: {
        lat: deliveryCoordinates.lat,
        lng: deliveryCoordinates.lng,
      },
      packageDetails,
    };

    console.log('Sending request with body:', requestBody);

    const response = await apiClient.post('/dashboard/distance', requestBody);
    console.log('Distance calculation API response:', response.data);

    const { distanceText, distanceKm, durationText, price } = response.data;

    let priceValue = 0;
    if (typeof price === 'string') {
      const priceMatch = price.match(/\d+(\.\d+)?/);
      if (priceMatch) {
        priceValue = parseFloat(priceMatch[0]);
      }
    } else if (typeof price === 'number') {
      priceValue = price;
    } else if (price && typeof price === 'object') {
      if (price.hasOwnProperty('price')) {
        priceValue = price.price;
      } else if (price.hasOwnProperty('value')) {
        priceValue = price.value;
      } else {
        const firstValue = Object.values(price).find(v => !isNaN(parseFloat(v)));
        if (firstValue) {
          priceValue = parseFloat(firstValue);
        }
      }
    }

    console.log('Extracted price value:', priceValue);

    return {
      price: priceValue,
      distance: distanceKm || 0,
      distanceText: distanceText || `${distanceKm?.toFixed(2) || 0} km`,
      duration: durationText || 'Not available',
    };
  } catch (error) {
    console.error('Error calculating price:', error);
    throw error;
  }
};

// Helper: Calculate distance using Haversine formula
function calculateHaversineDistance(lat1, lng1, lat2, lng2) {
  lat1 = parseFloat(lat1);
  lng1 = parseFloat(lng1);
  lat2 = parseFloat(lat2);
  lng2 = parseFloat(lng2);

  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// ✅ Payment API
export const createPayment = async (paymentData) => {
  return apiClient.post('/payment/create-payment-intent', paymentData);
};

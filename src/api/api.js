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

export const getUserProfile = async () => {
  const response = await apiClient.get('/auth/profile');
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await apiClient.put('/auth/profile', profileData);
  return response.data;
};

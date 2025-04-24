import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://intruck-backend-production.up.railway.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ must stay ON for cookie-based auth
});



export default apiClient;


// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors by redirecting to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

//Auth API calls
export const loginUser = async (credentials) => {
  const response = await axios.post('https://intruck-backend-production.up.railway.app/auth/login', credentials, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
};

export const registerIndividual = async (userData) => {
  const response = await axios.post('https://intruck-backend-production.up.railway.app/auth/register', userData);
  return response.data;
};

export const registerCompany = async (companyData) => {
const response = await axios.post('https://intruck-backend-production.up.railway.app/auth/register', companyData);
return response.data;
};


export const forgotPassword = async (forgotPasswordData) => {
const response = await axios.post('https://intruck-backend-production.up.railway.app/auth/forgetPassword', forgotPasswordData);
return response.data;
};

// Your existing API function
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Add more API functions as needed
export const updateUserProfile = async (profileData) => {
  try {
    const response = await apiClient.put('/user/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
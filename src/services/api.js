import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (optional)
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization token if needed
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

// Response interceptor (optional)
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response ? error.response.data : error);
  }
);

// User APIs
export const userAPI = {
  registerUser: (data) => apiClient.post('/users/registerUser', data),
  loginUser: (data) => apiClient.post('/users/login', data), // Example login endpoint
  getProfile: () => apiClient.get('/users/profile'), // Example profile endpoint
};

export default apiClient;

import axios from 'axios';
import { tokenService } from './tokenService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const publicEndpoints = ['/user/login', '/user/register'];

    if(publicEndpoints.some((endpoint) => config.url?.includes(endpoint))) {
      return config;
    }
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenService.clearAll();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
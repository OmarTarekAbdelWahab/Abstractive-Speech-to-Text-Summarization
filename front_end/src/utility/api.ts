  import axios from 'axios';
import { tokenService } from './tokenHandler';

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
    console.log("Token in request interceptor:", token);
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
  (response) => {
    console.log("return", response);
    if (response.data.token) {
      tokenService.setToken(response.data.token);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      tokenService.clearAll();
      alert('Your session has expired. Please log in again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
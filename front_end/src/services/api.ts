  import axios from 'axios';
import { storageHandler } from './storageHandler';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_API_URL,
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
    const token = storageHandler.getTokenFromStorage();
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
      storageHandler.setTokenInStorage(response.data.token);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      storageHandler.clearAllFromStorage();
      alert('Your session has expired. Please log in again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
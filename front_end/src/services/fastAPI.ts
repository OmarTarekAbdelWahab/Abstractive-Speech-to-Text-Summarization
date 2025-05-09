import axios from 'axios';
import { storageHandler } from '../services/storageHandler';

const fastAPI = axios.create({
  baseURL: import.meta.env.VITE_FAST_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': "true",
  },
});

fastAPI.interceptors.request.use(
  (config) => {
    const publicEndpoints = ['/model', '/upload'];

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

export default fastAPI;
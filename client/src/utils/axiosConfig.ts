import axios from 'axios';
import { useAuthStore } from '../store/authStore'; 

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// This "interceptor" runs before every request
api.interceptors.request.use((config) => {
  // Read the token from your store
  const token = useAuthStore.getState().token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

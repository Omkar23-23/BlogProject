import axios from 'axios';
import { environment } from '../config/environment';

const apiClient = axios.create({
  baseURL: environment.apiBaseUrl.replace(/\/$/, '') + '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    // Attach JWT token if present
    // Backend expects Authorization: Bearer <token>
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize error shape
    const apiError = {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
    };
    return Promise.reject(apiError);
  }
);

export default apiClient;

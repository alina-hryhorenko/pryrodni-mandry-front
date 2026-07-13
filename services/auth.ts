// Authentication API functions
// Authentication API functions
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post('/auth/refresh');
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        useAuthStore.getState().logout();
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });

  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
  }

  return data;
};

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const { data } = await api.post('/auth/register', { name, email, password });

  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
  }

  return data;
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } finally {
    localStorage.removeItem('accessToken');
    useAuthStore.getState().logout();
  }
};

export const refreshTokens = async () => {
  const { data } = await api.post('/auth/refresh');
  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
  }
  return data;
};

export default api;

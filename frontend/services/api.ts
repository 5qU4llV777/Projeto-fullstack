import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Injeta o token JWT salvo após o login em toda requisição
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('taskflow_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
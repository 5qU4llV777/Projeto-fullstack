import api from './api';
import { User } from '../types';

interface AuthResponse {
  accessToken: string;
  user: User;
}

export async function login(email: string, password: string) {
  const { data } = await api.post<AuthResponse>('/auth/login', {
    email,
    password,
  });
  localStorage.setItem('taskflow_token', data.accessToken);
  return data.user;
}

export async function register(name: string, email: string, password: string) {
  const { data } = await api.post<AuthResponse>('/auth/register', {
    name,
    email,
    password,
  });
  localStorage.setItem('taskflow_token', data.accessToken);
  return data.user;
}

export function logout() {
  localStorage.removeItem('taskflow_token');
}
import { User } from '@/types/user';
import api from './api';

// Authentication API functions
export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post('/auth/login', data);
  console.log('res.data', res.data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  console.log('checkSession', res.data);
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/auth/me');
  console.log('getMe', data);
  return data;
};

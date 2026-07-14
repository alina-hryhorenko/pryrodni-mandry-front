import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
// });

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post('/auth/login', data);
  console.log('res.data', res.data);
  return res.data;
};

export default api;

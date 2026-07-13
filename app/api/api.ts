// app/api/api.ts

import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: 'https://pryrodni-mandry-back-f2hd.onrender.com',
  withCredentials: true, // також додаємо цей параметр
});

import axios from 'axios';
import { cookies } from 'next/headers';

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  return axios.get('http://localhost:3000/api/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export const serverApi = async () => {
  const cookieStore = await cookies();

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

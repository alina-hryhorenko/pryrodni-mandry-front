import axios from 'axios';
import { cookies } from 'next/headers';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  return axios.get('http://localhost:3000/api/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
};

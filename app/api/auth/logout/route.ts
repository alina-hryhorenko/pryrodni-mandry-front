import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../../api';

export async function POST() {
  const cookieStore = await cookies();

  try {
    await api.post('auth/logout', null, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
  } catch {
    // Навіть якщо бекенд недоступний — все одно чистимо локальні cookie
  }

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('sessionId');

  return NextResponse.json({ success: true });
}

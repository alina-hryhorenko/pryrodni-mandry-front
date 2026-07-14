// app/api/auth/session/route.ts

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../../api';
import { parseSetCookie } from 'cookie';

export async function GET() {
  // Отримуємо інстанс для роботи з cookie
  const cookieStore = await cookies();

  // Дістаємо токени
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  // Якщо accessToken є — сесія валідна
  if (accessToken) {
    return NextResponse.json({ success: true });
  }

  // Якщо accessToken немає — перевіряємо refreshToken
  if (refreshToken) {
    try {
      // Виконуємо запит до API, передаючи всі cookie у заголовку
      const apiRes = await api.post('auth/refresh', null, {
        headers: {
          Cookie: cookieStore.toString(), // перетворюємо cookie у рядок
        },
      });

      // Якщо бекенд повернув нові токени — встановлюємо їх
      const setCookie = apiRes.headers['set-cookie'];
      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);

          if (parsed.value) {
            cookieStore.set(parsed.name, parsed.value, parsed);
          }
        }
        return NextResponse.json({ success: true });
      }
    } catch {
      // refreshToken прострочений або невалідний — сесія невалідна
      return NextResponse.json({ success: false });
    }
  }

  // Якщо немає refreshToken або API повернув пустий setCookie — сесія невалідна
  return NextResponse.json({ success: false });
}

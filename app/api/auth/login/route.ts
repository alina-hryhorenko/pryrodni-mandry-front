import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parseSetCookie } from 'cookie';

import { api, ApiError } from '../../api';

export async function POST(req: NextRequest) {
  // Парсимо тіло запиту
  const body = await req.json();
  try {
    // Виконуємо запит до API
    const apiRes = await api.post('auth/login', body);

    // Ініціалізуємо cookieStore
    const cookieStore = await cookies();
    // Дістаємо set-cookie з хедерів відповіді
    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      // Якщо set-cookie — масив, беремо як є, інакше примусово робимо масив
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      // Проходимо по кожному cookie
      for (const cookieStr of cookieArray) {
        const parsed = parseSetCookie(cookieStr);

        // Встановлюємо токени
        if (parsed.value) {
          cookieStore.set(parsed.name, parsed.value, parsed);
        }
      }

      return NextResponse.json(apiRes.data);
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}

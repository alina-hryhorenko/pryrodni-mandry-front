import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { api } from '../../api';
import { clearAuthCookies } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  let setCookieHeader: string | string[] | undefined;

  try {
    const apiRes = await api.post(
      'auth/logout',
      {},
      { headers: { Cookie: req.headers.get('cookie') ?? '' } },
    );
    setCookieHeader = apiRes.headers['set-cookie'];
  } catch {
    // Логаут на фронті має відбутись незалежно від відповіді бекенду
  }

  clearAuthCookies(cookieStore, setCookieHeader);

  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { api } from '../../api';
import { clearAuthCookies } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    await api.post(
      'auth/logout',
      {},
      { headers: { Cookie: req.headers.get('cookie') ?? '' } },
    );
  } catch {
    // Логаут на фронті має відбутись незалежно від відповіді бекенду
  }

  const cookieStore = await cookies();
  clearAuthCookies(cookieStore);

  return NextResponse.json({ success: true });
}

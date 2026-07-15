import { api } from '../../api';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { logErrorResponse } from '../../_utils/utils';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const res = await api.get('/api/users/my-stories', {
      params,
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

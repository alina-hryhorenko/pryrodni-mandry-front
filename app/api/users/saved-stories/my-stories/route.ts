import { cookies } from 'next/headers';
import { api, ApiError } from '../../../api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();

  const page = req.nextUrl.searchParams.get('page');
  const limit = req.nextUrl.searchParams.get('limit');

  try {
    const { data } = await api.get('/users/my-stories', {
      headers: {
        Cookie: cookieStore.toString(),
      },
      params: {
        page,
        limit,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      {
        status: (error as ApiError).response?.status ?? 500,
      },
    );
  }
}

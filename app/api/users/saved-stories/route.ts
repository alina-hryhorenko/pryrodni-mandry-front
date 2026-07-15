import { cookies } from 'next/headers';
import { api, ApiError } from '../../api';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookieStore = await cookies();

  const { searchParams } = new URL(request.url);

  try {
    const { data } = await api.get('/users/saved-stories', {
      headers: {
        Cookie: cookieStore.toString(),
      },
      params: {
        page: searchParams.get('page'),
        limit: searchParams.get('limit'),
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
      { status: (error as ApiError).response?.status ?? 500 },
    );
  }
}

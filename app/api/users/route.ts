import api from '@/services/api';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get('page') ?? 1);
  const limit = Number(req.nextUrl.searchParams.get('limit') ?? 12);

  try {
    const res = await api.get('/users', {
      params: {
        page,
        limit,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: error.message },
        { status: error.response?.status ?? 502 },
      );
    }

    return NextResponse.json({ message: 'Unexpected error' }, { status: 500 });
  }
}

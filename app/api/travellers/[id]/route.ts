import api from '@/services/api';
import axios from 'axios';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;

  try {
    const res = await api.get(`/users/${id}`);

    return NextResponse.json(res.data, {
      status: res.status,
    });
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

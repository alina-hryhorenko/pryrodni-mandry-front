import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { logErrorResponse } from '../../_utils/utils';

interface RouteParams {
  params: Promise<{
    travellerId: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { travellerId } = await params;
  const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
  const limit = Number(request.nextUrl.searchParams.get('limit') ?? 6);

  try {
    const res = await api.get(`/api/users/${travellerId}`, {
      params: {
        page,
        limit,
      },
    });

    return NextResponse.json(res.data, {
      status: res.status,
    });
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

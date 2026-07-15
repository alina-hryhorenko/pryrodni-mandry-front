import { isAxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { api } from '../../api';
import { logErrorResponse } from '../../_utils/utils';

interface RouteParams {
  params: Promise<{
    travellerId: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { travellerId } = await params;

  try {
    const res = await api.get(`/api/users/${travellerId}`);

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

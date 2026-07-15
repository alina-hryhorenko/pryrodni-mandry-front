// Users API functions
import { GetUsersResponse, GetUsersParams } from '@/types/user';

import { api } from '@/app/api/api';

export async function getUsers({
  page,
  limit,
}: GetUsersParams): Promise<GetUsersResponse> {
  const { data } = await api.get<GetUsersResponse>('/users', {
    params: {
      page,
      limit,
    },
  });

  return data;
}

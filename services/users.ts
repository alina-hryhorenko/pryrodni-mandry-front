// Users API functions
import type { User } from '@/types/user';

import { api } from '@/app/api/api';

export interface GetUsersResponse {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}

export interface GetUsersParams {
  page: number;
  limit: number;
}

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

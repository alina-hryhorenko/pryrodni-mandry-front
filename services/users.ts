// Users API functions
import type { GetUsersParams, UsersResponse } from '../types/user';
import api from './api';

export async function getUsers({
  page,
  limit,
}: GetUsersParams): Promise<UsersResponse> {
  const { data } = await api.get<UsersResponse>('/users', {
    params: {
      page,
      limit,
    },
  });

  return data;
}

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
// import api from './api';

// export const getAllTravellers = async (page = 1, limit = 6) => {
//     const { data } = await api.get('/users', {
//       params: { page, limit },
//     });

//     return data;
// };

// export const getTravellerById = async (id: string, page = 1, limit = 6) => {
//     const { data } = await api.get(`/users/${id}`, {
//       params: { page, limit },
//     });

//     return data;
// };

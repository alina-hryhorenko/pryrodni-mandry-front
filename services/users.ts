import api from './api';

export const getAllTravellers = async (page = 1, limit = 6) => {
  const { data } = await api.get('/users', {
    params: { page, limit },
  });

  return data;
};

export const getTravellerById = async (id: string, page = 1, limit = 6) => {
  const { data } = await api.get(`/users/${id}`, {
    params: { page, limit },
  });

  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/users/me');
  return data;
};

export const getMyStories = async ({ page = 1, limit = 6 }) => {
  const { data } = await api.get('/users/my-stories', {
    params: { page, limit },
  });

  return data;
};

export const getSavedStories = async ({ page = 1, limit = 6 }) => {
  const { data } = await api.get('/users/saved-stories', {
    params: { page, limit },
  });

  return data;
};

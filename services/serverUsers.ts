import { serverApi } from './serverApi';

export const getMeServer = async () => {
  const api = await serverApi();

  const { data } = await api.get('/api/users/me');

  return data;
};

export const getMyStoriesServer = async ({ page = 1, limit = 6 }) => {
  const api = await serverApi();

  const { data } = await api.get('/api/users/my-stories', {
    params: {
      page,
      limit,
    },
  });

  return data;
};

export const getSavedStoriesServer = async ({ page = 1, limit = 6 }) => {
  const api = await serverApi();

  const { data } = await api.get('/api/users/saved-stories', {
    params: {
      page,
      limit,
    },
  });

  return data;
};

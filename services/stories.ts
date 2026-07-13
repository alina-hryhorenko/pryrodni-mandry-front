// Stories API functions
import { Story } from '@/types/story';
import api from './api';
import { PopularStoriesResponse } from '@/types/story';

export const getStories = async (page: number): Promise<Story[]> => {
  const { data } = await api.get(`/api/stories`, {
    params: { page },
  });

  return data.stories;
};


export const getPopularStories = async (): Promise<Story[]> => {
  const { data: body } =
    await api.get<PopularStoriesResponse>(`/api/stories/popular`);
  return body.data;
};

export const saveStory = async (storyId: string) => {};

export const unsaveStory = async (storyId: string) => {};

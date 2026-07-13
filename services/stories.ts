import { isAxiosError } from 'axios';
import api from './api';
import { PopularStoriesResponse, Story } from '@/types/story';

export type StoryDetailsData = Story & {
  date?: string;
  category?: string;
  isSaved?: boolean;
};

interface GetStoryByIdResponse {
  status: number;
  data: Story;
}

interface SavedStoryItem {
  _id: string;
}

export const getStoryById = async (
  storyId: string,
): Promise<StoryDetailsData | null> => {
  try {
    const res = await api.get<GetStoryByIdResponse>(`/api/story/${storyId}`);
    return res.data.data as StoryDetailsData;
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
};

export const getPopularStories = async (): Promise<Story[]> => {
  const { data: body } = await api.get<PopularStoriesResponse>(
    '/api/stories/popular',
  );
  return body.data;
};

export const saveStory = async (storyId: string) => {
  const { data } = await api.post('/api/users/save', { storyId });
  return data;
};

export const unsaveStory = async (storyId: string) => {
  const { data } = await api.delete(`/api/users/save/${storyId}`);
  return data;
};

export const getSavedStoryIds = async (): Promise<string[]> => {
  try {
    const { data } = await api.get<{ data: SavedStoryItem[] }>(
      '/api/users/me/saved',
    );
    if (Array.isArray(data.data)) {
      return data.data.map((story) => story._id);
    }
    return [];
  } catch (error) {
    console.warn('Failed to fetch saved stories:', error);
    return [];
  }
};

import { isAxiosError } from 'axios';
import api from './api';
import { PopularStoriesResponse, Story, StoryFormData } from '@/types/story';

export type StoryDetailsData = Story & {
  date?: string;
  category?: string;
  isSaved?: boolean;
};

interface getStoryByIdResponse {
  status: number,
  data: Story
}

export const getStoryById = async (storyId: string): Promise<StoryDetailsData | null> => {
  try {
    const res = await api.get<getStoryByIdResponse>(`/api/story/${storyId}`);

    return res.data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw new Error('Failed to fetch story');
  }
}

export const getPopularStories = async (): Promise<Story[]> => {
  const { data: body } = await api.get<PopularStoriesResponse>(
    '/api/stories/popular',
  );

  return body.data;
};

export const saveStory = async (storyId: string) => {};

export const unsaveStory = async (storyId: string) => {};

export const createStory = async (newStory: StoryFormData): Promise<Story> => {
  const formData = new FormData();

  if (newStory.img) {
    formData.append('img', newStory.img);
  }

  formData.append('title', newStory.title);
  formData.append('category', newStory.category);
  formData.append('article', newStory.article);

  const { data } = await api.post<Story>('/stories', formData);
  return data;
};

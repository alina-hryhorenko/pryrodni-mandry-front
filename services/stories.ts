import { isAxiosError } from 'axios';
import api from './api';
import { PopularStoriesResponse, Story, StoryFormData } from '@/types/story';

export type StoryDetailsData = Story & {
  date?: string;
  isSaved?: boolean;
};

interface getStoryByIdResponse {
  status: number;
  data: Story;
}

type SortBy = 'popular' | 'new';

export interface getAllStoriesProps {
  page?: number;
  limit?: number;
  category?: string;
  sort?: SortBy;
}

interface getAllStoriesResponse {
  page: number;
  limit: number;
  stories: Story[];
  totalPages: number;
  totalStories: number;
}

export const getAllStories = async (
  params: getAllStoriesProps,
): Promise<getAllStoriesResponse> => {
  const res = await api.get<getAllStoriesResponse>('/stories', { params });

  return res.data;
};

export const getStoryById = async (
  storyId: string,
): Promise<StoryDetailsData | null> => {
  try {
    const res = await api.get<getStoryByIdResponse>(`/stories/${storyId}`);

    return res.data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw new Error('Failed to fetch story');
  }
};

export const getPopularStories = async (): Promise<Story[]> => {
  const { data: body } =
    await api.get<PopularStoriesResponse>('/stories/popular');

  return body.data;
};

export const saveStory = async (storyId: string) => {
  const { data } = await api.post('/users/save', { storyId });
  return data;
};

export const unsaveStory = async (storyId: string) => {
  const { data } = await api.delete(`/users/save/${storyId}`);
  return data;
};

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

import api from './api';
import { Story, StoryFormData } from '@/types/story';

export const createStory = async (newStory: StoryFormData): Promise<Story> => {
  const { data } = await api.post<Story>('/stories', newStory);
  return data;
};

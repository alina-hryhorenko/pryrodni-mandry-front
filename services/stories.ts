import api from './api';

export type Story = {
  _id: string;
  title: string;
  description: string;
  img: string;
  isSaved: boolean;
};

export const getStoryById = async (storyId: string): Promise<Story | null> => {
  try {
    const { data } = await api.get<Story>(`/story/${storyId}`);
    return data;
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
};
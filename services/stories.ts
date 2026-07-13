import api from './api';
import { PopularStoriesResponse, Story } from '@/types/story';

export type StoryDetailsData = Story & {
  description?: string;
  content?: string;
  date?: string;
  category?: string;
  isSaved?: boolean;
};

export const getStoryById = async (
  storyId: string,
): Promise<StoryDetailsData | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/story/${storyId}`,
      { cache: 'no-store' },
    );

    if (!res.ok) return null;

    return await res.json();
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

export const saveStory = async (storyId: string) => {};

export const unsaveStory = async (storyId: string) => {};

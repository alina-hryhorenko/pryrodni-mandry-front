import type { Metadata } from 'next';
import { isAxiosError } from 'axios';
import { api } from '@/app/api/api';
import { Story } from '@/types/story';
import StoryPageClient from './StoryPageClient';

type Props = {
  params: Promise<{ storyId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { storyId } = await params;

  try {
    const res = await api.get<{ status: number; data: Story }>(
      `/api/story/${storyId}`
    );
    const story = res.data.data;

    const description = story.article
      ? story.article.slice(0, 160)
      : undefined;

    return {
      title: story.title,
      description,
      openGraph: {
        title: story.title,
        description,
        images: story.img ? [story.img] : undefined,
      },
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return { title: 'Історію не знайдено' };
    }

    return { title: 'Історія' };
  }
}

export default function StoryPage({ params }: Props) {
  return <StoryPageClient params={params} />;
}

'use client'; // Обов'язкова директива для клієнтських компонентів

import { useEffect, useState, use } from 'react';
import { getStoryById, StoryDetailsData } from '@/services/stories'; // Імпортуй тип, якщо він експортується
import StoryDetails from '@/components/StoryPage/StoryDetails/StoryDetails';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import RecomendedStories from '@/components/StoryPage/RecomendedStories';

type Props = {
  params: Promise<{ storyId: string }>;
};

export default function StoryPageClient({ params }: Props) {
  const { storyId } = use(params);

  const [story, setStory] = useState<StoryDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await getStoryById(storyId);

        if (!data) {
          notFound();
        } else {
          setStory(data);
        }
      } catch (error) {
        console.error('Помилка при завантаженні історії:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  if (isLoading) {
    return <main className={styles.page}>Завантаження...</main>;
  }

  if (!story) {
    return null;
  }

  return (
    <main className={styles.page}>
      <StoryDetails story={story} />

      <RecomendedStories category={story.category.id} />
    </main>
  );
}

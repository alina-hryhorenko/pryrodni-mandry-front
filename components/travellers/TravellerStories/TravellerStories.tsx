'use client';

import { useState } from 'react';
import { StoryCard } from '@/components/stories/StoryCard/StoryCard';
import { Story } from '@/types/story';
import css from './TravellerStories.module.css';

interface Props {
  initialStories: Story[];
  userId: string;
  totalPages: number;
}

export function TravellerStories({
  initialStories,
  userId,
  totalPages,
}: Props) {
  const [stories, setStories] = useState(initialStories);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function loadMore() {
    try {
      setIsLoading(true);
      const nextPage = page + 1;

      const response = await fetch(
        `/api/users/${userId}?page=${nextPage}&limit=12`,
      );

      const data = await response.json();

      setStories((prev) => [...prev, ...data.stories]);

      setPage(nextPage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={css.section}>
      <h2 className={css.heading}>Статті мандрівника</h2>
      <ul className={css.list}>
        {stories.map((story) => (
          <li key={story._id}>
            <StoryCard story={story} />
          </li>
        ))}
      </ul>

      {page < totalPages && (
        <button className={css.btn} onClick={loadMore} disabled={isLoading}>
          {isLoading ? 'Завантаження...' : 'Показати ще'}
        </button>
      )}
    </section>
  );
}

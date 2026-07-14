'use client';

import { useState } from 'react';
import { StoryCard } from '@/components/StoryCard/StoryCard';
import { Story } from '@/types/story';
import css from './TravellerStories.module.css';
import { getTravellerById } from '@/services/users';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

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

      const data = await getTravellerById(userId, nextPage, 6);

      setStories((prev) => [...prev, ...data.stories]);

      setPage(nextPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={css.section}>
      <h2 className={css.heading}>Статті мандрівника</h2>

      {stories.length === 0 ? (
        <MessageNoStories
          text="У цього мандрівника ще немає статей"
          buttonText="До мандрівників"
          linkTo="/travellers"
        />
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}

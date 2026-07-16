'use client';

import { useEffect, useState } from 'react';
import { StoryCard } from '@/components/StoryCard/StoryCard';
import { Story } from '@/types/story';
import css from './TravellerStories.module.css';
import { getTravellerById } from '@/services/users';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import LoadMoreButton from '@/components/ui/LoadMoreButton/LoadMoreButton';
import Loader from '@/components/ui/Loader/Loader';

interface Props {
  userId: string;
}

export function TravellerStories({ userId }: Props) {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTravellerById(userId, 1, 6);
        setStories(data.stories);
        setTotalPages(data.totalPages);
        setPage(1);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не вдалося завантажити статті');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, [userId]);

  const loadMore = async () => {
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await getTravellerById(userId, nextPage, 6);
      setStories((prev) => [...prev, ...data.stories]);
      setPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося завантажити статті');
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <section className={css.section}>
      {isLoading && <Loader />}
      <h2 className={css.heading}>Статті мандрівника</h2>

      {error && <p className={css.error}>{error}</p>}

      {stories.length === 0 && !isLoading ? (
        <MessageNoStories
          text="У цього мандрівника ще немає статей"
          buttonText="До мандрівників"
          linkTo="/travellers"
        />
      ) : (
        <>
          <ul className={css.list}>
            {stories.map((story, index) => (
              <li key={`${story._id}-${index}`}>
                <StoryCard story={story} />
              </li>
            ))}
          </ul>

          {page < totalPages && (
            <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} />
          )}
        </>
      )}
    </section>
  );
}

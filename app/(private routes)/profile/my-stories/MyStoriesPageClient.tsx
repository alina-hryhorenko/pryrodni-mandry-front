'use client';

import { useEffect, useState } from 'react';
import { StoryCard } from '@/components/StoryCard/StoryCard';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import Loader from '@/components/ui/Loader/Loader';
import LoadMoreButton from '@/components/ui/LoadMoreButton/LoadMoreButton';
import { getMyStories } from '@/services/stories';
import { Story } from '@/types/story';
import css from '../profile.module.css';

export default function MyStoriesPageClient() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getMyStories({ page: 1, limit: 6 });
        setStories(res.stories ?? []);
        setTotalPages(res.totalPages ?? 1);
        setPage(1);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Не вдалося завантажити ваші історії',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await getMyStories({ page: nextPage, limit: 6 });
      setStories((prev) => [...prev, ...(res.stories ?? [])]);
      setPage(nextPage);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Не вдалося завантажити ваші історії',
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && stories.length === 0) {
    return (
      <MessageNoStories
        text="Ви ще нічого не публікували, поділіться своєю першою історією!"
        buttonText="Опублікувати історію"
        linkTo="/stories/new"
      />
    );
  }

  return (
    <section className={css.storiesSection}>
      {error && <p className={css.error}>{error}</p>}

      <ul className={css.list}>
        {stories.map((story) => (
          <li key={story._id}>
            <StoryCard story={story} />
          </li>
        ))}
      </ul>

      {page < totalPages && (
        <LoadMoreButton onClick={handleLoadMore} isLoading={isLoadingMore} />
      )}
    </section>
  );
}

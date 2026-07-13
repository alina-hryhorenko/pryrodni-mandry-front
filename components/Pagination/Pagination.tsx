'use client';
import { Story } from '@/types/story';
import css from './Pagination.module.css';
import Loader from '@/components/ui/Loader/Loader';
import api from '@/services/api';
import { useEffect, useState, useCallback } from 'react';

type PaginationProps = {
  onData: (items: Story[]) => void;
};

export default function Pagination({ onData }: PaginationProps) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchStories = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await api.get('/api/stories', { params: { page } });

      const newStories: Story[] = res.data.stories;

      const totalPages: number = res.data.totalPages;

      onData(newStories);

      if (page >= totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.log('ERROR:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, onData]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleLoadMore = () => {
    if (!hasMore || isLoading) return;
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <button
        className={css.showMore}
        disabled={isLoading || !hasMore}
        onClick={handleLoadMore}
      >
        {hasMore ? 'Показати більше' : 'Більше немає'}
      </button>

      {isLoading && (
        <div className={css.loaderWrapper}>
          <Loader />
        </div>
      )}
    </>
  );
}

'use client'
import React, { useCallback, useEffect, useState } from 'react'
import style from './RecomendedStories.module.css'
import { Story } from '@/types/story';
import { StoryCard } from '../../StoryCard/StoryCard';
import { getAllStories } from '@/services/stories';
import Loader from '@/components/ui/Loader/Loader';

interface RecomendedStoriesProps {
    category: string
}

const DESKTOP_BREAKPOINT = 1440;

const RecomendedStories = ({ category }: RecomendedStoriesProps) => {
    const [recoStories, setRecoStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [limit, setLimit] = useState<number>(3);

    useEffect(() => {
      const updateLimit = () => {
        setLimit(window.innerWidth >= DESKTOP_BREAKPOINT ? 3 : 2);
      };

      updateLimit();
      window.addEventListener('resize', updateLimit);
      return () => window.removeEventListener('resize', updateLimit);
    }, [])

    const getStories = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try{
        const res = await getAllStories({
          limit,
          category: category,
          sort: 'popular'
        })
        setRecoStories(res.stories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не вдалося завантажити статті');
      } finally {
        setIsLoading(false);
      }
    }, [category, limit])

    useEffect(() => {
      getStories();
    }, [getStories])

  return (
    <section className={style.RecoContainer}>
      <h3 className={style.RecoContainerText}>Вам також сподобається</h3>

      {isLoading && <Loader />}

      {!isLoading && error && (
        <div className={style.error}>
          {error}
          <button
            type="button"
            className={style.retryBtn}
            onClick={() => getStories()}
          >
            Спробувати ще раз
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <div className={style.recoList}>
          {recoStories.map((story) => (
              <StoryCard key={story._id} story={story} />
          ))}
        </div>
      )}
    </section>
  )
}

export default RecomendedStories

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { getPopularStories } from '@/services/stories';
import { StoryCard } from '@/components/StoryCard/StoryCard';
import { Story } from '@/types/story';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './PopularStories.module.css';
import Icon from '@/components/ui/Icon/Icon';
import Loader from '@/components/ui/Loader/Loader';

export default function PopularStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);

  const loadStories = useCallback(async (signal?: { cancelled: boolean }) => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await getPopularStories();
      if (!signal?.cancelled) {
        setStories(response ?? []);
      }
    } catch (error) {
      console.error('Не вдалося завантажити популярні історії:', error);
      if (!signal?.cancelled) {
        setHasError(true);
      }
    } finally {
      if (!signal?.cancelled) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const signal = { cancelled: false };
    loadStories(signal);
    return () => {
      signal.cancelled = true;
    };
  }, [loadStories]);

  function handlePrevClick() {
    swiperRef.current?.slidePrev();
  }

  function handleNextClick() {
    swiperRef.current?.slideNext();
  }

  function handleSlideChange(swiper: SwiperType) {
    setIsAtStart(swiper.isBeginning);
    setIsAtEnd(swiper.isEnd);
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Популярні статті</h2>
          <Link
            href="/stories"
            className={`${styles.allLink} ${styles.allLinkTop}`}
          >
            Всі статті
          </Link>
        </div>

        <div aria-live="polite">
          {isLoading && <Loader />}

          {!isLoading && hasError && (
            <div className={styles.error}>
              Не вдалося завантажити популярні історії.
              <button
                type="button"
                className={styles.retryBtn}
                onClick={() => loadStories()}
              >
                Спробувати ще раз
              </button>
            </div>
          )}
        </div>

        {!isLoading && !hasError && stories.length > 0 && (
          <div className={styles.sliderWrapper}>
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                handleSlideChange(swiper);
              }}
              onSlideChange={handleSlideChange}
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 20 },
                1440: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className={styles.swiper}
            >
              {stories.map((story) => (
                <SwiperSlide key={story._id} className={styles.slide}>
                  <StoryCard story={story} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={styles.navControls}>
              <button
                type="button"
                className={`${styles.navBtn}`}
                onClick={handlePrevClick}
                disabled={isAtStart}
                aria-label="Попередні"
              >
                <Icon name="icon-strelka_left" className={styles.arrowIcon} />
              </button>
              <button
                type="button"
                className={`${styles.navBtn}`}
                onClick={handleNextClick}
                disabled={isAtEnd}
                aria-label="Наступні"
              >
                <Icon name="icon-strelka_right" className={styles.arrowIcon} />
              </button>
            </div>
          </div>
        )}

        <Link
          href="/stories"
          className={`${styles.allLink} ${styles.allLinkBottom}`}
        >
          Всі статті
        </Link>
      </div>
    </section>
  );
}

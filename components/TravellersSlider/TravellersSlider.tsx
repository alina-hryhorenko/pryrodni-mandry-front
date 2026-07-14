'use client';

import { useEffect, useState } from 'react';

import type { Swiper as SwiperInstance } from 'swiper';
import { Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';

import type { User } from '@/types/user';

import TravellerCard from '../TravellerCard/TravellerCard';
import Icon from '../ui/Icon/Icon';
import css from './TravellersSlider.module.css';

interface TravellersSliderProps {
  users: User[];
}

type SliderLayout = 'mobile' | 'tablet' | 'desktop';

const sliderConfig = {
  mobile: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    rows: 3,
    fill: 'column' as const,
  },
  tablet: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    rows: 2,
    fill: 'row' as const,
  },
  desktop: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    rows: 1,
    fill: 'row' as const,
  },
} as const;

export default function TravellersSlider({ users }: TravellersSliderProps) {
  const [layout, setLayout] = useState<SliderLayout>('mobile');
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const tabletMediaQuery = window.matchMedia('(min-width: 768px)');
    const desktopMediaQuery = window.matchMedia('(min-width: 1440px)');

    const updateLayout = () => {
      const nextLayout: SliderLayout = desktopMediaQuery.matches
        ? 'desktop'
        : tabletMediaQuery.matches
          ? 'tablet'
          : 'mobile';

      setLayout(nextLayout);
    };

    updateLayout();

    tabletMediaQuery.addEventListener('change', updateLayout);
    desktopMediaQuery.addEventListener('change', updateLayout);

    return () => {
      tabletMediaQuery.removeEventListener('change', updateLayout);
      desktopMediaQuery.removeEventListener('change', updateLayout);
    };
  }, []);

  const updateNavigationState = (instance: SwiperInstance) => {
    setIsBeginning(instance.isBeginning);
    setIsEnd(instance.isEnd);
  };

  const handleSwiperInit = (instance: SwiperInstance) => {
    setSwiper(instance);
    updateNavigationState(instance);
  };

  const config = sliderConfig[layout];

  return (
    <div className={css.sliderWrapper}>
      <Swiper
        key={layout}
        modules={[Grid]}
        className={css.swiper}
        slidesPerView={config.slidesPerView}
        slidesPerGroup={config.slidesPerGroup}
        spaceBetween={24}
        grid={{
          rows: config.rows,
          fill: config.fill,
        }}
        loop={false}
        watchOverflow
        onSwiper={handleSwiperInit}
        onSlideChange={updateNavigationState}
        onReachBeginning={updateNavigationState}
        onReachEnd={updateNavigationState}
        onFromEdge={updateNavigationState}
      >
        {users.map((user) => (
          <SwiperSlide key={user._id} className={css.slide}>
            <TravellerCard user={user} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={css.controls}>
        <button
          type="button"
          className={css.navigationButton}
          onClick={() => swiper?.slidePrev()}
          disabled={!swiper || isBeginning}
          aria-label="Показати попередню групу мандрівників"
        >
          <Icon name="icon-strelka_left" className={css.navigationButtonIcon} />
        </button>

        <button
          type="button"
          className={css.navigationButton}
          onClick={() => swiper?.slideNext()}
          disabled={!swiper || isEnd}
          aria-label="Показати наступну групу мандрівників"
        >
          <Icon
            name="icon-strelka_right"
            className={css.navigationButtonIcon}
          />
        </button>
      </div>
    </div>
  );
}

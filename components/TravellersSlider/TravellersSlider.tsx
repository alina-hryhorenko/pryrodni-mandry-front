'use client';

import type { User } from '@/types/user';
import type { Swiper as SwiperType } from 'swiper';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import TravellerCard from '../TravellerCard/TravellerCard';

import 'swiper/css';
import css from './TravellersSlider.module.css';

interface TravellersSliderProps {
  users: User[];
}

export default function TravellersSlider({ users }: TravellersSliderProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigationState = (swiperInstance: SwiperType) => {
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
  };

  return (
    <div className={css.wrapper}>
      <Swiper
        className={css.slider}
        slidesPerView={3}
        slidesPerGroup={3}
        breakpoints={{
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
        onSwiper={(swiperInstance) => {
          setSwiper(swiperInstance);
          updateNavigationState(swiperInstance);
        }}
        onSlideChange={updateNavigationState}
      >
        {users.map((user) => (
          <SwiperSlide key={user._id} className={css.slide}>
            <TravellerCard user={user} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={css.navigation}>
        <button
          className={css.navigationButton}
          type="button"
          onClick={() => swiper?.slidePrev()}
          disabled={isBeginning}
          aria-label="Попередні мандрівники"
        >
          ←
        </button>

        <button
          className={css.navigationButton}
          type="button"
          onClick={() => swiper?.slideNext()}
          disabled={isEnd}
          aria-label="Наступні мандрівники"
        >
          →
        </button>
      </div>
    </div>
  );
}

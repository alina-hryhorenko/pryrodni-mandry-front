'use client';

import { useState, useCallback } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import css from './TravellersStories.module.css';
import { Story } from '@/types/story';
import StoryCard from '@/components/StoryCard/StoryCard';

export default function TravellerStories() {
  const [stories, setStories] = useState<Story[]>([]);

  const handleNewStories = useCallback((newStories: Story[]) => {
    setStories((prev) => [...prev, ...newStories]);
  }, []);

  return (
    <div className={css.storyBlock}>
      <h2 className={css.pageTitle}>Статті</h2>

      <div className={css.storyList}>
        {stories.length > 0 &&
          stories.map((story) => <StoryCard key={story._id} story={story} />)}
      </div>

      <Pagination onData={handleNewStories} />
    </div>
  );
}

'use client'
import React, { useEffect, useState } from 'react'
import style from './RecomendedStories.module.css'
import { Story } from '@/types/story';
import { StoryCard } from '../../StoryCard/StoryCard';

interface RecomendedStoriesProps {
    category: string
}

const RecomendedStories = ({category}: RecomendedStoriesProps) => {
    const [recoStories, setRecoStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {

    }, [])

  return (
    <section className={style.RecoContainer}>
      <h3>Вам також сподобається</h3>

      <div className={style.recoList}>
        {recoStories.map((story) => (
            <StoryCard key={story._id} story={story} />
        ))}
      </div>
    </section>
  )
}

export default RecomendedStories

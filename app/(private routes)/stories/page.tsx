'use client'
import { getAllStories } from "@/services/stories";
import { Story } from "@/types/story";
import { useEffect, useState } from "react";
import style from './StoriesPage.module.css'
import { StoryCard } from "@/components/StoryCard/StoryCard";
import Loader from "@/components/ui/Loader/Loader";
import CategoryFilter, { ALL_CATEGORIES } from "@/components/StoryPage/CategoryFilter";

export default function StoryDetailsPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES);

  const getStories = async() => {
    setIsLoading(true);
    setError(null);
    try{
      const res = await getAllStories({
        page: page,
        category: activeCategory === ALL_CATEGORIES ? undefined : activeCategory
      })
      setStories(res.stories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося завантажити статті');
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    getStories();
  }, [page, activeCategory]);

  const handleSelectCategory = (category: string) => {
    setPage(1);
    setActiveCategory(category);
  }

  return (
    <section className={style.storiesSection}>
      {isLoading && <Loader />}
      <h2 className={style.pageTitle}>Статті</h2>

      <CategoryFilter activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />

      {error && <p className={style.error}>{error}</p>}

      <div className={style.storyList}>
        {stories.length > 0 &&
          stories.map((story) => <StoryCard key={story._id} story={story} />)}
      </div>
    </section>
  )
}
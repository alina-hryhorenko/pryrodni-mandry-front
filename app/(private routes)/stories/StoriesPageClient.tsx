'use client'
import { getAllStories } from "@/services/stories";
import { Story } from "@/types/story";
import { useEffect, useState } from "react";
import style from './StoriesPage.module.css'
import { StoryCard } from "@/components/StoryCard/StoryCard";
import Loader from "@/components/ui/Loader/Loader";
import CategoryFilter, { ALL_CATEGORIES } from "@/components/StoryPage/CategoryFilter";
import LoadMoreButton from "@/components/ui/LoadMoreButton/LoadMoreButton";

export default function StoriesPageClient() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getAllStories({
          page: 1,
          category: activeCategory === ALL_CATEGORIES ? undefined : activeCategory
        });
        setStories(res.stories);
        setTotalPages(res.totalPages);
        setPage(1);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не вдалося завантажити статті');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, [activeCategory]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await getAllStories({
        page: nextPage,
        category: activeCategory === ALL_CATEGORIES ? undefined : activeCategory
      });
      setStories((prev) => [...prev, ...res.stories]);
      setPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося завантажити статті');
    } finally {
      setIsLoadingMore(false);
    }
  }

  const handleSelectCategory = (category: string) => {
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

      {page < totalPages && (
        <LoadMoreButton onClick={handleLoadMore} isLoading={isLoadingMore} />
      )}
    </section>
  )
}

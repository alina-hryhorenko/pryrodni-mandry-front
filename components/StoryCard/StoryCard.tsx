'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useSavedStoriesStore } from '@/store/useSavedStoriesStore';
// import { useAuthStore } from '@/store/useAuthStore';
// import { ErrorWhileSavingModal } from '@/components/ErrorWhileSavingModal/ErrorWhileSavingModal';
import styles from './StoryCard.module.css';
import { Story } from '@/types/story';
import Icon from '../ui/Icon/Icon';

const PLACEHOLDER = '/placeholder.png';

export function StoryCard({ story }: { story: Story }) {
  const isSaved = useSavedStoriesStore((state) => state.isSaved(story._id));
  const toggleSaved = useSavedStoriesStore((state) => state.toggleSaved);
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imgSrc, setImgSrc] = useState(story.img || PLACEHOLDER);

  const storyUrl = `/stories/${story._id}`;

  async function handleSaveClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    // if (!isAuthenticated) {
    //   setIsAuthModalOpen(true);
    //   return;
    // }

    if (isSaving) return;

    setIsSaving(true);
    try {
      await toggleSaved(story._id);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Не вдалося зберегти статтю. Спробуйте ще раз.';
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <article className={styles.card}>
        <Link
          href={storyUrl}
          className={styles.imageWrapper}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={imgSrc}
            alt={story.title}
            fill
            sizes="(max-width: 768px) 335px, (max-width: 1440px) 340px, 421px"
            className={styles.image}
            onError={() => setImgSrc(PLACEHOLDER)}
          />
        </Link>

        <div className={styles.content}>
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>
              {story.author ? (
                <Link
                  href={`/users/${story.author._id}`}
                  className={styles.authorLink}
                >
                  {story.author.name}
                </Link>
              ) : (
                'Невідомий автор'
              )}
              <span className={styles.separator}>·</span>
            </span>

            <div className={styles.rating}>
              <span>{story.savedBySize}</span>

              <span className={styles.ratingbox}>
                <Icon name="icon-bookmark" className={styles.ratingIcon} />
              </span>
            </div>
          </div>

          <h3 className={styles.cardTitle}>
            <Link
              href={storyUrl}
              tabIndex={-1}
              aria-hidden="true"
              title={story.title}
            >
              {story.title}
            </Link>
          </h3>

          <div className={styles.actions}>
            <Link
              href={storyUrl}
              className={styles.viewBtn}
              aria-label={`Переглянути статтю: ${story.title}`}
            >
              Переглянути статтю
            </Link>

            <button
              type="button"
              className={`${styles.saveBtn} ${isSaved ? styles.saved : ''}`}
              onClick={handleSaveClick}
              disabled={isSaving}
              aria-label={isSaved ? 'Видалити зі збережених' : 'Зберегти'}
              aria-busy={isSaving}
            >
              {isSaving ? (
                <span className={styles.spinner} aria-hidden="true" />
              ) : (
                <Icon
                  name="icon-bookmark"
                  className={isSaved ? styles.saveIconFilled : styles.saveIcon}
                />
              )}
            </button>
          </div>
        </div>
      </article>
      {/* 
      <ErrorWhileSavingModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      /> */}
    </>
  );
}

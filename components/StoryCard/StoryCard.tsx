'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useSavedStoriesStore } from '@/store/useSavedStoriesStore';
import { useAuthStore } from '@/store/authStore';
import { Story } from '@/types/story';
import { ErrorWhileSavingModal } from '@/components/ErrorWhileSavingModal/ErrorWhileSavingModal';
import Icon from '../ui/Icon/Icon';
import styles from './StoryCard.module.css';

const PLACEHOLDER = '/placeholder.png';

export function StoryCard({
  story,
  onUnsave,
}: {
  story: Story;
  onUnsave?: (storyId: string) => void;
}) {
  const image = story.img || story.imageURL || PLACEHOLDER;
  const saves = story.savedBySize ?? story.rate ?? 0;
  const authorName = story.ownerId?.name || 'Невідомий автор';
  const authorId = story.ownerId?._id;

  const isSaved = useSavedStoriesStore((state) => state.isSaved(story._id));
  const toggleSaved = useSavedStoriesStore((state) => state.toggleSaved);
  const resetSavedStories = useSavedStoriesStore((state) => state.reset);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentUserId = useAuthStore((state) => state.user?._id);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [imgSrc, setImgSrc] = useState(image);

  const canEdit =
    isAuthenticated && !!currentUserId && currentUserId === authorId;

  const storyUrl = `/stories/${story._id}`;

  async function handleSaveClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (isSaving) return;

    const wasSaved = isSaved;

    setIsSaving(true);
    try {
      await toggleSaved(story._id);

      if (wasSaved) {
        onUnsave?.(story._id);
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        clearIsAuthenticated();
        resetSavedStories();
        setIsAuthModalOpen(true);
      } else {
        const message =
          error instanceof Error
            ? error.message
            : 'Не вдалося зберегти статтю. Спробуйте ще раз.';
        toast.error(message);
      }
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsSaving(false);
    }
  }

  function handleEditClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.stopPropagation();
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
              {authorId ? (
                <Link href={`/users/${authorId}`} className={styles.authorLink}>
                  {authorName}
                </Link>
              ) : (
                authorName
              )}
              <span className={styles.separator}>·</span>
            </span>

            <div className={styles.rating}>
              <span>{saves}</span>
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

            {canEdit ? (
              <Link
                href={`/stories/${story._id}/edit`}
                className={styles.saveBtn}
                onClick={handleEditClick}
                aria-label="Редагувати статтю"
              >
                <Icon name="icon-pensil-edit" className={styles.saveIcon} />
              </Link>
            ) : (
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
                    className={
                      isSaved ? styles.saveIconFilled : styles.saveIcon
                    }
                  />
                )}
              </button>
            )}
          </div>
        </div>
      </article>

      <ErrorWhileSavingModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}

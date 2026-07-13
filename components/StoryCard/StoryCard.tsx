'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSavedStoriesStore } from '@/store/useSavedStoriesStore';
import styles from './StoryCard.module.css';
import { Story } from '@/types/story';
import Icon from '../ui/Icon/Icon';

const placeholder = '/placeholder.png';

export default function StoryCard({ story }: { story: Story }) {
  const isSaved = useSavedStoriesStore((state) => state.isSaved(story._id));
  const toggleSaved = useSavedStoriesStore((state) => state.toggleSaved);

  const storyUrl = `/stories/${story._id}`;

  const [imgSrc, setImgSrc] = useState(
    story.img || story.imageURL || placeholder,
  );

  const savedCount = story.savedBySize ?? story.rate ?? 0;

  function handleSaveClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    toggleSaved(story._id);
  }

  return (
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
          onError={() => setImgSrc(placeholder)}
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>
            <Link
              href={`/users/${story.author._id}`}
              className={styles.authorLink}
            >
              {story.author?.name ?? 'Невідомий автор'}
            </Link>
            <span className={styles.separator}>·</span>
          </span>

          <div className={styles.rating}>
            <span>{savedCount}</span>

            <span className={styles.ratingbox}>
              <Icon name="icon-bookmark" className={styles.ratingIcon} />
            </span>
          </div>
        </div>

        <h3 className={styles.cardTitle}>
          <Link href={storyUrl} tabIndex={-1} aria-hidden="true">
            {story.title}
          </Link>
        </h3>

        <div className={styles.actions}>
          <Link href={storyUrl} className={styles.viewBtn}>
            Переглянути статтю
          </Link>

          <button
            type="button"
            className={`${styles.saveBtn} ${isSaved ? styles.saved : ''}`}
            onClick={handleSaveClick}
            aria-label={isSaved ? 'Видалити зі збережених' : 'Зберегти'}
          >
            <Icon
              name="icon-bookmark"
              className={isSaved ? styles.saveIconFilled : styles.saveIcon}
            />
          </button>
        </div>
      </div>
    </article>
  );
}

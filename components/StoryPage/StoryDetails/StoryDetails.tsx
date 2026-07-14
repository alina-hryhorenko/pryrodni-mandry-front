'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './StoryDetails.module.css';
import { StoryDetailsData } from '@/services/stories';
import SaveStory from '../SaveStory/SaveStory';

type Props = {
  story: StoryDetailsData;
};

export default function StoryDetails({ story }: Props) {
  const { title, ownerId, date, category, img, article } = story;

  const formattedDate = (() => {
    if (!date) return 'Дата невідома';

    const parsed = new Date(date);

    if (isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  })();

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {/* LEFT */}
        <div className={styles.left}>
          <Link href="/stories" className={styles.back}>
            <svg className={styles.icon} aria-hidden="true">
              <use href="/icons/sprite.svg#icon-chevron_left" />
            </svg>
            Всі статті
          </Link>

          <h1 className={styles.title}>{title || 'Без назви'}</h1>

          <div className={styles.meta}>
            <p>
              Автор статті <span>{ownerId?.name || 'Невідомий автор'}</span>
            </p>

            <p>
              Опубліковано <span>{formattedDate}</span>
            </p>
          </div>

          <p className={styles.category}>{category?.name || 'Без категорії'}</p>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <Image
              src={img || '/images/carpathians.jpg'}
              alt={`Зображення до статті ${title || ''}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 80vw, 1200px"
              className={styles.image}
              priority
            />
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.text}>{article || 'Опис відсутній'}</div>
        <SaveStory storyId={story._id} isSaved={story.isSaved ?? false} />
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import styles from './StoryDetails.module.css';
import { Story } from '@/services/stories';

type Props = {
  story: Story;
};

export default function StoryDetails({ story }: Props) {
  return (
    <section className={styles.container}>

      <div className={styles.grid}>

        {/* LEFT */}
        <div className={styles.left}>
          <Link href="/stories" className={styles.back}>
            <svg className={styles.icon}>
              <use href="/icons/sprite.svg#icon-chevron_left" />
            </svg>
            Всі статті
          </Link>

          <h1 className={styles.title}>{story.title}</h1>

          <div className={styles.meta}>
            <p>Автор статті <span>{story.author}</span></p>
            <p>Опубліковано <span>{story.date}</span></p>
          </div>

          <span className={styles.category}>{story.category}</span>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <Image
              src={story.img || '/images/carpathians.jpg'}
              alt={story.title}
              fill
              className={styles.image}
              priority
            />
          </div>
        </div>

      </div>

      {/* TEXT */}
      <div className={styles.text}>
        {story.content}
      </div>

    </section>
  );
}
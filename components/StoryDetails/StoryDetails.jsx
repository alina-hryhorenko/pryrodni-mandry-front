import Image from 'next/image';
import Link from 'next/link';
import styles from './StoryDetails.module.css';

export default function StoryDetails({ story }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/stories" className={styles.back}>
            ← Всі статті
          </Link>

          <h1 className={styles.title}>{story.title}</h1>

          <div className={styles.meta}>
            <span>Автор статті {story.author}</span>
            <span>Опубліковано {story.date}</span>
          </div>

          <span className={styles.category}>{story.category}</span>

          <p className={styles.text}>{story.description}</p>
        </div>

        <div className={styles.right}>
          <Image
            src={story.img}
            alt={story.title}
            width={600}
            height={400}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
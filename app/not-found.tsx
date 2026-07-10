import Link from 'next/link';
import styles from './error-pages.module.css';

export default function NotFound() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>

        <p className={styles.text}>
          Сторінку не знайдено або вона була переміщена.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.button}>
            На головну
          </Link>
        </div>
      </div>
    </main>
  );
}

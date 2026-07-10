'use client';

import Link from 'next/link';
import styles from './error-pages.module.css';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>Щось пішло не так</h1>

        <p className={styles.text}>
          Сталася помилка. Спробуйте ще раз або поверніться на головну сторінку.
        </p>

        <div className={styles.actions}>
          <button type="button" onClick={reset} className={styles.button}>
            Спробувати ще раз
          </button>

          <Link href="/" className={styles.link}>
            На головну
          </Link>
        </div>
      </div>
    </main>
  );
}

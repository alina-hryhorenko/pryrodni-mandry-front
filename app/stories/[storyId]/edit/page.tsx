import Link from 'next/link';
import styles from './page.module.css';

export default function EditStoryPage() {
  return (
    <main className={styles.container}>
      <span className={styles.emoji}>📝</span>

      <h1 className={styles.title}>Редактор історій ще дозріває</h1>

      <p className={styles.text}>
        Ми вже майже навчили його не ламати історії.
        <br />
        Залишилося навчити їх редагувати. 🌱
      </p>

      <Link href="/profile" className={styles.button}>
        Повернутися до профілю
      </Link>
    </main>
  );
}

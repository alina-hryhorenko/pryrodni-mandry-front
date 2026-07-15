'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './ProfileTabs.module.css';

export default function ProfileTabs() {
  const pathname = usePathname();

  const isSaved = pathname === '/profile';
  const isMine = pathname === '/profile/my-stories';

  return (
    <div className={styles.tabswrapper}>
      <div className={styles.tabs}>
        <Link
          href="/profile"
          className={`${styles.tab} ${isSaved ? styles.active : ''}`}
        >
          Збережені історії
        </Link>

        <Link
          href="/profile/my-stories"
          className={`${styles.tab} ${isMine ? styles.active : ''}`}
        >
          Мої історії
        </Link>
      </div>
    </div>
  );
}

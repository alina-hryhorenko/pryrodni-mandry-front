'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import Icon from '@/components/ui/Icon/Icon';

import styles from './UserBar.module.css';

type UserBarProps = {
  variant?: 'desktop' | 'mobile';
};

export default function UserBar({ variant = 'desktop' }: UserBarProps) {
  // TODO: замінити на реальні дані користувача з auth-store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const userName = user?.name || 'Користувач';
  const avatarLetter = userName[0]?.toUpperCase() || 'U';

  const handleLogoutClick = () => {
    // TODO: відкрити ConfirmationModal для виходу
  };

  return (
    <div className={`${styles.userBar} ${styles[variant]}`}>
      <Link href="/stories/new" className={styles.publishLink}>
        Опублікувати статтю
      </Link>

      <div className={styles.userInfo}>
        <div className={styles.avatar} aria-label="Аватар користувача">
          {avatarLetter}
        </div>

        <span className={styles.userName}>{userName}</span>

        <button
          type="button"
          className={styles.logoutButton}
          aria-label="Вийти з акаунту"
          onClick={handleLogoutClick}
        >
          <Icon name="icon-logout" className={styles.logoutIcon} />
        </button>
      </div>
    </div>
  );
}

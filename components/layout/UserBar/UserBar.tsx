'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import Icon from '@/components/ui/Icon/Icon';
import Avatar from '@/components/ui/Avatar/Avatar';

import styles from './UserBar.module.css';

type UserBarProps = {
  variant?: 'desktop' | 'mobile';
};

export default function UserBar({ variant = 'desktop' }: UserBarProps) {
  // TODO: замінити на реальні дані користувача з auth-store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const userName = user?.name || 'Користувач';

  const handleLogoutClick = () => {
    // TODO: відкрити ConfirmationModal для виходу
  };

  return (
    <div className={`${styles.userBar} ${styles[variant]}`}>
      <Link href="/stories/new" className={styles.publishLink}>
        Опублікувати статтю
      </Link>

      <div className={styles.userInfo}>
        <Avatar
          src={user?.avatarUrl}
          alt={`Аватар користувача ${userName}`}
          size={32}
        />

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

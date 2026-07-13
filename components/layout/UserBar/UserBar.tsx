'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Icon from '@/components/ui/Icon/Icon';
import ConfirmationModal from '@/components/ui/ConfirmationModal/ConfirmationModal';
import { useAuthStore } from '@/store/authStore';

import styles from './UserBar.module.css';

type UserBarProps = {
  variant?: 'desktop' | 'mobile';
};

export default function UserBar({ variant = 'desktop' }: UserBarProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAvatarPlaceholderBroken, setIsAvatarPlaceholderBroken] =
    useState(false);

  const userName = user?.username || 'Користувач';
  const avatarLetter = userName[0]?.toUpperCase() || 'U';

  const handleLogoutConfirm = async () => {
    try {
      setIsLoggingOut(true);
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
    } finally {
      clearIsAuthenticated();
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
      router.push('/');
    }
  };

  return (
    <>
      <div className={`${styles.userBar} ${styles[variant]}`}>
        <Link href="/stories/new" className={styles.publishLink}>
          Опублікувати статтю
        </Link>

        <div className={styles.userInfo}>
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt=""
              width={32}
              height={32}
              className={styles.avatarImage}
            />
          ) : isAvatarPlaceholderBroken ? (
            <div className={styles.avatar} aria-label="Аватар користувача">
              {avatarLetter}
            </div>
          ) : (
            <img
              src="/images/AvatarPlaceholder.png"
              alt=""
              width={32}
              height={32}
              className={styles.avatarImage}
              onError={() => setIsAvatarPlaceholderBroken(true)}
            />
          )}

          <span className={styles.userName}>{userName}</span>

          <button
            type="button"
            className={styles.logoutButton}
            aria-label="Вийти з акаунту"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            <Icon name="icon-logout" className={styles.logoutIcon} />
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Вийти з акаунту?"
        message="Ви впевнені, що хочете вийти зі свого облікового запису?"
        confirmLabel="Вийти"
        cancelLabel="Скасувати"
        isLoading={isLoggingOut}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { logout } from '@/services/api';
import Icon from '@/components/ui/Icon/Icon';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import styles from './UserBar.module.css';

type UserBarProps = {
  variant?: 'desktop' | 'mobile';
};

export default function UserBar({ variant = 'desktop' }: UserBarProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userName = user?.name || 'Користувач';
  const avatarLetter = userName[0]?.toUpperCase() || 'U';

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
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

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Ви впевнені, що хочете вийти?"
        confirmText="Вийти"
        cancelText="Відмінити"
      />
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { useSavedStoriesStore } from '@/store/useSavedStoriesStore';
import { logout } from '@/services/auth';
import Icon from '@/components/ui/Icon/Icon';
import Avatar from '@/components/ui/Avatar/Avatar';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';

import styles from './UserBar.module.css';

type UserBarProps = {
  variant?: 'desktop' | 'mobile';
};

export default function UserBar({ variant = 'desktop' }: UserBarProps) {
  // TODO: замінити на реальні дані користувача з auth-store
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const resetSavedStories = useSavedStoriesStore((state) => state.reset);
  const userName = user?.name || 'Користувач';

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
    } catch {
      toast.error('Не вдалося завершити сесію на сервері.');
    } finally {
      clearIsAuthenticated();
      resetSavedStories();
      router.push('/');
    }
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

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        confirmText="Вийти"
      />
    </div>
  );
}

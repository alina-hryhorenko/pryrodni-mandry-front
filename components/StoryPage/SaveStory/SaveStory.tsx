'use client';

import { useState } from 'react';
import styles from './SaveStory.module.css';
import { toast } from 'react-hot-toast';
import { useSavedStoriesStore } from '@/store/useSavedStoriesStore';
import { useAuthStore } from '@/store/authStore';

type SaveStoryProps = {
  storyId: string;
  isSaved: boolean;
  onOpenAuthModal?: () => void;
};

export default function SaveStory({
  storyId,
  isSaved: initialIsSaved,
  onOpenAuthModal,
}: SaveStoryProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const toggleSaved = useSavedStoriesStore((state) => state.toggleSaved);
  const isSavedInStore = useSavedStoriesStore((state) =>
    state.isSaved(storyId),
  );

  const [loading, setLoading] = useState(false);

  const saved = isSavedInStore !== undefined ? isSavedInStore : initialIsSaved;

  const handleClick = async () => {
    if (!isAuthenticated) {
      if (onOpenAuthModal) {
        onOpenAuthModal();
      } else {
        toast.error('Увійдіть, щоб зберігати історії');
      }
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      await toggleSaved(storyId);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Не вдалося змінити статус збереження';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.box}>
      <h3 className={styles.boxTitle}>Збережіть собі історію</h3>

      <p className={styles.boxText}>
        Вона буде доступна у вашому профілі у розділі збережене
      </p>

      <button
        onClick={handleClick}
        disabled={loading}
        className={styles.button}
      >
        {loading
          ? 'Завантаження...'
          : saved
            ? 'Видалити зі збережених'
            : 'Зберегти'}
      </button>
    </section>
  );
}

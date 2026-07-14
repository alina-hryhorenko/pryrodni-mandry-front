'use client';

import { useState } from 'react';
import styles from './SaveStory.module.css';
import { toast } from 'react-hot-toast';

import { useSavedStoriesStore } from '@/store/useSavedStoriesStore';
import { useAuthStore } from '@/store/authStore';
import { ErrorWhileSavingModal } from '@/components/ErrorWhileSavingModal/ErrorWhileSavingModal';

type SaveStoryProps = {
  storyId: string;
  onOpenErrorModal?: () => void;
};

export default function SaveStory({
  storyId,
  onOpenErrorModal,
}: SaveStoryProps) {
  const [loading, setLoading] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const isAuth = useAuthStore((state) => state.isAuthenticated);

  const isSaved = useSavedStoriesStore((state) =>
    state.isSaved(storyId)
  );

  const toggleSaved = useSavedStoriesStore(
    (state) => state.toggleSaved
  );

  const handleClick = async () => {
    if (!isAuth) {
      if (onOpenErrorModal) {
        onOpenErrorModal();
      } else {
        setIsErrorModalOpen(true);
      }
      return;
    }

    try {
      setLoading(true);
      await toggleSaved(storyId);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Не вдалося зберегти історію';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.box}>
      <h3 className={styles.boxTitle}>
        Збережіть собі історію
      </h3>

      <p className={styles.boxText}>
        Вона буде доступна у вашому профілі у розділі збережене
      </p>

      <button
        onClick={handleClick}
        disabled={loading}
        className={`${styles.button} ${
          isSaved ? styles.saved : ''
        }`}
      >
        {loading
          ? 'Завантаження...'
          : isSaved
          ? 'Видалити зі збережених'
          : 'Зберегти'}
      </button>

      {!onOpenErrorModal && (
        <ErrorWhileSavingModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
        />
      )}
    </section>
  );
}
'use client';

import { useState } from 'react';
import styles from './SaveStory.module.css';
import { toast } from 'react-hot-toast';

type SaveStoryProps = {
  storyId: string;
  isSaved: boolean;
  onOpenAuthModal?: () => void; 
};

export default function SaveStory({
  storyId,
  isSaved,
  onOpenAuthModal,
}: SaveStoryProps) {
  const [saved, setSaved] = useState<boolean>(isSaved);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
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
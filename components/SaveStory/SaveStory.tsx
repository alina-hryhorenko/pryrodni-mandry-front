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

  const isAuth =
    typeof window !== 'undefined' && !!localStorage.getItem('token');

  const handleClick = async () => {
    
    if (!isAuth) {
      onOpenAuthModal?.();
      return;
    }

    const token = localStorage.getItem('token');

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stories/${storyId}/save`,
        {
          method: saved ? 'DELETE' : 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Помилка при збереженні');
      }

      setSaved((prev) => !prev);

      toast.success(
        saved
          ? 'Історію видалено зі збережених'
          : 'Історію збережено'
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Щось пішло не так');
      }
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
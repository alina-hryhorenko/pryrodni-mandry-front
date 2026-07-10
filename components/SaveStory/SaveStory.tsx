'use client';

import { useState } from 'react';
import styles from './SaveStory.module.css';

type SaveStoryProps = {
  storyId: string;
  isSaved: boolean;
};

type ModalProps = {
  onClose: () => void;
};

function ErrorWhileSavingModal({ onClose }: ModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalBox}>
        <p>Потрібно авторизуватись</p>
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
}

export default function SaveStory({ storyId, isSaved }: SaveStoryProps) {
  const [saved, setSaved] = useState<boolean>(isSaved);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = async () => {
    const isAuth = false; 

    if (!isAuth) {
      setShowModal(true);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stories/${storyId}/save`,
        {
          method: saved ? 'DELETE' : 'POST',
        }
      );

      if (!res.ok) throw new Error();

      setSaved((prev: boolean) => !prev);
    } catch {
      alert('Помилка при збереженні');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.box}>
      <h3 className={styles.title}>Збережіть собі історію</h3>

      <p className={styles.text}>
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

      {showModal && (
        <ErrorWhileSavingModal onClose={() => setShowModal(false)} />
      )}
    </section>
  );
}
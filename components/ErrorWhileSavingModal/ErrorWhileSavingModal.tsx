'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import css from './ErrorWhileSavingModal.module.css';

interface ErrorWhileSavingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ErrorWhileSavingModal({
  isOpen,
  onClose,
}: ErrorWhileSavingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (modalRef.current) {
      modalRef.current.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={css.modal} ref={modalRef} tabIndex={-1}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Закрити модальне вікно"
        >
          <Icon name="icon-close" className={css.closeIcon} />
        </button>

        <h2 id="modal-title" className={css.title}>
          Помилка під час збереження
        </h2>

        <p className={css.description}>
          Щоб зберегти статтю, вам треба увійти. Якщо ще немає облікового запису
          зареєструйтесь.
        </p>

        <div className={css.buttonGroup}>
          <Link href="/login" className={css.loginBtn} onClick={onClose}>
            Увійти
          </Link>
          <Link href="/register" className={css.registerBtn} onClick={onClose}>
            Зареєструватись
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}

import Link from 'next/link';

import AuthBar from '../AuthBar/AuthBar';
import UserBar from '../UserBar/UserBar';
import Icon from '@/components/ui/Icon/Icon';

import styles from './MobileMenu.module.css';

type NavLink = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  isOpen: boolean;
  isAuthenticated: boolean;
  navLinks: NavLink[];
  onClose: () => void;
};

export default function MobileMenu({
  isOpen,
  isAuthenticated,
  navLinks,
  onClose,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className={styles.menu}
      role="dialog"
      aria-modal="true"
      aria-label="Мобільне меню"
    >
      <div className={styles.top}>
        <Link
          href="/"
          className={styles.logo}
          onClick={onClose}
          aria-label="Природні Мандри — на головну"
        >
          <Icon name="icon-Logo" className={styles.logoIcon} />
        </Link>

        <div className={styles.topActions}>
          {isAuthenticated ? (
            <Link
              href="/stories/new"
              className={styles.publishButtonTop}
              onClick={onClose}
            >
              <Icon name="icon-pensil-edit" className={styles.publishIcon} />
              Опублікувати статтю
            </Link>
          ) : (
            <AuthBar variant="tablet" />
          )}

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрити меню"
          >
            <Icon name="icon-close" className={styles.closeIcon} />
          </button>
        </div>
      </div>

      <nav
        className={styles.navigation}
        aria-label="Навігація в мобільному меню"
      >
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} onClick={onClose}>
            {label}
          </Link>
        ))}

        {isAuthenticated && (
          <Link href="/profile" onClick={onClose}>
            Мій профіль
          </Link>
        )}
      </nav>

      {isAuthenticated && (
        <Link
          href="/stories/new"
          className={styles.publishButtonMobile}
          onClick={onClose}
        >
          <Icon name="icon-pensil-edit" className={styles.publishIcon} />
          Опублікувати статтю
        </Link>
      )}

      <div className={styles.actions}>
        {isAuthenticated ? (
          <UserBar variant="mobile" />
        ) : (
          <AuthBar variant="mobile" />
        )}
      </div>
    </div>
  );
}

import Link from 'next/link';

import styles from './AuthBar.module.css';

type AuthBarProps = {
  variant?: 'desktop' | 'mobile';
};

export default function AuthBar({ variant = 'desktop' }: AuthBarProps) {
  return (
    <div className={`${styles.authBar} ${styles[variant]}`}>
      <Link href="/auth/login" className={styles.loginLink}>
        Вхід
      </Link>

      <Link href="/auth/register" className={styles.registerLink}>
        Реєстрація
      </Link>
    </div>
  );
}

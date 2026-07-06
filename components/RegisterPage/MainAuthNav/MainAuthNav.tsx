'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './MainAuthNav.module.css';

export default function MainAuthNav() {
  const pathname = usePathname();

  return (
    <div className={css.tab}>
      <Link
        className={`${css.tabs} ${pathname === '/auth/register' ? css.active : ''}`}
        href="/auth/register"
      >
        Реєстрація
      </Link>
      <Link
        className={`${css.tabs} ${pathname === '/auth/login' ? css.active : ''}`}
        href="/auth/login"
      >
        Вхід
      </Link>
    </div>
  );
}

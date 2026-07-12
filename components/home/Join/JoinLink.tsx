'use client';

import Link from 'next/link';

import { useAuthStore } from '@/store/authStore';
import css from './Join.module.css';

export default function JoinLink() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const link = isAuthenticated
    ? { href: '/auth/profile', label: 'Збережені статті' }
    : { href: '/auth/register', label: 'Зареєструватися' };

  return (
    <Link className={css.link} href={link.href}>
      {link.label}
    </Link>
  );
}

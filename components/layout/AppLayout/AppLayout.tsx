'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import Header from '../Header/Header';
import css from './AppLayout.module.css';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  return (
    <div className={css.appWrapper}>
      {!isAuthPage && <Header />}
      <main className={css.main}>{children}</main>
    </div>
  );
}

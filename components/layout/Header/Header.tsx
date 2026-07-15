'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import AuthBar from '../AuthBar/AuthBar';
import UserBar from '../UserBar/UserBar';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
import Icon from '@/components/ui/Icon/Icon';

import styles from './Header.module.css';

const navLinks = [
  { href: '/', label: 'Головна' },
  { href: '/stories', label: 'Статті' },
  { href: '/travellers', label: 'Еко-Мандрівники' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // TODO: замінити на реальний auth-store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const isAuthPage =
    pathname === '/auth/login' || pathname === '/auth/register';

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      {/* <div className="container"> */}
        <div className={styles.wrapper}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="Природні Мандри — на головну"
          >
            <Icon name="icon-Logo" className={styles.logoIcon} />
          </Link>

          {!isAuthPage && (
            <>
              <nav className={styles.navigation} aria-label="Основна навігація">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`${styles.navLink} ${
                      isActiveLink(href) ? styles.activeLink : ''
                    }`}
                  >
                    {label}
                  </Link>
                ))}

                {isAuthenticated && (
                  <Link
                    href="/profile"
                    className={`${styles.navLink} ${
                      isActiveLink('/profile') ? styles.activeLink : ''
                    }`}
                  >
                    Мій профіль
                  </Link>
                )}
              </nav>

              <div className={styles.desktopActions}>
                {isAuthenticated ? <UserBar /> : <AuthBar />}
              </div>

              <div className={styles.tabletActions}>
                {isAuthenticated ? (
                  <Link href="/stories/new" className={styles.tabletPublish}>
                    Опублікувати статтю
                  </Link>
                ) : (
                  <div className={styles.tabletAuth}>
                    <AuthBar />
                  </div>
                )}

                <BurgerMenu
                  isOpen={isMenuOpen}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                />
              </div>
            </>
          )}
        </div>
      {/* </div> */}

      {!isAuthPage && (
        <MobileMenu
          isOpen={isMenuOpen}
          isAuthenticated={isAuthenticated}
          navLinks={navLinks}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}

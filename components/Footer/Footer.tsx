import Link from 'next/link';

import Icon from '@/components/ui/Icon/Icon';

import SocialList from './SocialList/SocialList';
import FooterNav from './FooterNav/FooterNav';
import Copyright from './Copyright/Copyright';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="Природні Мандри — на головну"
          >
            <Icon name="icon-Logo" className={styles.logoIcon} />
          </Link>

          <SocialList />

          <FooterNav />
        </div>

        <div className={styles.divider} />

        <Copyright />
      </div>
    </footer>
  );
}
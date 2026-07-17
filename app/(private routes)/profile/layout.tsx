import { ReactNode } from 'react';

import styles from './profile.module.css';
import ProfileHeader from '@/components/ProfilePage/ProfileHeader/ProfileHeader';
import ProfileTabs from '@/components/ProfilePage/ProfileTabs/ProfileTabs';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.page}>
      <ProfileHeader />

      <section className={`container ${styles.profilePageSection}`}>
        <ProfileTabs />
        {children}
      </section>
    </main>
  );
}

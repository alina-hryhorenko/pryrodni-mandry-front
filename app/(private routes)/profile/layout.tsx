import { ReactNode } from 'react';
import { getMe } from '@/services/users';

import { TravellerInfo } from '@/components/travellers/TravellerInfo/TravellerInfo';
import ProfileTabs from '@/components/ProfilePage/ProfileTabs/ProfileTabs';

import styles from './profile.module.css';

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getMe();

  return (
    <main className={styles.page}>
      <TravellerInfo traveller={user} />

      <ProfileTabs />

      {children}
    </main>
  );
}

import type { Metadata } from 'next';
import ProfilePageClient from './ProfilePageClient';

export const metadata: Metadata = {
  title: 'Збережені історії',
  description: 'Збережені історії мандрівника на платформі Природні Мандри.',
};

export default function ProfilePage() {
  return <ProfilePageClient />
}

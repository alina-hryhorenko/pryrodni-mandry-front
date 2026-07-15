'use client';

import { useAuthStore } from '@/store/authStore';
import { TravellerInfo } from '@/components/travellers/TravellerInfo/TravellerInfo';

export default function ProfileHeader() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    
    <TravellerInfo traveller={user} />
  );
}

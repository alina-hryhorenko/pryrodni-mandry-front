'use client';

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

import { TravellerInfo } from '@/components/travellers/TravellerInfo/TravellerInfo';
import { TravellerStories } from '@/components/travellers/TravellerStories/TravellerStories';
import { getTravellerById } from '@/services/users';
import { Traveller } from '@/types/traveller';
import Loader from '@/components/ui/Loader/Loader';
import css from './travellerId.module.css'

type Props = {
  params: Promise<{
    travellerId: string;
  }>;
};

type TravellerDetails = {
  user: Traveller;
};

export default function TravellerDetailsPageClient({ params }: Props) {
  const { travellerId } = use(params);

  const [traveller, setTraveller] = useState<TravellerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTraveller = async () => {
      try {
        const data = await getTravellerById(travellerId);

        if (!data) {
          notFound();
        } else {
          setTraveller(data);
        }
      } catch (error) {
        console.error('Помилка при завантаженні мандрівника:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchTraveller();
  }, [travellerId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!traveller) {
    return null;
  }

  return (
    <main>
        <TravellerInfo traveller={traveller.user} />

        <TravellerStories userId={travellerId} />
    </main>
  );
}

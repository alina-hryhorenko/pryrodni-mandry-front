'use client';

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

import { TravellerInfo } from '@/components/travellers/TravellerInfo/TravellerInfo';
import { TravellerStories } from '@/components/travellers/TravellerStories/TravellerStories';
import { getTravellerById } from '@/services/users';
import { Traveller } from '@/types/traveller';
import { Story } from '@/types/story';
import Loader from '@/components/ui/Loader/Loader';
import css from './travellerId.module.css';

type Props = {
  params: Promise<{
    travellerId: string;
  }>;
};

type TravellerDetails = {
  user: Traveller;
  stories: Story[];
  totalPages: number;
};

export default function TravellerDetailsPageClient({ params }: Props) {
  const { travellerId } = use(params);

  const [traveller, setTraveller] = useState<TravellerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isValidId =
      typeof travellerId === 'string' && travellerId.length === 24;

    if (!isValidId) {
      notFound();
      return;
    }

    const fetchTraveller = async () => {
      try {
        const data = await getTravellerById(travellerId);

        if (!data) {
          notFound();
          return;
        }

        setTraveller(data);
      } catch (error) {
        console.error('Помилка при завантаженні мандрівника:', error);
        notFound();
        return;
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

      <TravellerStories
        initialStories={traveller.stories}
        userId={travellerId}
        totalPages={traveller.totalPages}
      />
    </main>
  );
}

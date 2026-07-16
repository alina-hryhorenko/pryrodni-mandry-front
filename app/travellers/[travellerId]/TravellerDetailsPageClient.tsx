'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { isAxiosError } from 'axios';

import { TravellerInfo } from '@/components/travellers/TravellerInfo/TravellerInfo';
import { TravellerStories } from '@/components/travellers/TravellerStories/TravellerStories';
import { getTravellerById } from '@/services/users';
import { Traveller } from '@/types/traveller';
import Loader from '@/components/ui/Loader/Loader';
import css from './travellerId.module.css';
import errorStyles from '@/app/error-pages.module.css';

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
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const isValidId =
      typeof travellerId === 'string' && travellerId.length === 24;

    if (!isValidId) {
      setIsNotFound(true);
      setIsLoading(false);
      return;
    }

    const fetchTraveller = async () => {
      try {
        const data = await getTravellerById(travellerId);

        if (!data) {
          setIsNotFound(true);
          return;
        }

        setTraveller(data);
      } catch (error) {
        if (!isAxiosError(error) || error.response?.status !== 404) {
          console.error('Помилка при завантаженні мандрівника:', error);
        }
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTraveller();
  }, [travellerId]);

  if (isLoading) {
    return <Loader />;
  }

  if (isNotFound || !traveller) {
    return (
      <main className={errorStyles.wrapper}>
        <div className={errorStyles.content}>
          <h1 className={errorStyles.title}>Такий користувач відсутній</h1>

          <div className={errorStyles.actions}>
            <Link href="/travellers" className={errorStyles.button}>
              До мандрівників
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <TravellerInfo traveller={traveller.user} />

      <TravellerStories userId={travellerId} />
    </main>
  );
}

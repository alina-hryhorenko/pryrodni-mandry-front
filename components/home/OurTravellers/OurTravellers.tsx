'use client'
import Link from 'next/link';
import css from './OurTravellers.module.css';
import TravellersSlider from '@/components/travellers/TravellersSlider/TravellersSlider';
import { useEffect, useState } from 'react';
import { getAllTravellers } from '@/services/users';
import { Traveller } from '@/types/traveller';
import Loader from '@/components/ui/Loader/Loader';

const USERS_LIMIT = 6;

export default function OurTravellers() {
  const [users, setUsers] = useState<Traveller[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTravellers = async () => {
      try {
        const data = await getAllTravellers(1, USERS_LIMIT);
        setUsers(data.users);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTravellers();
  }, []);

  if(isLoading) return <Loader />
  
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.layout}>
          <h2 className={css.title}>Наші мандрівники</h2>
          {users.length === 0 ? (
            <p>Користувачів поки немає.</p>
          ) : (
            <div className={css.slider}>
              <TravellersSlider users={users} />
            </div>
          )}
          <Link className={css.link} href="/travellers">
            Всі мандрівники
          </Link>
        </div>
      </div>
    </section>
  );
}

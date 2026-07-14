'use client';

import css from './TravellersSection.module.css';

import { useState } from 'react';
import TravellersList from '../TravellersList/TravellersList';

import { Traveller } from '@/types/traveller';

const USERS_LIMIT = 6;

interface TravellersSectionProps {
  initialUsers: Traveller[];
  totalPages: number;
}

export default function TravellersSection({
  initialUsers,
  totalPages,
}: TravellersSectionProps) {
  const [users, setUsers] = useState(initialUsers);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    try {
      setLoading(true);

      const nextPage = page + 1;

      const res = await fetch(
        `/api/users?page=${nextPage}&limit=${USERS_LIMIT}`,
      );
      const data = await res.json();

      setUsers((prev) => [...prev, ...data.users]);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TravellersList travellers={users} />

      {page < totalPages && (
        <button className={css.btn} onClick={handleLoadMore} disabled={loading}>
          {loading ? 'Завантаження...' : 'Показати ще'}
        </button>
      )}
    </>
  );
}

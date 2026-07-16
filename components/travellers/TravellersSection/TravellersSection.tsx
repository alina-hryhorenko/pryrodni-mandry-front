'use client';

import { useEffect, useState } from 'react';
import TravellersList from '../TravellersList/TravellersList';
import { Traveller } from '@/types/traveller';
import { getAllTravellers } from '@/services/users';
import Loader from '@/components/ui/Loader/Loader';
import LoadMoreButton from '@/components/ui/LoadMoreButton/LoadMoreButton';

const USERS_LIMIT = 12;

export default function TravellersSection() {
  const [users, setUsers] = useState<Traveller[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchTravellers = async () => {
      try {
        const data = await getAllTravellers(1, USERS_LIMIT);
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTravellers();
  }, []);

  const handleLoadMore = async () => {
    try {
      setIsLoadingMore(true);

      const nextPage = page + 1;

      const data = await getAllTravellers(nextPage, USERS_LIMIT);

      setUsers((prev) => [...prev, ...data.users]);
      setPage(nextPage);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TravellersList travellers={users} />

      {page < totalPages && (
        <LoadMoreButton onClick={handleLoadMore} isLoading={isLoadingMore} />
      )}
    </>
  );
}

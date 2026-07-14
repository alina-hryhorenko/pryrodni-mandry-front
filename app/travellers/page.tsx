import type { Metadata } from 'next';

import css from './TravellersPage.module.css';

import { getAllTravellers } from '@/services/users';

import TravellersSection from '@/components/travellers/TravellersSection/TravellersSection';

export const metadata: Metadata = {
  title: 'Мандрівники',
};

export default async function TravellersPage() {
  const { users, totalPages } = await getAllTravellers(1, 6);

  return (
    <main className={css.page}>
      <div className="container">
        <h2 className={css.title}>Мандрівники</h2>

        <TravellersSection initialUsers={users} totalPages={totalPages} />
      </div>
    </main>
  );
}

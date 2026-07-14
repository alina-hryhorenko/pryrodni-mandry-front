import type { Metadata } from 'next';

import css from './TravellersPage.module.css';

import TravellersSection from '@/components/travellers/TravellersSection/TravellersSection';

export const metadata: Metadata = {
  title: 'Мандрівники',
};

export default function TravellersPage() {
  return (
    <main className={css.page}>
        <h2 className={css.title}>Мандрівники</h2>

        <TravellersSection />
    </main>
  );
}
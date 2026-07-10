import css from './TravellersList.module.css';

import type { Traveller } from '@/types/traveller';

import TravellerCard from '../TravellerCard/TravellerCard';

interface TravellersListProps {
  travellers: Traveller[];
}

export default function TravellersList({ travellers }: TravellersListProps) {
  return (
    <ul className={css.list}>
      {travellers.map((traveller) => (
        <li key={traveller._id}>
          <TravellerCard traveller={traveller} />
        </li>
      ))}
    </ul>
  );
}

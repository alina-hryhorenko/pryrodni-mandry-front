import { Traveller } from '@/types/traveller';
import css from './TravellerInfo.module.css';

import Image from 'next/image';

interface TravellerInfoProps {
  traveller: Traveller;
}

export function TravellerInfo({ traveller }: TravellerInfoProps) {
  return (
    <div className={css.traveller_info_box}>
      <Image
        className={css.img}
        src={traveller.avatarUrl}
        alt={traveller.name}
        width={113}
        height={113}
      />
      <div className={css.traveller_info}>
        <h3 className={css.traveller_name}>{traveller.name}</h3>
        <p className={css.traveller_articles_amount}>
          Статей: {traveller.articlesAmount}
        </p>
      </div>
    </div>
  );
}

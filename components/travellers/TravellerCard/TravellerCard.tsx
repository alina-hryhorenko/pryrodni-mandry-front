// import { Traveller } from '@/types/traveller';
// import css from './TravellerCard.module.css';

// import Image from 'next/image';
// import Link from 'next/link';


// interface TravellerCardProps {
//   traveller: Traveller;
// }

// export default function TravellerCard({ traveller }: TravellerCardProps) {
//   return (
//     <div className={css.card}>
//       <Image
//         className={css.card_img}
//         src={traveller.avatarUrl}
//         alt={traveller.name}
//         width={130}
//         height={130}
//       />
//       <h3 className={css.card_name}>{traveller.name}</h3>
//       <p className={css.card_articles_amount}>
//         Статей: {traveller.articlesAmount}
//       </p>
//       <Link className={css.card_link} href={`/travellers/${traveller._id}`}>
//         Переглянути профіль
//       </Link>
//     </div>
//   );
// }
import Image from 'next/image';
import Link from 'next/link';

import type { Traveller } from '@/types/traveller';

import css from './TravellerCard.module.css';

interface TravellerCardProps {
  traveller: Traveller;
}

export default function TravellerCard({ traveller }: TravellerCardProps) {
  return (
    <article className={css.card}>
      <Image
        className={css.cardImage}
        src={traveller.avatarUrl}
        alt={`Аватар користувача ${traveller.name}`}
        width={130}
        height={130}
      />

      <div className={css.cardBody}>
        <div className={css.cardText}>
          <h3 className={css.name}>{traveller.name}</h3>
          <p className={css.articlesAmount}>Статей: {traveller.articlesAmount}</p>
        </div>

        <Link className={css.link} href={`/users/${traveller._id}`}>
          Переглянути профіль
        </Link>
      </div>
    </article>
  );
}
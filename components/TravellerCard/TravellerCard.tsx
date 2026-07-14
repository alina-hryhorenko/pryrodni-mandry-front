import Image from 'next/image';
import Link from 'next/link';

import type { User } from '@/types/user';

import css from './TravellerCard.module.css';

interface TravellerCardProps {
  user: User;
}

export default function TravellerCard({ user }: TravellerCardProps) {
  return (
    <article className={css.card}>
      <Image
        className={css.cardImage}
        src={user.avatarUrl}
        alt={`Аватар користувача ${user.name}`}
        width={130}
        height={130}
      />

      <div className={css.cardBody}>
        <div className={css.cardText}>
          <h3 className={css.name}>{user.name}</h3>
          <p className={css.articlesAmount}>Статей: {user.articlesAmount}</p>
        </div>

        <Link className={css.link} href={`/users/${user._id}`}>
          Переглянути профіль
        </Link>
      </div>
    </article>
  );
}

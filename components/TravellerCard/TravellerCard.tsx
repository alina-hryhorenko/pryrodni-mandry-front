import type { User } from '@/types/user';
import Image from 'next/image';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <article>
      <Image
        src={user.avatarUrl}
        alt={`Аватар користувача ${user.name}`}
        width={64}
        height={64}
      />
      <h3>{user.name}</h3>
      <p>Статей: {user.articlesAmount}</p>
      {/* link to profile */}
    </article>
  );
}

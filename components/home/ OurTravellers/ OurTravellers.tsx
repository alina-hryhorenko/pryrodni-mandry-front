import { getUsers } from '@/services/users';
import TravellersSlider from '@/components/TravellersSlider/TravellersSlider';
import Link from 'next/link';

import css from './ OurTravellers.module.css';

export default async function OurTravellers() {
  const { users } = await getUsers({
    page: 1,
    limit: 9,
  });

  return (
    <section className={css.section} aria-labelledby="travellers-title">
      <div className="container">
        <div className={css.header}>
          <h2 id="travellers-title" className={css.title}>
            Наші Мандрівники
          </h2>

          <Link href="/users" className={css.link}>
            Всі мандрівники
          </Link>
        </div>

        {users.length > 0 ? (
          <TravellersSlider users={users} />
        ) : (
          <p>Мандрівників поки немає.</p>
        )}
      </div>
    </section>
  );
}

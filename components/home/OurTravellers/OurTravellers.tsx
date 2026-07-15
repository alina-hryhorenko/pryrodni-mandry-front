import Link from 'next/link';
import TravellersSlider from '@/components/TravellersSlider/TravellersSlider';
import { api } from '@/app/api/api';
import css from './OurTravellers.module.css';

export default async function OurTravellers() {
  const { data: response } = await api.get('/api/users', {
    params: { page: 1, limit: 6 },
  });
  const users = response.users;

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.layout}>
          <h2 className={css.title}>Наші мандрівники</h2>
          {users.length === 0 ? (
            <p>Користувачів поки немає.</p>
          ) : (
            <div className={css.slider}>
              <TravellersSlider users={users} />
            </div>
          )}
          <Link className={css.link} href="/travellers">
            Всі мандрівники
          </Link>
        </div>
      </div>
    </section>
  );
}

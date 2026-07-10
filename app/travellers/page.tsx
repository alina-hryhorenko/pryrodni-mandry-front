import css from './TravellersPage.module.css';

// import { travellers } from '@/constants/travellers';
import { getAllTravellers } from '@/services/users';

import TravellersList from '@/components/travellers/TravellersList/TravellersList';

export default async function TravellersPage() {
  const { users, page, limit } = await getAllTravellers();
  console.log(users);
  return (
    <main className={css.page}>
      <div className="container">
        <h2 className={css.title}>Мандрівники</h2>
        <TravellersList travellers={users} />
        <button className={css.btn}>Показати ще</button>
      </div>
    </main>
  );
}

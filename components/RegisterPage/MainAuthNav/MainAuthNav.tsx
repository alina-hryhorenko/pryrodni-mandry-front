import Link from 'next/link';
import css from './MainAuthNav.module.css';
export default function MainAuthNav() {
  return (
    <div className={css.tab}>
      <Link className={css.tabs} href="/auth/register">
        Реєстрація
      </Link>
      <Link className={css.tabs} href="/auth/login">
        Вхід
      </Link>
    </div>
  );
}

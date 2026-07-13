import Link from 'next/link';
import css from './AuthHeader.module.css';
export default function AuthHeader() {
  return (
    <header className={css.header}>
      <Link href="/">
        <svg width="110" height="32">
          <use href="/icons/sprite.svg#icon-Logo" />
        </svg>
      </Link>
    </header>
  );
}

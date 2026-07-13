import Link from 'next/link';

import styles from './FooterNav.module.css';

const navLinks = [
  {
    href: '/',
    label: 'Головна',
  },
  {
    href: '/stories',
    label: 'Статті',
  },
  {
    href: '/travellers',
    label: 'Еко-Мандрівники',
  },
];

export default function FooterNav() {
  return (
    <nav aria-label="Навігація футера">
      <ul className={styles.list}>
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={styles.link}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

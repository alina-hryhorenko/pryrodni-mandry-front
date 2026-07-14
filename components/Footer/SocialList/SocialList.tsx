import Link from 'next/link';

import Icon from '@/components/ui/Icon/Icon';

import styles from './SocialList.module.css';

const socialLinks = [
  {
    href: 'https://www.facebook.com/',
    icon: 'icon-Facebook',
    label: 'Facebook',
  },
  {
    href: 'https://www.instagram.com/',
    icon: 'icon-Instagram',
    label: 'Instagram',
  },
  {
    href: 'https://x.com/',
    icon: 'icon-Twiter',
    label: 'X',
  },
  {
    href: 'https://www.youtube.com/',
    icon: 'icon-Youtube',
    label: 'YouTube',
  },
];

export default function SocialList() {
  return (
    <ul className={styles.list}>
      {socialLinks.map(({ href, icon, label }) => (
        <li key={label}>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={styles.link}
          >
            <Icon name={icon} className={styles.icon} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
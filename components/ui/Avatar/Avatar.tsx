import Image from 'next/image';
import Icon from '@/components/ui/Icon/Icon';

import styles from './Avatar.module.css';

type AvatarProps = {
  src?: string | null;
  alt: string;
  size?: number;
  className?: string;
};

export default function Avatar({
  src,
  alt,
  size = 32,
  className,
}: AvatarProps) {
  return (
    <div
      className={`${styles.avatar} ${className || ''}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={`${size}px`} className={styles.image} />
      ) : (
        <Icon name="icon-image" className={styles.placeholderIcon} />
      )}
    </div>
  );
}

import Icon from '@/components/ui/Icon/Icon';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Завантаження">
      <Icon name="icon-eco" className={styles.icon} />
    </div>
  );
}

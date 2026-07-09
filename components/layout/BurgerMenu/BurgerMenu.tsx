import Icon from '@/components/ui/Icon/Icon';
import styles from './BurgerMenu.module.css';

type BurgerMenuProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function BurgerMenu({ isOpen, onClick }: BurgerMenuProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <Icon name="icon-burger_menu" className={styles.icon} />
    </button>
  );
}

import css from './AuthFooter.module.css';

export default function AuthFooter() {
  return (
    <footer className={css.footer}>
      <p>
        <span className={css.mobile}>&copy; 2025 Подорожники</span>
        <span className={css.desktop}>&copy; 2025 Природні Мандри</span>
      </p>
    </footer>
  );
}

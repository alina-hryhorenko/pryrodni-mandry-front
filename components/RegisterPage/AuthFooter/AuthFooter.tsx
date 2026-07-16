import css from './AuthFooter.module.css';

export default function AuthFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <p>
        <span className={css.mobile}>&copy; {year} Подорожники</span>
        <span className={css.desktop}>&copy; {year} Природні Мандри</span>
      </p>
    </footer>
  );
}

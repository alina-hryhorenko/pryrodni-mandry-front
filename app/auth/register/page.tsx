import Link from 'next/link';
import css from './Register.module.css';

export default function RegisterPage() {
  return (
    <div className="container">
      <header className={css.header}>
        <Link href="/" className={css.logo}>
          <svg className={css.svg} width={110} height={32}>
            <use href="/icons/sprite.svg#icon-Logo"></use>
          </svg>
        </Link>
      </header>

      <main className={css.main}>
        <div className={css.container}>
          <div className={css.authBox}>
            <div className={css.tabs}>
              <Link
                href="/auth/register"
                className={`${css.tab} ${css.active}`}
              >
                Реєстрація
              </Link>

              <Link href="/auth/login" className={css.tab}>
                Вхід
              </Link>
            </div>
            <div className={css.subtitleAll}>
              <h1 className={css.title}>Реєстрація</h1>

              <p className={css.subtitle}>
                Раді вас бачити у спільноті
                <br />
                мандрівників!
              </p>
            </div>
            <form className={css.form}>
              <div className={css.inputsForm}>
                <label className={css.label}>
                  Ім’я та Прізвище*
                  <input
                    className={css.input}
                    type="text"
                    placeholder="Ваше ім'я та прізвище"
                  />
                </label>

                <label className={css.label}>
                  Пошта*
                  <input
                    className={css.input}
                    type="email"
                    placeholder="hello@podorozhnyky.ua"
                  />
                </label>

                <label className={css.label}>
                  Пароль*
                  <input
                    className={css.input}
                    type="password"
                    placeholder="********"
                  />
                </label>
              </div>
              <button className={css.button} type="submit">
                Зареєструватись
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

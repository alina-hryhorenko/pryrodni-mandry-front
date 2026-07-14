import type { Metadata } from 'next';
import css from '../register/Register.module.css';
import LoginForm from '@/components/LoginForm/LoginForm';
import MainAuthNav from '@/components/RegisterPage/MainAuthNav/MainAuthNav';
import AuthHeader from '@/components/RegisterPage/AuthHeader/AuthHeader';
import AuthFooter from '@/components/RegisterPage/AuthFooter/AuthFooter';

export const metadata: Metadata = {
  title: 'Вхід',
  description: 'Увійдіть до свого акаунту Природні Мандри.',
};

export default function LoginPage() {
  return (
    <div className={css.page}>
      <div className="container">
        <AuthHeader />

        <main className={css.main}>
          <div className={css.container}>
            <div className={css.authBox}>
              <MainAuthNav />
              <div className={css.subtitleAll}>
                <h1 className={css.title}>Вхід</h1>

                <p className={css.subtitle}>
                  Вітаємо знову у спільноту мандрівників!
                </p>
              </div>
              <LoginForm />
            </div>
          </div>
        </main>

        <AuthFooter />
      </div>
    </div>
  );
}

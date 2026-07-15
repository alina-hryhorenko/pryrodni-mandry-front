import type { Metadata } from 'next';
import css from './Register.module.css';
import AuthHeader from '@/components/RegisterPage/AuthHeader/AuthHeader';
import MainAuthNav from '@/components/RegisterPage/MainAuthNav/MainAuthNav';
import RegistrationForm from '@/components/RegisterPage/RegistrationForm/RegistrationForm';
import AuthFooter from '@/components/RegisterPage/AuthFooter/AuthFooter';

export const metadata: Metadata = {
  title: 'Реєстрація',
  description: 'Приєднуйтесь до спільноти мандрівників Природні Мандри.',
};

export default function RegisterPage() {
  return (
    <div className={css.page}>
      <div className="container">
        <AuthHeader />

        <div className={css.mainContainer}>
          <main className={css.main}>
            <div className={css.container}>
              <div className={css.authBox}>
                <MainAuthNav />
                <div className={css.subtitleAll}>
                  <h1 className={css.title}>Реєстрація</h1>

                  <p className={css.subtitle}>
                    Раді вас бачити у спільноті мандрівників!
                  </p>
                </div>
                <RegistrationForm />
              </div>
            </div>
          </main>
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}

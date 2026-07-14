'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useSavedStoriesStore } from '@/store/useSavedStoriesStore';
import { register, getSavedStoryIds } from '@/services/api';
import styles from './RegistrationForm.module.css';

const ValidationSchema = Yup.object({
  name: Yup.string()
    .max(32, 'Максимум 32 символи')
    .required("Ім'я обов'язкове"),
  email: Yup.string()
    .email('Невірний формат email')
    .max(64, 'Максимум 64 символи')
    .required('Email обовʼязковий'),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required('Пароль обовʼязковий'),
});

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setSavedIds = useSavedStoriesStore((state) => state.setSavedIds);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const user = await register(values.name, values.email, values.password);
      setUser(user);

      try {
        const savedIds = await getSavedStoryIds();
        setSavedIds(savedIds);
      } catch (syncError) {
        console.warn('Failed to sync saved stories:', syncError);
      }

      toast.success('Реєстрація успішна!');
      router.push('/');
    } catch (error) {
      let message = 'Не вдалося зареєструватись. Спробуйте ще раз.';

      if (error instanceof AxiosError) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            Ім’я та Прізвище*
            <Field
              className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`}
              name="name"
              placeholder="Ваше ім'я та прізвище"
            />
            <ErrorMessage name="name" component="p" className={styles.error} />
          </label>

          <label className={styles.label}>
            Пошта*
            <Field
              className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
              name="email"
              placeholder="hello@podorozhnyky.ua"
            />
            <ErrorMessage name="email" component="p" className={styles.error} />
          </label>

          <label className={styles.label}>
            Пароль*
            <Field
              className={`${styles.input} ${errors.password && touched.password ? styles.inputError : ''}`}
              name="password"
              type="password"
              placeholder="********"
            />
            <ErrorMessage
              name="password"
              component="p"
              className={styles.error}
            />
          </label>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Завантаження...' : 'Зареєструватись'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

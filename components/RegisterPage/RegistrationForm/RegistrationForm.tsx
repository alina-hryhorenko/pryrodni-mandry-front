'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegistrationForm.module.css';
import { useAuthStore } from '@/store/authStore';
import { register, RegisterRequest } from '@/services/auth';
import toast from 'react-hot-toast';
const Validationschema = Yup.object({
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
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (values: RegisterRequest) => {
    try {
      setLoading(true);

      const user = await register(values);

      setUser(user);
      router.push('/');
    } catch (error) {
      toast.error('Не вдалося зареєструватись. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={Validationschema}
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

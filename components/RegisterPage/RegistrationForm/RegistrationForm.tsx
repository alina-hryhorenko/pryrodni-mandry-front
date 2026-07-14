'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegistrationForm.module.css';

const Validationschema = Yup.object({
  name: Yup.string().min(2, 'Мінімум 2 символи').required("Ім'я обов'язкове"),

  email: Yup.string()
    .email('Невірний формат email')
    .required('Email обовʼязковий'),

  password: Yup.string()
    .min(6, 'Мінімум 6 символів')
    .required('Пароль обовʼязковий'),
});

export default function RegistrationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: object) => {
    setLoading(true);
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, values);
    router.push('/');
    setLoading(false);
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

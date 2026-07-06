'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegistrationForm.module.css';

const schema = Yup.object({
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
    console.log('ФОРМА ВІДПРАВЛЕНА:', values);
    setLoading(true);

    await axios.post('/api/register', values);

    router.push('/');

    setLoading(false);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label className={styles.label}>
          Ім’я та Прізвище*
          <Field
            className={styles.input}
            name="name"
            placeholder="Ваше ім'я та прізвище"
          />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </label>
        <label className={styles.label}>
          Пошта*
          <Field
            className={styles.input}
            name="email"
            placeholder="hello@podorozhnyky.ua"
          />
          <ErrorMessage name="email" component="div" className={styles.error} />
        </label>
        <label className={styles.label}>
          Пароль*
          <Field
            className={styles.input}
            name="password"
            type="password"
            placeholder="********"
          />
          <ErrorMessage
            name="password"
            component="div"
            className={styles.error}
          />
        </label>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Завантаження...' : 'Зареєструватись'}
        </button>
      </Form>
    </Formik>
  );
}

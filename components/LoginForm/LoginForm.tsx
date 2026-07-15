'use client';

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useId, useState } from 'react';
import * as Yup from 'yup';
import css from './LoginForm.module.css';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/app/api/api';
import { login } from '@/services/auth';
import { useAuthStore } from '@/store/authStore';
import { useSavedStoriesStore } from '@/store/useSavedStoriesStore';
import toast from 'react-hot-toast';

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Невірний формат email')
    .required('Email обовʼязковий'),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .required('Пароль обовʼязковий'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fieldId = useId();
  const setUser = useAuthStore((state) => state.setUser);
  const setSavedIds = useSavedStoriesStore((state) => state.setSavedIds);
  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>,
  ) => {
    try {
      setLoading(true);
      // Виконуємо запит
      const res = await login(values);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
        setUser(res);
        setSavedIds(res.savedArticles ?? []);
        actions.resetForm();
        router.push('/');
      } else {
        setError('Не вірний email або пароль');
      }
    } catch (error) {
      toast.error('Не вдалося увійти. Спробуйте ще раз.');
      setLoading(false);
      const backendError = (error as ApiError).response?.data?.error;
      const normalizedError =
        backendError === 'Request failed with status code 401'
          ? 'Неправильний email або пароль'
          : backendError;
      setError(
        normalizedError ??
          (error as ApiError).message ??
          'Неправильний email або пароль',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginFormSchema}
    >
      {/* Далі йдуть елементи форми */}
      <Form className={css.form}>
        {/* Поля */}
        <label className={css.label} htmlFor={`${fieldId}-email`}>
          Пошта*
        </label>
        <Field
          className={css.field}
          type="email"
          name="email"
          id={`${fieldId}-email`}
          placeholder="hello@podorozhnyky.ua"
        />
        <ErrorMessage name="email" component="span" className={css.error} />

        <label className={css.label} htmlFor={`${fieldId}-pass`}>
          Пароль*
        </label>
        <Field
          className={css.field}
          type="password"
          name="password"
          id={`${fieldId}-pass`}
          placeholder="********"
        />
        <ErrorMessage name="password" component="span" className={css.error} />
        <button className={css.btn} type="submit" disabled={loading}>
          {loading ? 'Завантаження...' : 'Увійти'}
        </button>
        {error && <p className={css.error}>{error}</p>}
      </Form>
    </Formik>
  );
}

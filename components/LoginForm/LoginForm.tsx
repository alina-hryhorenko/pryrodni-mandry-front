'use client';

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useId, useState } from 'react';
import * as Yup from 'yup';
import css from './LoginForm.module.css';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/app/api/api';
import { login } from '@/services/auth';
import { useAuthStore } from '@/store/authStore';

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
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
  const [error, setError] = useState<string | null>(null);
  const fieldId = useId();
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>,
  ) => {
    try {
      // Виконуємо запит
      const res = await login(values);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
        setUser(res);
        actions.resetForm();
        router.push('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error',
      );
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
        />
        <ErrorMessage name="password" component="span" className={css.error} />
        <button className={css.btn} type="submit">
          Увійти
        </button>
      </Form>
    </Formik>
  );
}

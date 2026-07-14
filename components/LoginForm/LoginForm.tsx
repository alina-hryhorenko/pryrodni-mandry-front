'use client';

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useId, useState } from 'react';
import * as Yup from 'yup';
import css from './LoginForm.module.css';
import { useRouter } from 'next/navigation';
import { login } from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { AxiosError } from 'axios';

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
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);
  const fieldId = useId();

  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>,
  ) => {
    setError(null);

    try {
      const data = await login(values.email, values.password);
      setUser(data);
      actions.resetForm();
      router.push('/');
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message ||
            err.message ||
            'Невірний email або пароль'
          : err instanceof Error
            ? err.message
            : 'Невірний email або пароль';

      setError(errorMessage);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginFormSchema}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
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
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />

          {error && <div className={css.errorGlobal}>{error}</div>}

          <button className={css.btn} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Завантаження...' : 'Увійти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

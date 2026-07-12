'use client';

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import css from './LoginForm.module.css';

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
  const handleSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>,
  ) => {
    console.log('Order data', values);
    actions.resetForm();
  };
  const fieldId = useId();
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

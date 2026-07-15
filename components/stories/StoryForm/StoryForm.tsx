'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

import { createStory } from '@/services/stories';
import { getCategories } from '@/services/categories';
import { StoryFormData } from '@/types/story';
import StoryImagePicker from '../StoryImagePicker/StoryImagePicker';
import { storyValidationSchema } from '@/constants/storyValidation';

import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/constants/stories';
import css from './StoryForm.module.css';

const initialValues: StoryFormData = {
  img: null,
  title: '',
  category: '',
  article: '',
};

export function StoryForm() {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setError] = useState<string>('');

  const queryClient = useQueryClient();

  const { data: categoriesRes } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const categories = categoriesRes?.data ?? [];

  const mutation = useMutation({
    mutationFn: createStory,
    onError(error) {
      const axiosError = error as AxiosError<{ message: string }>;

      toast.error(
        axiosError.response?.data.message ??
        'Виникла помилка під час створення історії'
      );
    },
  });

  const handleSubmit = (
    values: StoryFormData,
    actions: FormikHelpers<StoryFormData>,
  ) => {
    mutation.mutate(values, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['stories'] });
        toast.success('Історію успішно додано!');
        actions.resetForm();
        setImagePreview('');
        setError('');
      },
    });
  };

  const handleImageChange = (
    file: File | null,
    setFieldValue: (field: string, value: File | null) => void,
  ) => {
    setError('');
    setFieldValue('img', null);

    if (!file) {
      setImagePreview('');
      setFieldValue('img', null);
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_SIZE) {
      setFieldValue('img', null);
      setImagePreview('');
      setError(
        !ALLOWED_IMAGE_TYPES.includes(file.type)
          ? 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'
          : 'Max file size 1MB',
      );
      return;
    }

    setFieldValue('img', file);
    setError('');

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={storyValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, dirty, isValid, setFieldValue, resetForm }) => (
        <Form className={css.form}>
          <div className={css.formContent}>
            <div className={css.formGroup}>
              <label htmlFor="cover" className={css.formLabel}>
                Обкладинка статті
              </label>
              <StoryImagePicker
                imagePreview={imagePreview}
                handleImageChange={(file) =>
                  handleImageChange(file, setFieldValue)
                }
              />
              {error && <span className={css.error}>{error}</span>}
            </div>
            <div className={css.formGroup}>
              <label htmlFor="title" className={css.formLabel}>
                Заголовок
              </label>
              <Field
                id="title"
                name="title"
                type="text"
                placeholder="Введіть заголовок історії"
                className={`${css.formField} ${
                  touched.title && errors.title ? css.errorField : ''
                }`}
              />
              <ErrorMessage
                name="title"
                component="span"
                className={css.errorMessage}
              />
            </div>
            <div className={css.formGroup}>
              <label htmlFor="category" className={css.formLabel}>
                Категорія
              </label>
              <Field
                id="category"
                name="category"
                as="select"
                className={`${css.formField} ${
                  touched.category && errors.category ? css.errorField : ''
                }`}
              >
                <option value="" disabled>
                  Категорія
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="span"
                className={css.errorMessage}
              />
            </div>
            <div className={css.formGroup}>
              <label htmlFor="article" className={css.formLabel}>
                Текст історії
              </label>
              <Field
                id="article"
                name="article"
                as="textarea"
                placeholder="Ваша історія тут"
                rows={8}
                className={`${css.formTextarea} ${
                  touched.article && errors.article ? css.errorField : ''
                }`}
              />
              <ErrorMessage
                name="article"
                component="span"
                className={css.errorMessage}
              />
            </div>
          </div>
          <div className={css.actions}>
            <button
              type="submit"
              className={css.submitButton}
              disabled={!dirty || !isValid}
            >
              Зберегти
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => {
                resetForm();
                setImagePreview('');
                setError('');
              }}
            >
              Відмінити
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

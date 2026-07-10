'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { createStory } from '@/services/stories';
import { StoryFormData } from '@/types/story';

import css from './StoryForm.module.css';

const initialValues: StoryFormData = {
  title: '',
  category: '',
  article: '',
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title must be at least 2 characters')
    .max(40, 'Title must be no more than 40 characters')
    .required('Title is required'),
  category: Yup.string()
    .oneOf(
      ['routes', 'eco-tips', 'nature', 'culture', 'local-products'],
      'Invalid category',
    )
    .required('Category is required'),
  article: Yup.string()
    .min(12, 'Story must be at least 12 characters')
    .max(3000, 'Story must be no more than 3000 characters')
    .required('Story is required'),
});

export default function StoryForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createStory,
    onSuccess(story) {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      router.push(`/story/${story._id}`);
    },
  });

  const handleSubmit = (
    values: StoryFormData,
    // actions: FormikHelpers<StoryFormData>,
  ) => {
    mutation.mutate(values);
    // actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, dirty, isValid }) => (
        <Form className={css.form}>
          <div className={css.formContent}>
            <div className={css.formGroup}>
              <label htmlFor="cover" className={css.formLabel}>
                Обкладинка статті
              </label>
              <div className={css.formUploadWrapper}>
                {/* Upload image component */}
                <div className={css.imagePlaceholder}></div>
                <button
                  type="button"
                  className={css.uploadButton} /*onClick={}*/
                >
                  Завантажити фото
                </button>
              </div>
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
                <option value="routes">Маршрути</option>
                <option value="eco-tips">Еко-поради</option>
                <option value="nature">Природа</option>
                <option value="culture">Культура</option>
                <option value="local-products">Локальні продукти</option>
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
            <button type="reset" className={css.cancelButton}>
              Відмінити
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

'use client';

// import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import css from './StoryForm.module.css';
import { StoryFormData } from '@/types/story';

// interface StoryFormProps {
//   onCancel: () => void;
// }

const initialValues: StoryFormData = {
  title: '',
  category: '',
  content: '',
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
  content: Yup.string()
    .min(12, 'Story must be at least 12 characters')
    .max(3000, 'Story must be no more than 3000 characters')
    .required('Story is required'),
});

export default function StoryForm() {
  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: createStory,
  //   onSuccess() {
  //     queryClient.invalidateQueries({queryKey})
  //   }
  // });

  const handleSubmit = (
    // e: StoryFormData,
    // actions: FormikHelpers<StoryFormData>,
  ) => {
    // mutation.mutate(e);
    // actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formContent}>
          <div className={css.formGroup}>
            <label htmlFor="cover" className={css.formLabel}>
              Обкладинка статті
            </label>
            <div className={css.formUploadWrapper}>
              {/* Upload image component */}
              <div className={css.imagePlaceholder}>
            </div>
            <button type="button" className={css.uploadButton} /*onClick={}*/>
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
              type="text"
              name="title"
              placeholder="Введіть заголовок історії"
              className={css.formField}
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
              as="select"
              id="category"
              name="category"
              className={css.formField}
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
            <label htmlFor="content" className={css.formLabel}>
              Текст історії
            </label>
            <Field
              as="textarea"
              id="content"
              name="content"
              placeholder="Ваша історія тут"
              rows={8}
              className={css.formTextarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.errorMessage}
            />
          </div>
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton} disabled={true}>
            Зберегти
          </button>
          <button
            type="button"
            className={css.cancelButton} /*onClick={onCancel}*/
          >
            Відмінити
          </button>
        </div>
      </Form>
    </Formik>
  );
}

import * as Yup from 'yup';

export const storyValidationSchema = Yup.object().shape({
  img: Yup.mixed<File>().required('Image is required'),
  title: Yup.string()
    .min(2, 'Title must be at least 2 characters')
    .max(40, 'Title must be no more than 40 characters')
    .required('Title is required'),
  category: Yup.string().required('Category is required'),
  article: Yup.string()
    .min(12, 'Story must be at least 12 characters')
    .max(3000, 'Story must be no more than 3000 characters')
    .required('Story is required'),
});


import api from './api';
import { Category } from '@/types/category';

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get('/categories');

  return data.data;
};
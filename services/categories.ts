import api from './api';
import { Category } from '@/types/category';

interface getCategoriesResponse {
  data: Category[];
  status: number;
}

export const getCategories = async (): Promise<getCategoriesResponse> => {
  const res = await api.get<getCategoriesResponse>('/api/categories');
  return res.data;
};

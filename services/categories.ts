import api from './api';
// Categories API functions

interface getCategoriesResponse {
    data: Category[],
    status: number
}

export const getCategories = async(): Promise<getCategoriesResponse> => {
    const res = await api.get<getCategoriesResponse>('/categories');
    return res.data;
}
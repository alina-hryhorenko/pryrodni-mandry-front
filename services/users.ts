import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api' });

export const getAllTravellers = async (page = 1, limit = 12) => {
  try {
    const { data } = await api.get('/users', {
      params: { page, limit },
    });
    console.log('DATA:', data);
    return data;
  } catch (error) {
    console.log('ERROR:', error.response?.data || error.message);
  }
};

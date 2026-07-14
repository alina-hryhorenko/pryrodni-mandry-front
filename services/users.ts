import axios from 'axios';
import api from './api';

// const api = axios.create({
//   baseURL: 'https://pryrodni-mandry-back-f2hd.onrender.com/api',
// });

export const getAllTravellers = async (page = 1, limit = 12) => {
  try {
    const { data } = await api.get('/users', {
      params: { page, limit },
    });

    console.log('DATA:', data);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('ERROR:', error.response?.data || error.message);
    } else {
      console.log('ERROR:', error);
    }

    throw error;
  }
};

export const getTravellerById = async (id: string) => {
  try {
    const { data } = await api.get(`/users/${id}`);

    console.log('DATA:', data);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('ERROR:', error.response?.data || error.message);
    } else {
      console.log('ERROR:', error);
    }

    throw error;
  }
};

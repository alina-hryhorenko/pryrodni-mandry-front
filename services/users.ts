import axios from 'axios';
import backendApi from './backendApi';

export const getAllTravellers = async (page = 1, limit = 6) => {
  try {
    const { data } = await backendApi.get('/users', {
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

export const getTravellerById = async (id: string, page = 1, limit = 6) => {
  try {
    const { data } = await backendApi.get(`/users/${id}`, {
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

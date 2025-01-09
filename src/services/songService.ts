import axios from 'axios';
import { config } from '../config/config';

const API_URL = config.API_URL;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return {
    headers: { 
      Authorization: `Bearer ${user.token}`
    }
  };
};

export const getAllSongs = async () => {
  const response = await axios.get(`${API_URL}/songs`, getAuthHeader());
  return response.data;
};

export const getSongById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/songs/stream/${id}`, {
      ...getAuthHeader(),
      responseType: 'blob',
      // Add timeout and validate content type
      timeout: 30000,
      validateStatus: (status) => status === 200
    });
    
    if (response.data instanceof Blob) {
      return URL.createObjectURL(response.data);
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Streaming error details:', error.response?.data);
    } else {
      console.error('Streaming error details:', error);
    }
    throw error;
  }
};
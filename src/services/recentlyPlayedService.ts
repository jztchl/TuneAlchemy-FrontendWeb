import axios from 'axios';
import { config } from '../config/config';

const API_URL = config.API_URL;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return {
    headers: { Authorization: `Bearer ${user.token}` }
  };
};


export const getRecentlyPlayed = async () => {
  const response = await axios.get(`${API_URL}/recently-played`, getAuthHeader());
  return response.data;
};


export default {
  getRecentlyPlayed,
};

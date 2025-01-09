import axios from 'axios';
import { config } from '../config/config';

const API_URL = config.API_URL;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return {
    headers: { Authorization: `Bearer ${user.token}` }
  };
};

export const getAllArtists = async () => {
  const response = await axios.get(`${API_URL}/artists`, getAuthHeader());
  return response.data;
};

export const getArtistById = async (id: string) => {
  const response = await axios.get(`${API_URL}/artists/${id}`, getAuthHeader());
  return response.data;
};

export const getArtistSongs = async (id: string) => {
  const response = await axios.get(`${API_URL}/artists/${id}/songs`, getAuthHeader());
  return response.data;
};
import axios from 'axios';
import { config } from '../config/config';
const API_URL = config.API_URL;


const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return {
    headers: { Authorization: `Bearer ${user.token}` }
  };
};

export const getAllPlaylists = async () => {
  const response = await axios.get(`${API_URL}/playlists`, getAuthHeader());
  return response.data;
};

export const getPlaylistById = async (id: string) => {
  const response = await axios.get(`${API_URL}/playlists/${id}`, getAuthHeader());
  return response.data;
};

export const createPlaylist = async (name: string, description: string) => {
  const response = await axios.post(`${API_URL}/playlists`, { name, description }, getAuthHeader());
  return response.data;
};

export const addSongToPlaylist = async (playlistId: string, songId: string) => {
  const response = await axios.post(`${API_URL}/playlists/${playlistId}/songs`, { songId }, getAuthHeader());
  return response.data;
};
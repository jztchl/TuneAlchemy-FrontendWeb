import axios from 'axios';
import { config } from '../config/config';

const API_URL = config.API_URL;

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  return axios.post(`${API_URL}/auth/register`, {
    username,
    email,
    password,
  });
};

export const logout = () => {
  localStorage.removeItem('user');
};
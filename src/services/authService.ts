import axios from 'axios';
import { config } from '../config/config';
import { jwtDecode } from 'jwt-decode';
const API_URL = config.API_URL;


const getAuthHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};



export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('retoken', response.data.refreshToken);
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

export const refreshToken = () => {
  const refreshToken = localStorage.getItem('retoken');
  return axios.post(`${API_URL}/auth/refresh-token`, { refreshToken }).then((response) => {
    console.log('Refresh token response:', response.data);
    if (response.data.token) {
      localStorage.setItem('user', response.data.token);
    }
    return response.data;
  });
};


export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('retoken');
};

export const checkTokenValidity = async () => {
  const token = localStorage.getItem('user');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    console.log('Token expiry:', decodedToken.exp);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      await refreshToken();
    }
  }
};

export const checkRefreshTokenValidity = async () => {
  const refreshToken = localStorage.getItem('retoken');
  if (refreshToken) {
    const decodedRefreshToken: any = jwtDecode(refreshToken);
    const currentTime = Date.now() / 1000;
    console.log('Refresh token expiry:', decodedRefreshToken.exp);
    console.log('current time:', currentTime);
    if (decodedRefreshToken.exp > currentTime) {
      logout();
      throw new Error('Refresh token has expired. Please log in again.');
    }
  }
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('user');
  return token ? jwtDecode(token) : null;
};
import axios from 'axios';
import { config } from '../config/config';
import { jwtDecode } from 'jwt-decode';
const API_URL = config.API_URL;


const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return {
    headers: { Authorization: `Bearer ${user.token}` }
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

export const register = async (formData: FormData) => {
  const response = await axios.post(`${API_URL}/auth/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
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
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      await refreshToken();
    }
  } else {
    throw new Error('No token found. User is not authenticated.');
  }
};

export const checkRefreshTokenValidity = async () => {
  const refreshToken = localStorage.getItem('retoken');
  if (refreshToken) {
    const decodedRefreshToken: any = jwtDecode(refreshToken);
    const currentTime = Date.now() / 1000;
    if (decodedRefreshToken.exp < currentTime) {
      logout();
      throw new Error('Refresh token has expired. Please log in again.');
    }
  } else {
    throw new Error('No refresh token found. User is not authenticated.');
  }
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('user');
  return token ? jwtDecode(token) : null;
};

export const fetchUserProfile = async () => {
  const response = await axios.get(`${API_URL}/users/profile`,getAuthHeader());
  return response.data;
};




export const updateUserProfile = async (formData: FormData) => {
  const token = localStorage.getItem('user');
  const response = await axios.put(`${API_URL}/users/profile`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Set content type for file uploads
    },
  });
  return response.data;
};
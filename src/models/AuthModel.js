import axiosClient from '../api/axiosClient';

export const authModel = {
  login: (credentials) => axiosClient.post('/auth/login', credentials),
  getProfile: () => axiosClient.get('/auth/me'),
};
import axiosClient from '../api/axiosClient';

export const AuthModel = {
  login: (credentials) => axiosClient.post('/auth/login', credentials),
  getProfile: () => axiosClient.get('/auth/me'),
};
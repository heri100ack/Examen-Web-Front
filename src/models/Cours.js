import axiosClient from '../api/axiosClient';

export const Cours = {
  getAll: () => axiosClient.get('/courses'),
  getById: (id) => axiosClient.get(`/courses/${id}`),
  create: (data) => axiosClient.post('/courses', data),
  delete: (id) => axiosClient.delete(`/courses/${id}`),
};
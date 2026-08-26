import axiosClient from '../api/axiosClient';

export const userModel = {
  getAllStudents: () => axiosClient.get('/users/students'),
  getById: (id) => axiosClient.get(`/students/${id}`),
  create: (data) => axiosClient.post('/users/students', data),
  update: (id, data) => axiosClient.put(`/students/${id}`, data),
};
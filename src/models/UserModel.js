import axiosClient from '../api/axiosClient';

export const userModel = {
  getAllStudents: () => axiosClient.get('/users/students'),
  createStudent: (data) => axiosClient.post('/users/students', data),
  deleteStudent: (id) => axiosClient.delete(`/users/students/${id}`)
};
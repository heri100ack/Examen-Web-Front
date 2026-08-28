import axiosClient from '../api/axiosClient';

export const Examen = {
  getAllExams: () => axiosClient.get('/exams'),
  getExamById: (id) => axiosClient.get(`/exams/${id}`),
  create: (data) => axiosClient.post('/exams', data),
  addQuestion: (examId, questionData) => axiosClient.post(`/exams/${examId}/questions`, questionData),
  delete: (id) => axiosClient.delete(`/exams/${id}`),
};
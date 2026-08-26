import axiosClient from '../api/axiosClient';

export const Examen = {
  getAllExams: () => axiosClient.get('/exams'),
  getExamById: (id) => axiosClient.get(`/exams/${id}`),
  submitExamAnswers: (id, answers) => axiosClient.post(`/exams/${id}/submit`, answers)
};
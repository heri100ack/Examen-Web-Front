import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const examenApi = {
  getAllExams: () => axiosClient.get('/exams'),
  getExamById: (id) => axiosClient.get(`/exams/${id}`),
  create: (data) => axiosClient.post('/exams', data),
  addQuestion: (examId, questionData) => axiosClient.post(`/exams/${examId}/questions`, questionData),
  delete: (id) => axiosClient.delete(`/exams/${id}`),
};

export const useExamen = () => {
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await examenApi.getAllExams();
      setExams(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchExamById = async (id) => {
    setLoading(true);
    try {
      const res = await examenApi.getExamById(id);
      setCurrentExam(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createExam = async (examData) => {
    try {
      await examenApi.create(examData);
      await fetchExams();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const addQuestion = async (examId, questionData) => {
    try {
      await examenApi.addQuestion(examId, questionData);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const deleteExam = async (id) => {
    try {
      await examenApi.delete(id);
      setExams((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return { exams, currentExam, loading, fetchExamById, createExam, addQuestion, deleteExam, refetch: fetchExams };
};
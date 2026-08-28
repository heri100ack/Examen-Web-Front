import { useState, useEffect } from 'react';
import { ExamenxamModel } from '../models/Examen';

export const ExamenController = () => {
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await ExamModel.getAll();
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
      const res = await ExamenxamModel.getById(id);
      setCurrentExam(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createExam = async (examData) => {
    try {
      await ExamModel.create(examData);
      await fetchExams();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return { exams, currentExam, loading, fetchExamById, createExam, refetch: fetchExams };
};
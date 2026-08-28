import { useState, useEffect } from 'react';
import { ExamenModel } from '../models/Examen';

export const ExamenM = () => {
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await ExamenModel.getAll();
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
      const res = await ExamenModel.getById(id);
      setCurrentExam(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createExam = async (examData) => {
    try {
      await ExamenModel.create(examData);
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
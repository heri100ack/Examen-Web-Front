import { useState } from 'react';
import axiosClient from '../api/axiosClient';

export const useSubmissionService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // sousmission des reponses
  const submitExam = async (examId, answersArray) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.post(`/my/exams/${examId}/submit`, {
        answers: answersArray
      });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Erreur lors de la soumission.";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // recuperer les resultat d'un student
  const fetchMyResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get('/my/results');
      return res.data;
    } catch (err) {
      setError("Impossible de charger les résultats.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { submitExam, fetchMyResults, loading, error };
};
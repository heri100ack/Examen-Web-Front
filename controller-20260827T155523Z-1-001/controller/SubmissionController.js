import { useState } from 'react';
import { submissionModel } from '../models/submissionModel';

export const SubmissionController = () => {
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const submitExam = async (examId, answers) => {
    setSubmitting(true);
    try {
      const res = await submissionModel.submitExam(examId, answers);
      return res.data; // Renvoie le résultat/note calculé par le backend
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  const fetchMyResults = async () => {
    setLoadingResults(true);
    try {
      const res = await submissionModel.getMyResults();
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingResults(false);
    }
  };

  return { submitting, results, loadingResults, submitExam, fetchMyResults };
};
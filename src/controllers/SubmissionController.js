import { useState } from 'react';
import { SubmissionModel } from '../models/submissionModel';

export const SubmissionModel = () => {
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const submitExam = async (examId, answers) => {
    setSubmitting(true);
    try {
      const res = await SubmissionModel.submitExam(examId, answers);
      return res.data;
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
      const res = await SubmissionModel.getMyResults();
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingResults(false);
    }
  };

  return { submitting, results, loadingResults, submitExam, fetchMyResults };
};
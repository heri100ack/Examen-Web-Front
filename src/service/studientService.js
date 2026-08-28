import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const studentApi = {
  getAll: () => axiosClient.get('/students'),
  getById: (id) => axiosClient.get(`/students/${id}`),
  create: (data) => axiosClient.post('/students', data),
  update: (id, data) => axiosClient.put(`/students/${id}`, data),
};

export const useStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await studentApi.getAll();
      setStudents(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des étudiants');
    } finally {
      setLoading(false);
    }
  };

  const createStudent = async (data) => {
    try {
      await studentApi.create(data);
      await fetchStudents();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de création de l'étudiant");
      return false;
    }
  };

  const updateStudent = async (id, data) => {
    try {
      await studentApi.update(id, data);
      await fetchStudents();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de mise à jour de l'étudiant");
      return false;
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, error, createStudent, updateStudent, refetch: fetchStudents };
};
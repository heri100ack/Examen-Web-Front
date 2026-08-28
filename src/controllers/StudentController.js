import { useState, useEffect } from 'react';
import { StudentModel } from '../models/Student';

export const StudentController = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await StudentModel.getAll();
      setStudents(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des étudiants');
    } finally {
      setLoading(false);
    }
  };

  const createStudent = async (data) => {
    try {
      await StudentModel.create(data);
      await fetchStudents();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de création de l'étudiant");
      return false;
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, error, createStudent, deleteStudent, refetch: fetchStudents };
};
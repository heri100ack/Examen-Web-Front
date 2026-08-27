import { useState, useEffect } from 'react';
import { student } from '../models/student';

export const StudentController = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await student.getAll();
      setStudents(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des étudiants');
    } finally {
      setLoading(false);
    }
  };

  const createStudent = async (studentData) => {
    try {
      await studentModel.create(studentData);
      await fetchStudents();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de création de l'étudiant");
      return false;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await studentModel.delete(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de suppression");
      return false;
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, error, createStudent, deleteStudent, refetch: fetchStudents };
};
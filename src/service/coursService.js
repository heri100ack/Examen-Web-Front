import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const coursApi = {
  getAll: () => axiosClient.get('/cours'),
  getById: (id) => axiosClient.get(`/courses/${id}`),
  create: (data) => axiosClient.post('/cours', data),
  delete: (id) => axiosClient.delete(`/cours/${id}`),
};

export const useCours = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await coursApi.getAll();
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (data) => {
    try {
      await coursApi.create(data);
      await fetchCourses();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const deleteCourse = async (id) => {
    try {
      await coursApi.delete(id);
      setCourses((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, loading, createCourse, deleteCourse, refetch: fetchCourses };
};
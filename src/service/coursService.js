import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const coursApi = {
  getAll: () => axiosClient.get('/courses'),
  getById: (id) => axiosClient.get(`/courses/${id}`),
  create: (data) => axiosClient.post('/courses', data),
  delete: (id) => axiosClient.delete(`/courses/${id}`),
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

  const getCourseById = async (id) => {
    try {
      const res = await coursApi.getById(id);
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, loading, createCourse, deleteCourse, getCourseById, refetch: fetchCourses };
};
import { useState, useEffect } from 'react';
import { CoursModel } from '../models/Cours';

export const CoursModel = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await CoursModel.getAll();
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (data) => {
    try {
      await CoursModel.create(data);
      await fetchCourses();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const deleteCourse = async (id) => {
    try {
      await CoursModel.delete(id);
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

  return { courses, loading, createCourse, refetch: fetchCourses };
};
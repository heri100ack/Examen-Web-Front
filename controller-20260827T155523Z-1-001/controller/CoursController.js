import { useState, useEffect } from 'react';
import { courseModel } from '../models/CourseModel';

export const CoursController = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await courseModel.getAll();
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (data) => {
    try {
      await courseModel.create(data);
      await fetchCourses();
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
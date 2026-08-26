import { useState } from 'react';
import { AuthModel } from '../models/AuthModel';

export const useAuth = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await AuthModel.login({ email, password });
      const { token, user: userData } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants invalides');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, error, login, logout };
};
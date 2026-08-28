import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // pas connecte donc redirige vers login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // rôle n'est pas autorisé rediirection vers la page d'erreur ou d'accueil
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/erreur" replace />;
  }

  // soit afficher la page dmd
  return <Outlet />;
}
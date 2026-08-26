import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ user, onLogout }) {
  return (
    <aside className="bg-dark text-white p-3 d-flex flex-column vh-100" style={{ width: '250px' }}>
      <div className="d-flex align-items-center gap-2 mb-4 px-2">
        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold brand-font" style={{ width: '38px', height: '38px' }}>
          E
        </div>
        <h1 className="h5 mb-0 text-white brand-font">Examen</h1>
      </div>

      <nav className="nav nav-pills flex-column gap-1 flex-grow-1">
        <Link to="/" className="nav-link active text-white">Tableau de bord</Link>
        <Link to="/exams" className="nav-link text-white-50">Mes Examens</Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className="nav-link text-white-50">Administration</Link>
        )}
      </nav>

      <div className="border-top border-secondary pt-3 mt-auto">
        <div className="d-flex flex-column mb-3 px-2">
          <strong className="text-white small">{user?.nom || 'Utilisateur'}</strong>
          <span className="text-white-50 small">{user?.email}</span>
        </div>
        <button onClick={onLogout} className="btn btn-outline-light btn-sm w-100">
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
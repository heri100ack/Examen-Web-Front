import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand bg-white border-bottom px-3 mb-4">
      <div className="container-fluid p-0">
        <span className="navbar-brand brand-font fw-bold text-primary mb-0">ExamenApp</span>
        
        <div className="d-flex align-items-center gap-3 ms-auto">
          <div className="text-end">
            <div className="fw-semibold small">{user?.nom || 'Utilisateur'}</div>
            <div className="text-muted small" style={{ fontSize: '0.75rem' }}>{user?.role || 'Etudiant'}</div>
          </div>
          <button onClick={onLogout} className="btn btn-outline-danger btn-sm">
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}
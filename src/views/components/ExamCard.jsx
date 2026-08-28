import React from 'react';

export default function ExamCard({ exam, onAction }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-3">
      <div className="card h-100 shadow-sm border-0">
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="h6 card-title mb-0 fw-bold">{exam.titre}</h3>
              <span className="badge bg-warning text-dark">{exam.duree} min</span>
            </div>
            <p className="card-text text-muted small">{exam.description || 'Aucune description disponible.'}</p>
          </div>
          <button onClick={() => onAction(exam.id)} className="btn btn-primary btn-sm w-100 mt-3">
            Commencer l'épreuve
          </button>
        </div>
      </div>
    </div>
  );
}
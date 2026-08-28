import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamenModel } from '../../controllers/ExamController';

export default function PageStudient() {
  const { exams, loading } = ExamenModel();
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-4">
      <h1 className="h3 fw-bold mb-1">Examens disponibles</h1>
      <p className="text-muted small mb-4">Sélectionnez une épreuve pour commencer</p>

      {loading ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div className="row g-3">
          {exams.map((exam) => (
            <div key={exam.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold mb-0">{exam.title}</h5>
                  <span className="badge bg-warning text-dark">{exam.duration} min</span>
                </div>
                <p className="text-muted small flex-grow-1">{exam.description || 'Aucune description.'}</p>
                <button onClick={() => navigate(`/exam/${exam.id}`)} className="btn btn-primary w-100 mt-2">
                  Commencer l'épreuve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
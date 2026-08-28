import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExam } from '../../controllers/ExamController';
import { useSubmission } from '../../controllers/StudentController';

export default function PageEpreuve() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentExam, fetchExamById, loading } = useExam();
  const { submitExam, submitting } = useSubmission();
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchExamById(id);
  }, [id]);

  const handleSelect = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitExam(id, answers);
    if (result) navigate('/results');
  };

  if (loading || !currentExam) return <div className="p-4">Chargement de l'examen...</div>;

  return (
    <div className="container p-4" style={{ maxWidth: '800px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-bold mb-0">{currentExam.title}</h2>
        <span className="badge bg-secondary">{currentExam.duration} min</span>
      </div>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
        {currentExam.questions?.map((q, idx) => (
          <div key={q.id} className="card border-0 shadow-sm p-3">
            <h6 className="fw-bold mb-3">{idx + 1}. {q.text}</h6>
            <div className="d-flex flex-column gap-2">
              {q.options?.map((opt) => (
                <label key={opt.id} className="form-check-label border rounded p-2 d-flex align-items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    className="form-check-input"
                    onChange={() => handleSelect(q.id, opt.id)}
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-success btn-lg w-100" disabled={submitting}>
          {submitting ? 'Soumission...' : 'Terminer et soumettre'}
        </button>
      </form>
    </div>
  );
}
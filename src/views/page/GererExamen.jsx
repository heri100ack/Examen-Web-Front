import { useState } from 'react';
import { useExamen } from '../../services/examenService';
import { useCours } from '../../services/coursService';

export default function GererExamen() {
  const { exams, createExam } = useExamen();
  const { courses } = useCours();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(60);
  const [courseId, setCourseId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createExam({ title, duration, courseId });
    setTitle('');
  };

  return (
    <div className="container-fluid p-4">
      <h1 className="h3 fw-bold mb-4">Gestion des Examens</h1>
      <div className="card border-0 shadow-sm p-3 mb-4">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Titre de l'examen" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <input type="number" className="form-control" placeholder="Durée (min)" value={duration} onChange={(e) => setDuration(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <select className="form-select" value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
              <option value="">Sélectionner un cours</option>
              {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary">Créer Examen</button>
          </div>
        </form>
      </div>

      <div className="row g-3">
        {exams.map((ex) => (
          <div key={ex.id} className="col-md-4">
            <div className="card border-0 shadow-sm p-3">
              <h5 className="fw-bold">{ex.title}</h5>
              <p className="text-muted small">Durée: {ex.duration} min</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
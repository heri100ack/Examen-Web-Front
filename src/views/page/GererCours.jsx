import React, { useState } from 'react';
import { useCours } from '../../services/coursService';

export default function GererCours() {
  const { courses, createCourse} = useCours();
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createCourse({ title });
    setTitle('');
  };

  return (
    <div className="container-fluid p-4">
      <h1 className="h3 fw-bold mb-4">Gestion des Matières</h1>
      <form onSubmit={handleSubmit} className="d-flex gap-2 mb-4" style={{ maxWidth: '500px' }}>
        <input type="text" className="form-control" placeholder="Nom du cours (ex: Node.js)" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Créer</button>
      </form>

      <div className="list-group shadow-sm">
        {courses.map((c) => (
          <div key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span className="fw-semibold">{c.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
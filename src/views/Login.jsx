import React, { useState } from 'react';

export default function LoginPage({ onLogin, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="auth-bg d-flex align-items-center justify-content-center p-3">
      <div className="card shadow-lg border-0 p-4 w-100" style={{ maxWidth: '400px' }}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold brand-font" style={{ width: '44px', height: '44px' }}>
            E
          </div>
          <div>
            <h1 className="h4 mb-0 fw-bold">ExamenApp</h1>
            <p className="text-muted small mb-0">Portail d'évaluation</p>
          </div>
        </div>

        {error && <div className="alert alert-danger py-2 small" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label small fw-semibold text-secondary">Adresse Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="form-label small fw-semibold text-secondary">Mot de passe</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-2">Se connecter</button>
        </form>
      </div>
    </div>
  );
}
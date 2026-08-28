import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <h1 className="display-1 fw-bold text-secondary">404</h1>
      <p className="lead">Page introuvable</p>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
  );
}
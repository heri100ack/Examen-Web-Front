import { useEffect } from 'react';
import { useSubmissionService } from '../../service/submissionService';

export default function PageResultatStudent() {
  const { fetchMyResults, loading, error } = useSubmissionService();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchMyResults().then((data) => {
      if(Array.isArray(data)) {
        setResults(data);
      }
    });
  }, []);

  return (
    <div className="container-fluid p-4">
      <h1 className="h3 fw-bold mb-4">Mes Résultats</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div className="table-responsive bg-white rounded shadow-sm">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Examen</th>
                <th>Date</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">
                    Aucun résultat disponible.
                  </td>
                </tr>
              ) : (
              results.map((r) => (
                <tr key={r.id}>
                  <td className="fw-semibold">{r.examTitle}</td>
                  <td className="text-muted">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${r.score >= 10 ? 'bg-success' : 'bg-danger'}`}>
                      {r.note >= r.total >= 10 ? 'Validé' : 'Ajourné'}
                    </span>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      )}
    </div>
);
}
import React, { useEffect } from 'react';
import { submissionController } from '../../../controllers/SubmissionController';

export default function PageResultatStudent() {
  const { results, fetchMyResults, loadingResults } = useSubmission();

  useEffect(() => {
    fetchMyResults();
  }, []);

  return (
    <div className="container-fluid p-4">
      <h1 className="h3 fw-bold mb-4">Mes Résultats</h1>
      {loadingResults ? (
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
              {results.map((r) => (
                <tr key={r.id}>
                  <td className="fw-semibold">{r.examTitle}</td>
                  <td className="text-muted">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${r.score >= 10 ? 'bg-success' : 'bg-danger'}`}>
                      {r.score} / 20
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
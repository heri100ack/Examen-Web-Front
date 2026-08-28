import { useStudent } from '../../services/studentService';
import { useExamen } from '../../services/examenService';
import { useCours } from '../../services/coursService';

export default function PageAdmin() {
  const { students } = useStudent();
  const { exams } = useExamen();
  const { courses } = useCours();

  return (
    <div className="container-fluid p-4">
      <h1 className="h3 fw-bold mb-4">Tableau de bord Admin</h1>
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-primary text-white">
            <h6 className="text-white-50">Étudiants inscrits</h6>
            <h2 className="fw-bold mb-0">{students.length}</h2>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-dark text-white">
            <h6 className="text-white-50">Examens créés</h6>
            <h2 className="fw-bold mb-0">{exams.length}</h2>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-secondary text-white">
            <h6 className="text-white-50">Cours / Matières</h6>
            <h2 className="fw-bold mb-0">{courses.length}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
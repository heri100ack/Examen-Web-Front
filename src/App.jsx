import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthService } from './service/authService';
import Navbar from './views/components/Navbar';
import PrincipaleBar from './views/components/PrincipaleBar';

import Login from './views/page/Login';
import PageAdmin from './views/page/PageAdmin';
import PageStudient from './views/page/PageStudient';
import PageEpreuve from './views/page/PageEpreuve';
import PageResultataStudent from './views/page/PageResultataStudent';
import GererCours from './views/page/GererCours';
import GererExamen from './views/page/GererExamen';
import PageErreur from './views/page/PageErreur';

export default function App() {
  const { user, login, logout, error } = AuthService();

  if (!user) {
    return (
      <BrowserRouter>
        <div className="container-fluid vh-100 bg-light d-flex align-items-center justify-content-center p-0">
          <Routes>
            <Route path="/login" element={<Login onLogin={login} error={error} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="d-flex vh-100 overflow-hidden bg-light">
        <aside className="bg-dark text-white shadow-sm flex-shrink-0" style={{ width: '250px' }}>
          <PrincipaleBar user={user} onLogout={logout} />
        </aside>

        <div className="d-flex flex-column flex-grow-1 w-100 overflow-auto">
          <header className="navbar navbar-expand navbar-light bg-white border-bottom px-4 py-3 sticky-top shadow-sm">
            <Navbar user={user} onLogout={logout} />
          </header>

          <main className="container-fluid p-4 flex-grow-1">
            <Routes>
              <Route path="/login" element={<Login />} />

                {/* Espace admin protégé */}
                <Route path="/admin" element={<ProtectedRoute role="admin"><PageAdmin /></ProtectedRoute>} />
                <Route path="/admin/students" element={<ProtectedRoute role="admin"><GererStudents /></ProtectedRoute>} />
                <Route path="/admin/courses" element={<ProtectedRoute role="admin"><GererCours /></ProtectedRoute>} />
                <Route path="/admin/exams" element={<ProtectedRoute role="admin"><GererExamen /></ProtectedRoute>} />
                <Route path="/admin/exams/:id/questions" element={<ProtectedRoute role="admin"><QuestionEditor /></ProtectedRoute>} />
                <Route path="/admin/exams/:id/results" element={<ProtectedRoute role="admin"><PageResultats /></ProtectedRoute>} />

                {/* Espace étudiant protégé */}
                <Route path="/student" element={<ProtectedRoute role="student"><PageStudent /></ProtectedRoute>} />
                <Route path="/student/exams/:id" element={<ProtectedRoute role="student"><PageEpreuve /></ProtectedRoute>} />
                <Route path="/student/exams/:id/result" element={<ProtectedRoute role="student"><PageResultataStudent /></ProtectedRoute>} />
              <Route path="/student/results" element={<ProtectedRoute role="student"><PageResultataStudent /></ProtectedRoute>} />
           
            
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
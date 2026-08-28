import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthController } from './controllers/AuthController';
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
  const { user, login, logout, error } = AuthController();

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
              {user.role === 'student' && (
                <>
                  <Route path="/" element={<PageStudient />} />
                  <Route path="/epreuve/:id" element={<PageEpreuve />} />
                  <Route path="/resultats" element={<PageResultataStudent />} />
                </>
              )}

              {user.role === 'admin' && (
                <>
                  <Route path="/" element={<Navigate to="/admin" replace />} />
                  <Route path="/admin" element={<PageAdmin />} />
                  <Route path="/admin/cours" element={<GererCours />} />
                  <Route path="/admin/examens" element={<GererExamen />} />
                </>
              )}

              <Route path="*" element={<PageErreur />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
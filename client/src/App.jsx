import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import MyProjectsPage from './pages/MyProjectsPage'; // Import the new page

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/feed" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route
              path="/create-project"
              element={
                <PrivateRoute>
                  <CreateProjectPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-projects"
              element={
                <PrivateRoute>
                  <MyProjectsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
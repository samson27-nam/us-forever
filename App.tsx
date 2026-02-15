
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Register from './pages/Register';
import { HeartBackground } from './components/HeartBackground';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center font-romantic text-3xl text-rose-400">Loading our world...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen relative flex flex-col">
          <HeartBackground />
          <Navbar />
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/gallery" 
                element={
                  <ProtectedRoute>
                    <Gallery />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <footer className="py-10 text-center text-stone-400 text-xs font-medium uppercase tracking-widest relative z-10">
            &copy; {new Date().getFullYear()} Our Moments • Crafted with Love
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

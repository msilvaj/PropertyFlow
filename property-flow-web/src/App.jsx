import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import InquilinoList from './pages/InquilinoList';
import InquilinoForm from './pages/InquilinoForm';
import Payments from './pages/Payments';
import Login from './pages/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const handleUnauthorized = () => {
      localStorage.removeItem('user');
      setUser(null);
    };

    window.addEventListener('unauthorized', handleUnauthorized);
    return () => window.removeEventListener('unauthorized', handleUnauthorized);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <div className="app-layout">
        <Sidebar onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tenants" element={<InquilinoList />} />
            <Route path="/tenants/new" element={<InquilinoForm />} />
            <Route path="/tenants/edit/:id" element={<InquilinoForm />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/users" element={<div>User Settings View (Coming Soon)</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

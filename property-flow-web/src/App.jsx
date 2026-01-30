import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TenantList from './pages/TenantList';
import TenantForm from './pages/TenantForm';
import Payments from './pages/Payments';
import './App.css'; // Minimalist App.css, global styles in index.css

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tenants" element={<TenantList />} />
            <Route path="/tenants/new" element={<TenantForm />} />
            <Route path="/tenants/edit/:id" element={<TenantForm />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/users" element={<div>User Settings View (Coming Soon)</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

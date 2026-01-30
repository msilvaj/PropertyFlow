import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import InquilinoList from './pages/InquilinoList';
import InquilinoForm from './pages/InquilinoForm';
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
            <Route path="/tenants" element={<InquilinoList />} />
            <Route path="/tenants/new" element={<InquilinoForm />} />
            <Route path="/tenants/edit/:id" element={<InquilinoForm />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/users" element={<div>User Settings View (Coming Soon)</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

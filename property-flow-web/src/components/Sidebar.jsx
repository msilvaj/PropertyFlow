import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Settings, LogOut, Home } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <Home size={28} />
                <span>PropertyFlow</span>
            </div>

            <nav className="nav-links">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/tenants" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <Users size={20} />
                    <span>Tenants</span>
                </NavLink>

                <NavLink to="/payments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <CreditCard size={20} />
                    <span>Payments</span>
                </NavLink>

                <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <Settings size={20} />
                    <span>System Users</span>
                </NavLink>
            </nav>

            <div style={{ marginTop: 'auto' }}>
                <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

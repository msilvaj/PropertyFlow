import { useState, useEffect } from 'react';
import { fetchTenants } from '../services/api';
import { Home, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTenants()
            .then(data => setTenants(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const totalTenants = tenants.length;
    const paidCount = tenants.filter(t => t.pago).length;
    const debtCount = totalTenants - paidCount;

    if (loading) return <div className="loading">Loading dashboard...</div>;

    return (
        <div>
            <h1 style={{ marginBottom: '2rem', fontSize: '1.875rem' }}>Overview Dashboard</h1>

            <div className="status-grid">
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Inquilinos</p>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{totalTenants}</h2>
                        </div>
                        <div style={{ padding: '0.5rem', background: '#eff6ff', borderRadius: '0.5rem', color: '#3b82f6' }}>
                            <Home size={24} />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Paid (Current Month)</p>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>{paidCount}</h2>
                        </div>
                        <div style={{ padding: '0.5rem', background: '#f0fdf4', borderRadius: '0.5rem', color: '#10b981' }}>
                            <CheckCircle size={24} />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Pending Payments</p>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger)' }}>{debtCount}</h2>
                        </div>
                        <div style={{ padding: '0.5rem', background: '#fef2f2', borderRadius: '0.5rem', color: '#ef4444' }}>
                            <XCircle size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: '1rem' }}>Apartment Occupancy</h3>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>AP</th>
                                <th>Nome do Inquilino</th>
                                <th>Status</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenants.map(tenant => (
                                <tr key={tenant.id}>
                                    <td style={{ fontWeight: 'bold' }}>{tenant.ap}</td>
                                    <td>{tenant.nome}</td>
                                    <td>
                                        <span className={`badge ${tenant.pago ? 'badge-success' : 'badge-danger'}`}>
                                            {tenant.pago ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                    <td>{tenant.telefone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

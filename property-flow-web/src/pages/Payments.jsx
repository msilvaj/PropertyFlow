import { useState, useEffect } from 'react';
import { fetchTenants, updateInstallment } from '../services/api';
import { CreditCard, CheckCircle, XCircle, Search, MessageSquare, AlertCircle } from 'lucide-react';

const Payments = () => {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const loadData = () => {
        setLoading(true);
        fetchTenants()
            .then(data => setTenants(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleTogglePayment = (installmentId, currentStatus) => {
        updateInstallment(installmentId, { pago: !currentStatus })
            .then(() => loadData());
    };

    const handleSendReminder = (tenant, installment) => {
        const month = new Date(installment.mes).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        const message = `Olá ${tenant.nome}, tudo bem? Sou o administrador do PropertyFlow. Passando para lembrar sobre o aluguel de ${month} do AP ${tenant.ap}. Abraço!`;
        const phone = tenant.telefone.replace(/\D/g, '');
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const filteredTenants = tenants.filter(t =>
        t.nome.toLowerCase().includes(search.toLowerCase()) ||
        t.ap.includes(search)
    );

    if (loading) return <div className="loading">Loading payments...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem' }}>Monthly Payments</h1>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by AP or Name..."
                        className="card"
                        style={{ padding: '0.5rem 1rem 0.5rem 2.5rem', width: '300px' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {filteredTenants.map(tenant => (
                    <div key={tenant.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--primary)' }}>AP {tenant.ap}</span>
                                    <span>- {tenant.nome}</span>
                                </h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{tenant.telefone}</p>
                            </div>
                            <div className={`badge ${tenant.pago ? 'badge-success' : 'badge-danger'}`}>
                                {tenant.pago ? 'All Clear' : 'Has Pending'}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                            {tenant.mensalidades.map(m => (
                                <div
                                    key={m.id}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--border-color)',
                                        background: m.pago ? '#f0fdf4' : '#fff',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleTogglePayment(m.id, m.pago)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                                            {new Date(m.mes).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                                        </span>
                                        {m.pago ? <CheckCircle size={14} color="var(--success)" /> : <AlertCircle size={14} color="var(--danger)" />}
                                    </div>
                                    <span style={{ fontSize: '0.875rem', color: m.pago ? '#166534' : 'var(--text-muted)' }}>
                                        {m.pago ? 'Paid' : 'Unpaid'}
                                    </span>
                                    {!m.pago && (
                                        <button
                                            className="btn"
                                            style={{ marginTop: '0.5rem', padding: '0.25rem', justifyContent: 'center', background: '#dcfce7', color: '#166534' }}
                                            onClick={(e) => { e.stopPropagation(); handleSendReminder(tenant, m); }}
                                        >
                                            <MessageSquare size={14} />
                                            Remind
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Payments;

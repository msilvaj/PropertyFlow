import { useState, useEffect } from 'react';
import { fetchTenants, deleteTenant } from '../services/api';
import { Plus, Trash2, Edit3, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const InquilinoList = () => {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadTenants = () => {
        setLoading(true);
        fetchTenants()
            .then(data => setTenants(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadTenants();
    }, []);

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja apagar este inquilino?')) {
            deleteTenant(id).then(() => loadTenants());
        }
    };

    if (loading) return <div className="loading">Carregando inquilinos...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem' }}>Gerenciar Inquilinos</h1>
                <Link to="/tenants/new" className="btn btn-primary">
                    <UserPlus size={18} />
                    Novo Inquilino
                </Link>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>AP</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Phone</th>
                            <th>Data Início</th>
                            <th>Vencimento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants.map(tenant => (
                            <tr key={tenant.id}>
                                <td style={{ minWidth: '150px' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                                        {tenant.properties && tenant.properties.length > 0 ? (
                                            tenant.properties.map(prop => (
                                                <div
                                                    key={prop.id}
                                                    style={{
                                                        fontSize: '0.75rem',
                                                        padding: '2px 6px',
                                                        borderRadius: '4px',
                                                        background: 'var(--primary-light, #e0f2fe)',
                                                        color: 'var(--primary)',
                                                        border: '1px solid var(--primary)',
                                                        display: 'flex',
                                                        flexDirection: 'column'
                                                    }}
                                                >
                                                    <span style={{ fontWeight: 'bold' }}>{prop.identifier}</span>
                                                    {prop.condominium && (
                                                        <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                                                            {prop.condominium.name}
                                                        </span>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem italic' }}>Sem imóvel</span>
                                        )}
                                    </div>
                                </td>
                                <td style={{ fontWeight: '500' }}>{tenant.nome}</td>
                                <td style={{ color: 'var(--text-muted)' }}>{tenant.cpf}</td>
                                <td>{tenant.telefone}</td>
                                <td>{new Date(tenant.dataInicio).toLocaleDateString()}</td>
                                <td>{tenant.dataVencimento ? new Date(tenant.dataVencimento).toLocaleDateString() : 'N/A'}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Link to={`/tenants/edit/${tenant.id}`} className="btn" style={{ padding: '0.25rem', color: 'var(--text-muted)' }}>
                                            <Edit3 size={16} />
                                        </Link>
                                        <button
                                            className="btn"
                                            style={{ padding: '0.25rem', color: 'var(--danger)' }}
                                            onClick={() => handleDelete(tenant.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InquilinoList;

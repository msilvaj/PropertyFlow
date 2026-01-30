import { useState, useEffect } from 'react';
import { createTenant, updateTenant, fetchTenant } from '../services/api';
import { Save, ArrowLeft, User, Phone, MapPin, Calendar, CreditCard } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const TenantForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        rg: '',
        telefone: '',
        ap: '',
        codigoEletrobras: '',
        dataInicio: '',
        dataFim: '',
        dataVencimento: '',
        pago: false
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetchTenant(id)
                .then(data => setFormData(data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const apiCall = id ? updateTenant(id, formData) : createTenant(formData);

        apiCall
            .then(() => navigate('/tenants'))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (loading && id) return <div className="loading">Loading tenant details...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/tenants')}
                className="btn"
                style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                <ArrowLeft size={18} />
                Back to List
            </button>

            <div className="card">
                <h2 style={{ marginBottom: '2rem' }}>{id ? 'Edit Tenant' : 'Add New Tenant'}</h2>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                name="nome"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                                placeholder="John Doe"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>CPF</label>
                        <input
                            type="text"
                            name="cpf"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                            placeholder="000.000.000-00"
                            value={formData.cpf}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>RG</label>
                        <input
                            type="text"
                            name="rg"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                            value={formData.rg}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Apartment (AP)</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                name="ap"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                                placeholder="101"
                                value={formData.ap}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Phone</label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                name="telefone"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                                placeholder="(00) 00000-0000"
                                value={formData.telefone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Start Date</label>
                        <div style={{ position: 'relative' }}>
                            <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                            <input
                                type="date"
                                name="dataInicio"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                                value={formData.dataInicio}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Payment Day</label>
                        <div style={{ position: 'relative' }}>
                            <CreditCard size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                            <input
                                type="date"
                                name="dataVencimento"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                                value={formData.dataVencimento}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Eletrobras Code</label>
                        <input
                            type="text"
                            name="codigoEletrobras"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                            value={formData.codigoEletrobras}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', justifyContent: 'center' }} disabled={loading}>
                            <Save size={20} />
                            {loading ? 'Saving...' : 'Save Tenant'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TenantForm;

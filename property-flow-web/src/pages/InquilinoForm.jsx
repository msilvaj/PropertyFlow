import { useState, useEffect } from 'react';
import { createTenant, updateTenant, fetchTenant } from '../services/api';
import { Save, ArrowLeft, User, Phone, MapPin, Calendar, CreditCard } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const InquilinoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [properties, setProperties] = useState([]);
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        rg: '',
        telefone: '',
        codigoEletrobras: '',
        dataInicio: '',
        dataFim: '',
        dataVencimento: '',
        pago: false,
        property_ids: []
    });

    useEffect(() => {
        fetchProperties().then(data => setProperties(data));
        if (id) {
            setLoading(true);
            fetchTenant(id)
                .then(data => {
                    setFormData({
                        ...data,
                        property_ids: data.properties ? data.properties.map(p => p.id) : []
                    });
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Ensure we only send necessary data and property_ids
        const submissionData = { ...formData };
        delete submissionData.properties; // Remove the expanded properties array

        const apiCall = id ? updateTenant(id, submissionData) : createTenant(submissionData);

        apiCall
            .then(() => navigate('/tenants'))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    };

    const handlePropertyToggle = (propertyId) => {
        setFormData(prev => {
            const currentIds = prev.property_ids || [];
            if (currentIds.includes(propertyId)) {
                return { ...prev, property_ids: currentIds.filter(id => id !== propertyId) };
            } else {
                return { ...prev, property_ids: [...currentIds, propertyId] };
            }
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (loading && id) return <div className="loading">Carregando detalhes do inquilino...</div>;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/tenants')}
                className="btn"
                style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                <ArrowLeft size={18} />
                Voltar para Lista
            </button>

            <div className="card">
                <h2 style={{ marginBottom: '2rem' }}>{id ? 'Editar Inquilino' : 'Adicionar Novo Inquilino'}</h2>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Nome Completo</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                name="nome"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                                placeholder="John Doe"
                                value={formData.nome || ''}
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
                            value={formData.cpf || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>RG</label>
                        <input
                            type="text"
                            name="rg"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                            value={formData.rg || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Imóveis Alugados</label>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '0.75rem',
                            padding: '1rem',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.5rem',
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }}>
                            {properties.map(prop => {
                                const isAssignedToOther = prop.inquilino_id && prop.inquilino_id !== parseInt(id);
                                const isSelected = (formData.property_ids || []).includes(prop.id);

                                return (
                                    <div
                                        key={prop.id}
                                        onClick={() => !isAssignedToOther && handlePropertyToggle(prop.id)}
                                        style={{
                                            padding: '0.5rem',
                                            borderRadius: '0.375rem',
                                            border: `2px solid ${isSelected ? 'var(--primary)' : 'transparent'}`,
                                            background: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                                            cursor: isAssignedToOther ? 'not-allowed' : 'pointer',
                                            opacity: isAssignedToOther ? 0.5 : 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            boxShadow: 'var(--shadow-sm)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{prop.identifier}</span>
                                            {isSelected && <CreditCard size={14} style={{ color: 'var(--primary)' }} />}
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            {prop.condominium ? prop.condominium.name : 'Sem Condomínio'}
                                        </span>
                                        {isAssignedToOther && (
                                            <span style={{ fontSize: '0.65rem', color: 'var(--danger)', marginTop: '0.25rem' }}>Ocupado</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Telefone</label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                name="telefone"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                                placeholder="(00) 00000-0000"
                                value={formData.telefone || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Data de Início</label>
                        <div style={{ position: 'relative' }}>
                            <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                            <input
                                type="date"
                                name="dataInicio"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                                value={formData.dataInicio ? formData.dataInicio.substring(0, 10) : ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Próximo Vencimento</label>
                        <div style={{ position: 'relative' }}>
                            <CreditCard size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                            <input
                                type="date"
                                name="dataVencimento"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                                value={formData.dataVencimento ? formData.dataVencimento.substring(0, 10) : ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Código Eletrobras</label>
                        <input
                            type="text"
                            name="codigoEletrobras"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                            value={formData.codigoEletrobras || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', justifyContent: 'center' }} disabled={loading}>
                            <Save size={20} />
                            {loading ? 'Salvando...' : 'Salvar Inquilino'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InquilinoForm;

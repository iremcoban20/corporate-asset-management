'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/employees');
                if (!res.ok) throw new Error('Failed to fetch data');
                const data = await res.json();
                setEmployees(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter(emp =>
        emp.first_name.toLowerCase().includes(search.toLowerCase()) ||
        emp.last_name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div style={{ padding: '2rem' }}>Yükleniyor...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>Hata: {error}</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>Çalışan Listesi</h1>
                    <p>Şirket personeli ve departman bilgileri.</p>
                </div>
                <Link href="/employees/new" className="btn btn-primary">
                    + Yeni Çalışan Ekle
                </Link>
            </div>

            <div className="card">
                <div style={{ marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="Ara (İsim, E-posta)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            backgroundColor: 'var(--bg-main)'
                        }}
                    />
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>ID</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Ad Soyad</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>E-posta</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Departman</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Katılım Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map(emp => (
                                <tr key={emp.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem' }}>#{emp.id}</td>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{emp.first_name} {emp.last_name}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{emp.email}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            backgroundColor: '#e0e7ff',
                                            color: '#4338ca',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '99px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600'
                                        }}>
                                            {emp.department_name}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {new Date(emp.hire_date).toLocaleDateString('tr-TR')}
                                    </td>
                                </tr>
                            ))}
                            {filteredEmployees.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        Kayıt bulunamadı.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

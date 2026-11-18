'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AssignAssetPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [asset, setAsset] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        employee_id: '',
        notes: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [assetRes, employeesRes] = await Promise.all([
                    fetch(`http://localhost:3000/api/assets/${id}`),
                    fetch('http://localhost:3000/api/employees')
                ]);

                if (!assetRes.ok) throw new Error('Failed to fetch asset');
                if (!employeesRes.ok) throw new Error('Failed to fetch employees');

                const assetData = await assetRes.json();
                const employeesData = await employeesRes.json();

                setAsset(assetData);
                setEmployees(employeesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('http://localhost:3000/api/assignments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    asset_id: id,
                    ...formData
                })
            });

            if (!res.ok) throw new Error('Failed to assign asset');

            router.push('/assets');
            router.refresh(); // Refresh to show updated status
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Yükleniyor...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>Hata: {error}</div>;
    if (!asset) return <div style={{ padding: '2rem' }}>Varlık bulunamadı.</div>;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '1rem' }}>Varlık Zimmetle</h1>

            {/* Asset Summary Card */}
            <div className="card" style={{ marginBottom: '2rem', backgroundColor: '#f8fafc' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Varlık Bilgileri</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                    <div>
                        <span style={{ color: 'var(--text-muted)' }}>Seri No:</span>
                        <div style={{ fontWeight: '600' }}>{asset.serial_number}</div>
                    </div>
                    <div>
                        <span style={{ color: 'var(--text-muted)' }}>Marka/Model:</span>
                        <div style={{ fontWeight: '600' }}>{asset.brand} {asset.model}</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Çalışan Seç</label>
                        <select
                            required
                            value={formData.employee_id}
                            onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                        >
                            <option value="">Bir çalışan seçiniz...</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.first_name} {emp.last_name} ({emp.department_name})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Zimmet Notları</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            rows="3"
                            placeholder="(Opsiyonel) Durum hakkında notlar..."
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ flex: 1 }}
                        >
                            Kaydet ve Zimmetle
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="btn"
                            style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)' }}
                        >
                            İptal
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Modal from '../../components/Modal';

export default function AssetsPage() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const router = useRouter();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAssetId, setSelectedAssetId] = useState(null);

    const openReturnModal = (assetId) => {
        setSelectedAssetId(assetId);
        setModalOpen(true);
    };

    const confirmReturn = async () => {
        if (!selectedAssetId) return;

        try {
            const res = await fetch('http://localhost:3000/api/assignments/return', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ asset_id: selectedAssetId })
            });

            if (!res.ok) throw new Error('Failed to return asset');

            // Refresh list locally to reflect changes immediately
            const updatedAssets = assets.map(a => {
                if (a.id === selectedAssetId) {
                    return { ...a, status: 'AVAILABLE', assigned_to: null };
                }
                return a;
            });
            setAssets(updatedAssets);
            setModalOpen(false);
        } catch (err) {
            alert(err.message);
            setModalOpen(false);
        }
    };

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/assets');
                if (!res.ok) throw new Error('Failed to fetch data');
                const data = await res.json();
                setAssets(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
    }, []);

    const filteredAssets = assets.filter(asset =>
        asset.serial_number.toLowerCase().includes(search.toLowerCase()) ||
        asset.model.toLowerCase().includes(search.toLowerCase()) ||
        asset.brand.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'AVAILABLE': return '#10b981'; // Green
            case 'ASSIGNED': return '#3b82f6';  // Blue
            case 'MAINTENANCE': return '#f59e0b'; // Amber
            case 'RETIRED': return '#ef4444';   // Red
            default: return '#6b7280';
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Yükleniyor...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>Hata: {error}</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>Varlık Listesi</h1>
                    <p>Tüm şirket envanterini buradan yönetebilirsiniz.</p>
                </div>
                <Link href="/assets/new" className="btn btn-primary">
                    + Yeni Varlık Ekle
                </Link>
            </div>

            <div className="card">
                <div style={{ marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="Ara (Seri No, Marka, Model)..."
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
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Seri No</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Kategori</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Marka / Model</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Zimmetli Kişi</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Durum</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-muted)' }}>Aksiyon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAssets.map(asset => (
                                <tr key={asset.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem' }}>#{asset.id}</td>
                                    <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{asset.serial_number}</td>
                                    <td style={{ padding: '1rem' }}>{asset.category_name}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '500' }}>{asset.brand}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{asset.model}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {asset.assigned_to ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e0e7ff', color: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                    {asset.assigned_to.charAt(0)}
                                                </div>
                                                <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{asset.assigned_to}</span>
                                            </div>
                                        ) : (
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>-</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            backgroundColor: getStatusColor(asset.status) + '20',
                                            color: getStatusColor(asset.status),
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '99px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600'
                                        }}>
                                            {asset.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                        {asset.status === 'AVAILABLE' && (
                                            <Link
                                                href={`/assets/${asset.id}/assign`}
                                                className="btn"
                                                style={{
                                                    backgroundColor: '#ecfdf5',
                                                    color: '#059669',
                                                    padding: '0.25rem 0.75rem',
                                                    fontSize: '0.85rem',
                                                    border: '1px solid #d1fae5',
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                Zimmetle
                                            </Link>
                                        )}
                                        {asset.status === 'ASSIGNED' && (
                                            <button
                                                onClick={() => openReturnModal(asset.id)}
                                                className="btn"
                                                style={{
                                                    backgroundColor: '#fff1f2',
                                                    color: '#be123c',
                                                    padding: '0.25rem 0.75rem',
                                                    fontSize: '0.85rem',
                                                    border: '1px solid #fecdd3'
                                                }}
                                            >
                                                İade Al
                                            </button>
                                        )}
                                        <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '500' }}>
                                            Düzenle
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredAssets.length === 0 && (
                                <tr>
                                    <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        Kayıt bulunamadı.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmReturn}
                title="Varlık İadesi"
                message="Bu varlığı zimmetten düşüp, tekrar 'Mevcut' (Available) durumuna getirmek istediğinize emin misiniz?"
            />
        </div>
    );
}

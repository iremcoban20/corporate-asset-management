'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
    const [systemStatus, setSystemStatus] = useState('Checking...');
    const [dbStatus, setDbStatus] = useState('Checking...');

    // Simulating checking connectivity
    useEffect(() => {
        const checkHealth = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/status');
                if (res.ok) {
                    setSystemStatus('Aktif (Online)');
                    setDbStatus('Bağlı (Connected)');
                } else {
                    setSystemStatus('Hata (Error)');
                    setDbStatus('Bağlantı Yok');
                }
            } catch (err) {
                setSystemStatus('Ulaşılamıyor');
                setDbStatus('Bilinmiyor');
            }
        };
        checkHealth();
    }, []);

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Ayarlar</h1>

            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

                {/* System Status Card */}
                <div className="card">
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        📡 Sistem Durumu
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Backend Servisi:</span>
                            <span style={{ fontWeight: '600', color: '#10b981' }}>{systemStatus}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Veritabanı:</span>
                            <span style={{ fontWeight: '600', color: '#10b981' }}>{dbStatus}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>API Sürümü:</span>
                            <span style={{ fontWeight: '600' }}>v1.0.0</span>
                        </div>
                    </div>
                </div>

                {/* Application Info Card */}
                <div className="card">
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        ℹ️ Uygulama Bilgileri
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Uygulama Adı:</span>
                            <span style={{ fontWeight: '600' }}>Asset Manager</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Versiyon:</span>
                            <span style={{ fontWeight: '600' }}>1.0.0 (Beta)</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Lisans:</span>
                            <span style={{ fontWeight: '600' }}>Kurumsal</span>
                        </div>
                    </div>
                </div>

                {/* General Settings (Mock) */}
                <div className="card" style={{ gridColumn: '1 / -1' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                        ⚙️ Genel Yapılandırma
                    </h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Şirket Adı</label>
                                <input
                                    type="text"
                                    defaultValue="My Company Ltd."
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Varsayılan Dil</label>
                                <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    <option>Türkçe</option>
                                    <option>English</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-primary" onClick={() => alert('Ayarlar kaydedildi (Demo)')}>
                                Değişiklikleri Kaydet
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

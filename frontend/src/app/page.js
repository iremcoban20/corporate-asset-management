export default function Home() {
  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Dashboard</h1>
        <p>Hoşgeldiniz! Şirket varlıklarının genel durumunu buradan izleyebilirsiniz.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {/* Card 1 */}
        <div className="card">
          <h3 className="card-title">Toplam Varlık</h3>
          <div className="card-value">124</div>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>+4 bu ay eklendi</p>
        </div>

        {/* Card 2 */}
        <div className="card">
          <h3 className="card-title">Zimmetli Varlıklar</h3>
          <div className="card-value">86</div>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>%70 kullanım oranı</p>
        </div>

        {/* Card 3 */}
        <div className="card">
          <h3 className="card-title">Toplam Çalışan</h3>
          <div className="card-value">42</div>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Aktif personel</p>
        </div>

        {/* Card 4 */}
        <div className="card">
          <h3 className="card-title">Bakımdaki Cihazlar</h3>
          <div className="card-value" style={{ color: '#ef4444' }}>3</div>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Serviste bekleyen</p>
        </div>
      </div>
    </div>
  );
}

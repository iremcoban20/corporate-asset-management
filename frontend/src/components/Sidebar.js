import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>AM</div>
                <span>Asset Manager</span>
            </div>

            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link href="/" className={styles.link}>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/assets" className={styles.link}>
                            <span>Varlıklar</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/employees" className={styles.link}>
                            <span>Çalışanlar</span>
                        </Link>
                    </li>
                    <li style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <Link href="/settings" className={styles.link}>
                            <span>⚙️ Ayarlar</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className={styles.footer}>
                <p>© 2025 Company</p>
            </div>
        </aside>
    );
}

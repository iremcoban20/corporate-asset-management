import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>{title}</h3>
                    <button onClick={onClose} className={styles.closeBtn}>&times;</button>
                </div>
                <div className={styles.body}>
                    <p>{message}</p>
                </div>
                <div className={styles.footer}>
                    <button onClick={onClose} className={styles.cancelBtn}>İptal</button>
                    <button onClick={onConfirm} className={styles.confirmBtn}>Onayla</button>
                </div>
            </div>
        </div>
    );
}

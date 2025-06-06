'use client';
import { useState } from 'react'; 

export default function TelegramModal({ onClose, onSuccess }) {
 
  const TELEGRAM_CHANNEL_LINK = "https://t.me/Moon_modd";

  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      onSuccess(); 
      onClose(); 
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h3>PDFni Yuklab Olish Uchun</h3>
        <p>PDFni yuklab olish uchun iltimos, <a href={TELEGRAM_CHANNEL_LINK} target="_blank" rel="noopener noreferrer">Telegram kanalimizga</a> a'zo bo'ling.</p>
        <p style={{ marginTop: '10px' }}>A'zo bo'lganingizdan so'ng "Tasdiqlash" tugmasini bosing.</p>

        <div className="payment-actions">
          <button
            onClick={onClose}
            disabled={loading}
            className="cancel-button"
          >
            Bekor Qilish
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="pay-button" 
          >
            {loading ? 'Tasdiqlanmoqda...' : 'Tasdiqlash'}
          </button>
        </div>
      </div>
    </div>
  );
}
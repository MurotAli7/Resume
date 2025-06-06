'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/download');
    }, 3000);
  }, [router]);

  return (
    <div className="payment-result-container">
      <h2>To'lov muvaffaqiyatli amalga oshirildi!</h2>
      <p>Siz avtomatik ravishda PDF yuklab olish sahifasiga yo'naltirilmoqdasiz...</p>
    </div>
  );
}
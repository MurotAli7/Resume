'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PortfolioTemplate from '../components/PortfolioTemplate';

export default function PreviewPage() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('portfolio');
    if (!stored) router.push('/form');
    else setData(JSON.parse(stored));
  }, [router]);

  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="preview-container">
      <PortfolioTemplate data={data} />
    </div>
  );
}
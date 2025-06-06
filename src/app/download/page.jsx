'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic'; 
const DynamicPdfGenerator = dynamic(() => import('../components/PdfGenerator'), {
  ssr: false,
  loading: () => <div className="loading">PDF generatsiyasi yuklanmoqda...</div>,
});

export default function DownloadPage() {
  const [data, setData] = useState(null);
  const [pdfStatus, setPdfStatus] = useState('loading');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const stored = localStorage.getItem('portfolio');
    if (!stored) {
      router.push('/form');
    } else {
      setData(JSON.parse(stored));
    }
  }, [router]);

  const handlePdfGenerated = () => {
    setPdfStatus('generated');
    setTimeout(() => {
      router.push('/'); 
    }, 2000);
  };

  const handlePdfError = (errorMessage) => {
    setPdfStatus('error');
  };

  if (!data) return <div className="loading">Ma'lumotlar yuklanmoqda...</div>;

  return (
    <div className="download-container">
      <DynamicPdfGenerator
        data={data}
        onPdfGenerated={handlePdfGenerated}
        onError={handlePdfError}
      />
    </div>
  );
}
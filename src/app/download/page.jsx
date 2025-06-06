'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// PdfGenerator komponentini dinamik ravishda yuklaymiz.
// Aliasdan '@/components/PdfGenerator' dan NISBIY YO'LGA O'ZGARISH
const DynamicPdfGenerator = dynamic(() => import('../../components/PdfGenerator'), { // <-- O'ZGARTIRILGAN QATOR
  ssr: false,
  loading: () => <div className="loading">PDF generatsiyasi yuklanmoqda...</div>,
});

// useSearchParams ni ishlatadigan komponentni ajratamiz
function SearchParamsHandler({ onDataLoaded }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('portfolio');
    if (!stored) {
      router.push('/form');
    } else {
      onDataLoaded(JSON.parse(stored));
    }
  }, [router, onDataLoaded]);

  return null;
}

export default function DownloadPage() {
  const [data, setData] = useState(null);
  const [pdfStatus, setPdfStatus] = useState('loading');

  const handlePdfGenerated = () => {
    setPdfStatus('generated');
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  const handlePdfError = (errorMessage) => {
    setPdfStatus('error');
    // setErrorMessage(errorMessage);
  };

  if (!data) {
    return (
      <Suspense fallback={<div className="loading">Ma'lumotlar yuklanmoqda...</div>}>
        <SearchParamsHandler onDataLoaded={setData} />
      </Suspense>
    );
  }

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
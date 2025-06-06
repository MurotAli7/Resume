'use client';

import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PortfolioTemplate from './PortfolioTemplate';

export default function PdfGenerator({ data, onPdfGenerated, onError }) {
  const pdfContentRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [localError, setLocalError] = useState('');
  const [pdfStarted, setPdfStarted] = useState(false); 

 
  useEffect(() => {
    if (data && !pdfStarted) { 
      setPdfStarted(true);
      generatePdfAction();
    }
  }, [data, pdfStarted]);

  const generatePdfAction = async () => {
    setIsGenerating(true);
    setLocalError('');

    try {
     
      await new Promise(resolve => setTimeout(resolve, 500)); 

      const input = pdfContentRef.current;
      if (!input) {
        throw new Error('PDF content topilmadi. Element mavjudligini tekshiring.');
      }

      const canvas = await html2canvas(input, {
        scale: 2,
        logging: true,
        useCORS: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`${data.name}_Portfolio.pdf`);

      onPdfGenerated();
    } catch (err) {
      console.error('PDF yaratishda xatolik:', err);
      setLocalError('PDF yaratishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
      onError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="pdf-generator-wrapper">
     
      <div id="pdf-content" ref={pdfContentRef} style={{ position: 'absolute', left: '-9999px', width: '210mm', height: '297mm' }}>
        {data && <PortfolioTemplate data={data} />} 
      </div>

      {isGenerating ? (
        <div className="generating-message">
          <p>PDF yaratilmoqda...</p>
          <p>Iltimos kuting, bu bir necha soniya vaqt olishi mumkin.</p>
        </div>
      ) : localError ? (
        <div className="error-message">
          <p>{localError}</p>
          <button onClick={generatePdfAction} className="retry-button">
            Qayta Urinish
          </button>
        </div>
      ) : (
        <div className="success-message">
          <p>PDF muvaffaqiyatli yaratildi!</p>
          <p>Agar yuklab olish avtomatik boshlanmasa, quyidagi tugmani bosing:</p>
          <button onClick={generatePdfAction} className="download-again-button">
            Qayta Yuklab Olish
          </button>
        </div>
      )}
    </div>
  );
}
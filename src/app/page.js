'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/form');
  };

  return (
    <main className="home-container">
      <h1 className="home-title">Portfolio Generator</h1>
      <button onClick={handleStart} className="start-button">
        Boshlash
      </button>
    </main>
  );
}
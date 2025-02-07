'use client';
import { useEffect, useState } from 'react';

export function LoadingMessage() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : `${prev}.`));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 animate-pulse rounded-full bg-current" />
      <div className="inline-flex w-6">
        <span className="font-mono">{dots}</span>
      </div>
    </div>
  );
}

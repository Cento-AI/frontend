'use client';

import { useEffect, useState } from 'react';

interface TypeWriterProps {
  content: string;
  speed?: number;
  onComplete?: () => void;
}

export function TypeWriter({
  content,
  speed = 30,
  onComplete,
}: TypeWriterProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent((prev) => prev + content[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }

    onComplete?.();
  }, [content, currentIndex, speed, onComplete]);

  return <span className="whitespace-pre-wrap">{displayedContent}</span>;
}

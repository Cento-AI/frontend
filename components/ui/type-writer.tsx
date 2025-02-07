'use client';
import type { Message } from '@/lib/types/message';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';
import { useEffect, useRef, useState } from 'react';

interface TypeWriterProps {
  message: Message<unknown>;
  speed?: number;
  onComplete?: (suggestedAnswers?: SuggestedAnswer[]) => void;
}

export function TypeWriter({
  message,
  speed = 30,
  onComplete,
}: TypeWriterProps) {
  const { content, suggestedAnswers } = message;
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent((prev) => prev + content[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }

    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete?.(suggestedAnswers);
    }
  }, [content, currentIndex, speed, onComplete, suggestedAnswers]);

  // Reset completion flag when message changes
  useEffect(() => {
    hasCompletedRef.current = false;
    setDisplayedContent('');
    setCurrentIndex(0);
  }, [message]);

  return <span className="whitespace-pre-wrap">{displayedContent}</span>;
}

'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
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
    <div className={cn('flex gap-3 text-sm', 'flex-row')}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={'/agent-avatar.png'} alt={'agent'} />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'rounded-lg px-4 py-2 max-w-[80%]',
          'bg-secondary text-secondary-foreground',
        )}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-current" />
          <div className="inline-flex w-6">
            <span className="font-mono">{dots}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

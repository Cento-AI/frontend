'use client';

import { getOpportunities } from '@/lib/services/get-opportunities';
import type { WalletAnalysis } from '@/lib/types/analysis';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2, Search, Wallet } from 'lucide-react';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

interface AgentAnalysisProps {
  onComplete: (analysis: WalletAnalysis) => void;
  onError: (error: Error) => void;
}

const steps = [
  {
    id: 'connect',
    icon: Wallet,
    text: 'Connecting to wallet...',
  },
  {
    id: 'analyze',
    icon: Search,
    text: 'Analyzing portfolio...',
  },
  {
    id: 'opportunities',
    icon: Search,
    text: 'Finding opportunities...',
  },
];

export function AgentAnalysis({ onComplete, onError }: AgentAnalysisProps) {
  const { address } = useAccount();

  const { error } = useSWR(
    address ? ['opportunities', address] : null,
    () => getOpportunities(address!),
    {
      onSuccess: (data) => {
        onComplete(data);
      },
      onError: (err) => {
        onError(
          err instanceof Error ? err : new Error('Failed to analyze wallet'),
        );
      },
    },
  );

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-4 text-destructive">
        <AlertCircle className="h-8 w-8" />
        <p className="text-sm">Failed to analyze wallet</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-8">
      <div className="space-y-6">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: steps.indexOf(step) * 0.5 }}
          >
            <motion.div
              animate={{
                rotate: step.icon === Loader2 ? 360 : 0,
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            >
              <step.icon className="h-5 w-5 text-primary" />
            </motion.div>
            <motion.span
              className="text-muted-foreground text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: steps.indexOf(step) * 0.5 + 0.3 }}
            >
              {step.text}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

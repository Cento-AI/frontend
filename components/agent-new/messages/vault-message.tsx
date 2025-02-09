import { TypeWriter } from '@/components/ui/type-writer';
import { VaultDetails } from '@/components/vault/vault-details';
import type { Message } from '@/lib/types/message';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';
import type { UserVaultData } from '@/lib/types/vault';
import { useState } from 'react';
import { ErrorMessage } from './error-message';

interface VaultMessageProps {
  message: Message<UserVaultData>;
  onComplete?: (suggestedAnswers?: SuggestedAnswer[]) => void;
}

export function VaultMessage({ message, onComplete }: VaultMessageProps) {
  const [showVault, setShowVault] = useState(false);
  const { data: vault, suggestedAnswers } = message;

  if (!vault) {
    return (
      <ErrorMessage
        message={{
          role: 'agent',
          content: 'Failed to create your vault. Please try again.',
          type: 'error',
        }}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="space-y-6">
      <TypeWriter
        message={message}
        onComplete={() => {
          setShowVault(true);
          onComplete?.(suggestedAnswers);
        }}
      />
      {showVault && <VaultDetails vault={vault} />}
    </div>
  );
}

import { TypeWriter } from '@/components/ui/type-writer';
import { VaultDetails } from '@/components/vault/vault-details';
import type { Message } from '@/lib/types/message';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';
import type { UserVaultData } from '@/lib/types/vault';
import { useState } from 'react';
import { ErrorMessage } from './error-message';
import { FundMessage } from './fund-message';

interface VaultMessageProps {
  message: Message<UserVaultData>;
  onComplete?: (suggestedAnswers?: SuggestedAnswer[]) => void;
}

export function VaultMessage({ message, onComplete }: VaultMessageProps) {
  const [showVault, setShowVault] = useState(false);
  const { data: vault } = message;
  const hasFundedVault = vault?.balances.some(
    (balance) => balance.balance > BigInt(0),
  );
  console.log('show vault', showVault);
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
        }}
      />
      {showVault && <VaultDetails vault={vault} />}
      {showVault && !hasFundedVault && (
        <FundMessage
          message={{
            ...message,
            content:
              "Before we can start implementing your strategy, you'll need to fund your vault. Please select a token to deposit:",
            data: vault,
          }}
          onComplete={() => {
            onComplete?.([
              {
                text: "Let's start investing my funds",
                action: 'implement',
              },
            ]);
          }}
        />
      )}
    </div>
  );
}

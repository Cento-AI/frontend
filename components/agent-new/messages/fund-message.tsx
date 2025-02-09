import { FundVault } from '@/components/vault/fund-vault';
import type { Message } from '@/lib/types/message';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';
import type { UserVaultData } from '@/lib/types/vault';
import { ErrorMessage } from './error-message';

interface FundMessageProps {
  message: Message<UserVaultData>;
  onComplete?: (suggestedAnswers?: SuggestedAnswer[]) => void;
}

export function FundMessage({ message, onComplete }: FundMessageProps) {
  const { data: vault } = message;

  if (!vault) {
    return (
      <ErrorMessage
        message={{
          role: 'agent',
          content: 'There was an error finding your vault, try again later',
          type: 'error',
        }}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="space-y-6">
      <span className="whitespace-pre-wrap">{message.content}</span>
      <div className="rounded-lg bg-primary/10 p-4">
        <h3 className="mb-4 font-medium">
          Select a token and amount to fund your vault:
        </h3>
        <div className="space-y-3">
          {vault.balances.map((token) => (
            <FundVault
              key={token.address}
              token={token}
              vaultAddress={vault.vaultAddress}
              onSuccess={() => {
                onComplete?.(message.suggestedAnswers);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

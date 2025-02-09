import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { TokenBalance } from '@/lib/types/token';
import Image from 'next/image';
import { useState } from 'react';

interface FundVaultProps {
  token: TokenBalance;
}

export function FundVault({ token }: FundVaultProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFund = async () => {
    if (!amount) return;

    try {
      setLoading(true);
      await onFund(amount);
    } catch (error) {
      console.error('Failed to fund:', error);
    } finally {
      setLoading(false);
      setAmount('');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 flex-1">
        {token.logoURI && (
          <Image
            src={token.logoURI}
            alt={token.symbol}
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
        <Input
          type="number"
          placeholder={`Amount in ${token.symbol}`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1"
        />
      </div>
      <Button
        variant="secondary"
        onClick={handleFund}
        disabled={!amount || loading}
      >
        {loading ? 'Funding...' : `Fund ${token.symbol}`}
      </Button>
    </div>
  );
}

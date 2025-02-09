'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { approveTokenForVault } from '@/lib/services/approve-token';
import { fundVault } from '@/lib/services/fund-vault';
import type { TokenBalance } from '@/lib/types/token';
import Image from 'next/image';
import { useState } from 'react';
import type { Address } from 'viem';

interface FundVaultProps {
  token: TokenBalance;
  vaultAddress: Address;
  disabled?: boolean;
  onSuccess?: () => void;
}

export function FundVault({
  token,
  vaultAddress,
  disabled,
  onSuccess,
}: FundVaultProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const { toast } = useToast();

  const handleApprove = async () => {
    if (!amount) return;

    try {
      setLoading(true);
      await approveTokenForVault(vaultAddress, token, amount);
      toast({
        title: 'Success',
        description: `Successfully approved ${token.symbol}`,
      });
      setIsApproved(true);
    } catch (error) {
      console.error('Failed to approve:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve token. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFund = async () => {
    if (!amount) return;

    try {
      setLoading(true);
      await fundVault(vaultAddress, token, amount);
      toast({
        title: 'Success',
        description: `Successfully funded vault with ${amount} ${token.symbol}`,
      });
      setAmount('');
      setIsApproved(false);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to fund:', error);
      toast({
        title: 'Error',
        description: 'Failed to fund vault. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
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
          disabled={loading || disabled}
        />
      </div>
      <Button
        variant="secondary"
        onClick={isApproved ? handleFund : handleApprove}
        disabled={!amount || loading || disabled}
      >
        {loading
          ? isApproved
            ? 'Funding...'
            : 'Approving...'
          : isApproved
            ? `Fund ${token.symbol}`
            : `Approve ${token.symbol}`}
      </Button>
    </div>
  );
}

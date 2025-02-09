import { formatUnits, parseUnits } from 'viem';

export function formatToken(amount: bigint, decimals: number): string {
  return formatUnits(amount, decimals);
}

export function formatTokenToBigInt(amount: string, decimals: number): bigint {
  return parseUnits(amount, decimals);
}

import type { Address } from 'viem';

export interface Token {
  symbol: string;
  name: string;
  address: Address;
  decimals: number;
  logoURI?: string;
}

export interface TokenBalance extends Token {
  balance: bigint;
}

'use client';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { baseSepolia } from 'viem/chains';
import { WagmiProvider as WagmiProviderBase } from 'wagmi';
import { wagmiConfig } from '../../lib/config/viem';

const queryClient = new QueryClient();

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <OnchainKitProvider chain={baseSepolia}>
      <WagmiProviderBase config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProviderBase>
    </OnchainKitProvider>
  );
}

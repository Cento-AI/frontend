'use client';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'viem/chains';
import { http, WagmiProvider as WagmiProviderBase, createConfig } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    coinbaseWallet({
      appName: 'Cento AI',
    }),
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <OnchainKitProvider chain={base}>
      <WagmiProviderBase config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProviderBase>
    </OnchainKitProvider>
  );
}

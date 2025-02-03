"use client";

import { AuthProvider } from "@/components/auth/auth-provider";
import { WagmiProvider } from "@/components/providers/wagmi-provider";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider>
      <AuthProvider>{children}</AuthProvider>
    </WagmiProvider>
  );
}

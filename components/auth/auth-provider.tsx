"use client";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "viem/chains";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY!}
      chain={base}
      config={{
        wallet: {
          display: "modal",
        },
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}

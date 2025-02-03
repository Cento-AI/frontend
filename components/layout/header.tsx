"use client";
import { Wallet } from "@/components/wallet/wallet";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Cento AI</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Wallet />
        </div>
      </div>
    </header>
  );
}

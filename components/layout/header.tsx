'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Wallet } from '@/components/wallet/wallet';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { arbitrum, baseSepolia } from 'viem/chains';
import { useSwitchChain } from 'wagmi';

const chains = [
  { id: baseSepolia.id, name: 'Base' },
  { id: arbitrum.id, name: 'Arbitrum' },
];

const navigation = [
  { name: 'Agent', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
];

export function Header() {
  const { switchChain } = useSwitchChain();
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Image src="/logo.png" alt="Cento AI" width={120} height={32} />
          <nav className="flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Wallet />
          <Select
            onValueChange={(value) => switchChain({ chainId: Number(value) })}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Base" />
            </SelectTrigger>
            <SelectContent>
              {chains.map((chain) => (
                <SelectItem key={chain.id} value={chain.id.toString()}>
                  {chain.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}

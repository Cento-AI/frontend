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
    <header className="border-b bg-gradient-to-r from-primary-gradient-from to-primary-gradient-to text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Image src="/logo.png" alt="Cento AI" width={120} height={32} />
          <nav className="flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-white',
                  pathname === item.href ? 'text-white' : 'text-white/85',
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
            <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
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

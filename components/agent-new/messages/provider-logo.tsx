import { cn } from '@/lib/utils';
import { AaveLogo } from '../../svg/aave-logo';
import { AerodromeLogo } from '../../svg/aerodrome-logo';
import { CompoundLogo } from '../../svg/compound-logo';
import { UniswapLogo } from '../../svg/uniswap-logo';

interface ProviderLogoProps {
  providerName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | number;
}

export function ProviderLogo({
  providerName,
  className,
  size = 'md',
}: ProviderLogoProps) {
  // Convert size to pixels
  const sizeInPx =
    typeof size === 'number'
      ? size
      : size === 'sm'
        ? 24
        : size === 'md'
          ? 32
          : 48; // lg

  const logoClass = cn('inline-block', className);

  switch (providerName.toLowerCase()) {
    case 'aave':
      return (
        <AaveLogo className={logoClass} width={sizeInPx} height={sizeInPx} />
      );
    case 'compound':
      return (
        <CompoundLogo
          className={logoClass}
          width={sizeInPx}
          height={sizeInPx}
        />
      );
    case 'uniswap':
      return (
        <UniswapLogo className={logoClass} width={sizeInPx} height={sizeInPx} />
      );
    case 'aerodrome':
      return (
        <AerodromeLogo
          className={logoClass}
          width={sizeInPx}
          height={sizeInPx}
        />
      );
    default:
      return null;
  }
}

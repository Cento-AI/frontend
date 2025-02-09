import type { Token } from '../types/token';

export const SUPPORTED_TOKENS: Token[] = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/325/thumb/Tether.png',
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/9956/thumb/4943.png',
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/2518/thumb/weth.png',
  },
];

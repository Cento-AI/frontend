import { SUPPORTED_TOKENS } from '../constants/tokens';
import type { Token } from '../types/token';

export const convertTokenNameToToken = (
  tokenName: string,
): Token | undefined => {
  return SUPPORTED_TOKENS.find((token) => token.name === tokenName);
};

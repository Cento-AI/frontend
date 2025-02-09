import { type Address, parseUnits } from 'viem';
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from 'wagmi/actions';
import { wagmiConfig } from '../config/viem';
import { VaultABI } from '../constants/vault-abi';
import type { Token } from '../types/token';

export async function fundVault(
  vaultAddress: Address,
  token: Token,
  amount: string,
) {
  const parsedAmount = parseUnits(amount, token.decimals);

  const { request } = await simulateContract(wagmiConfig, {
    address: vaultAddress,
    abi: VaultABI,
    functionName: 'depositERC20',
    args: [token.address, parsedAmount],
  });

  const hash = await writeContract(wagmiConfig, request);
  const receipt = await waitForTransactionReceipt(wagmiConfig, { hash });

  return receipt;
}

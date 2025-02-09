import { type Address, parseUnits } from 'viem';
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from 'wagmi/actions';
import { wagmiConfig } from '../config/viem';
import type { Token } from '../types/token';

export async function approveTokenForVault(
  vaultAddress: Address,
  token: Token,
  amount: string,
) {
  const parsedAmount = parseUnits(amount, token.decimals);

  const { request } = await simulateContract(wagmiConfig, {
    address: token.address,
    abi: [
      {
        name: 'approve',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { name: 'spender', type: 'address' },
          { name: 'amount', type: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool' }],
      },
    ],
    functionName: 'approve',
    args: [vaultAddress, parsedAmount],
  });

  const hash = await writeContract(wagmiConfig, request);
  const receipt = await waitForTransactionReceipt(wagmiConfig, { hash });

  return receipt;
}

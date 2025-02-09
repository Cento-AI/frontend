import type { Address } from 'viem';
import type { AgentResponse } from '../types/agent-response';
import type { StrategyAction } from '../types/strategy-action';

export async function confirmStrategy(
  userAddress: Address,
  actions: StrategyAction[],
): Promise<AgentResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/agent/confirm-strategy`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAddress,
        actions,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to confirm strategy');
  }

  return response.json();
}

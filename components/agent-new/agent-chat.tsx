'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { applyStrategy } from '@/lib/services/apply-strategy';
import { createVault } from '@/lib/services/create-vault';
import { getStrategy } from '@/lib/services/get-strategy';
import type { WalletAnalysis } from '@/lib/types/analysis';
import type { Message } from '@/lib/types/message';
import type { PortfolioStrategy } from '@/lib/types/portfolio-strategy';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { AgentAnalysis } from './agent-analysis';
import { AgentMessage } from './agent-message';
import { LoadingMessage } from './messages/loading-message';
import { SuggestedAnswers } from './messages/suggested-answers';

export function AgentChat() {
  const { isConnected, address } = useAccount();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [messages, setMessages] = useState<Message<unknown>[]>([]);
  const [input, setInput] = useState('');
  const [suggestedAnswers, setSuggestedAnswers] = useState<SuggestedAnswer[]>(
    [],
  );
  const [isWaitingForStrategyInput, setIsWaitingForStrategyInput] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const handleStrategyDescription = async (description: string) => {
    if (!address) return;

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: description, type: 'default' },
    ]);

    try {
      setLoading(true);
      const { strategy } = await getStrategy(address, description);
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          content:
            "Based on your description, I've created the following investment strategy. Would you like me to proceed with this strategy?",
          type: 'get-strategy',
          data: strategy,
          suggestedAnswers: [
            { text: 'Yes, proceed with this strategy', action: 'proceed' },
            {
              text: 'No, let me describe a different strategy',
              action: 'retry',
            },
          ],
        },
      ]);
    } catch (error) {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          content:
            'I apologize, but I encountered an error while creating your strategy. Please try again.',
          type: 'error',
        },
      ]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    if (isWaitingForStrategyInput) {
      handleStrategyDescription(input);
      setIsWaitingForStrategyInput(false);
    } else {
      setMessages([
        ...messages,
        { role: 'user', content: input, type: 'default' },
      ]);

      // Simulate agent response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'agent',
            content:
              "I'm analyzing your request. As your AI agent, I'll help you find the best opportunities.",
            type: 'default',
          },
        ]);
      }, 1000);
    }
    setInput('');
  };

  const handleAnalysisComplete = (analysis: WalletAnalysis) => {
    setIsFirstLoad(false);
    setMessages([
      {
        role: 'agent',
        content: "I've analyzed your wallet and found some opportunities.",
        type: 'analysis',
        data: analysis,
      },
    ]);

    // Add follow-up message after a delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          content:
            'Would you like me to help manage your portfolio automatically, or would you prefer to handle these opportunities yourself?',
          type: 'default',
          suggestedAnswers: [
            { text: 'Yes, help manage my portfolio', action: 'auto' },
            { text: "I'll handle it myself", action: 'manual' },
            { text: 'Tell me more about the options', action: 'custom' },
          ],
        },
      ]);
    }, 3000);
  };

  const handleAnalysisError = (error: Error) => {
    setIsFirstLoad(false);
    setMessages([
      {
        role: 'agent',
        content:
          'I apologize, but I encountered an error while analyzing your wallet.',
        type: 'error',
      },
    ]);
  };

  const handleSuggestedAnswer = async (answer: SuggestedAnswer) => {
    setMessages([
      ...messages,
      { role: 'user', content: answer.text, type: 'default' },
    ]);
    setSuggestedAnswers([]);

    if (answer.action === 'auto') {
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          content:
            'Great! Please describe your ideal investment strategy. For example: "I want a conservative strategy focused on stablecoin lending with 70% in lending and 30% in liquidity pools, preferring USDC with minimum 4% APY"',
          type: 'default',
        },
      ]);
      setIsWaitingForStrategyInput(true);
    } else if (answer.action === 'proceed' && address) {
      // Get the strategy from the last message
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'get-strategy' && lastMessage.data) {
        try {
          setLoading(true);
          const vault = await createVault(
            address,
            lastMessage.data as PortfolioStrategy,
          );
          setLoading(false);

          setMessages((prev) => [
            ...prev,
            {
              role: 'agent',
              content: "Great! I've created your vault. Here are the details:",
              type: 'vault',
              data: vault,
              suggestedAnswers: [
                {
                  text: 'Fund the vault',
                  action: 'fund',
                },
              ],
            },
          ]);
        } catch (error) {
          setLoading(false);
          setMessages((prev) => [
            ...prev,
            {
              role: 'agent',
              content:
                'Sorry, I encountered an error while creating your vault. Please try again.',
              type: 'error',
            },
          ]);
        }
      }
    } else if (answer.action === 'implement' && address) {
      try {
        setLoading(true);
        const rebalance = await applyStrategy(address);
        setLoading(false);

        setMessages((prev) => [
          ...prev,
          {
            role: 'agent',
            content:
              "I've analyzed your portfolio and prepared a rebalancing strategy:",
            type: 'implement-strategy',
            data: rebalance,
          },
        ]);
      } catch (error) {
        setLoading(false);
        setMessages((prev) => [
          ...prev,
          {
            role: 'agent',
            content:
              'Sorry, I encountered an error while preparing your strategy. Please try again.',
            type: 'error',
          },
        ]);
      }
    }
  };

  return (
    <div className="grid grid-rows-[1fr_auto] overflow-hidden">
      <div className="overflow-y-auto pb-28">
        <div className="p-4 space-y-4">
          {isConnected ? (
            isFirstLoad ? (
              <AgentAnalysis
                onComplete={handleAnalysisComplete}
                onError={handleAnalysisError}
              />
            ) : (
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <AgentMessage
                    key={`${message.role}-${i}`}
                    message={message}
                    onComplete={(suggestedAnswers) => {
                      if (suggestedAnswers) {
                        setSuggestedAnswers(suggestedAnswers);
                      }
                    }}
                  />
                ))}
                {loading && <LoadingMessage />}
              </div>
            )
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Please connect your wallet to chat with the agent
            </div>
          )}
        </div>
      </div>

      <div className="relative border-t p-4">
        {suggestedAnswers.length > 0 && (
          <SuggestedAnswers
            answers={suggestedAnswers}
            onSelect={handleSuggestedAnswer}
          />
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isConnected
                ? 'Ask your agent anything...'
                : 'Connect wallet to chat with agent'
            }
            className="flex-1"
            disabled={!isConnected || isFirstLoad}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!isConnected || isFirstLoad}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

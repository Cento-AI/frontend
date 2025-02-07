'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { WalletAnalysis } from '@/lib/types/analysis';
import type { Message } from '@/lib/types/message';
import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { AgentAnalysis } from './agent-analysis';
import { AgentMessage } from './agent-message';

export function AgentChat() {
  const { isConnected } = useAccount();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isConnected && isFirstLoad) {
      // Simulate analysis time
      const timer = setTimeout(() => {
        setIsFirstLoad(false);
        setMessages([
          {
            role: 'agent',
            content:
              "I've analyzed your wallet and found some interesting opportunities. What would you like to know about?",
          },
        ]);
      }, 4000); // Show animation for 4 seconds

      return () => clearTimeout(timer);
    }
  }, [isConnected, isFirstLoad]);

  const handleSend = () => {
    if (!input.trim()) return;

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

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto min-h-0">
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
                  />
                ))}
              </div>
            )
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Please connect your wallet to chat with the agent
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 border-t p-4">
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

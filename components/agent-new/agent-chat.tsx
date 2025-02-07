'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { WalletAnalysis } from '@/lib/types/analysis';
import type { Message } from '@/lib/types/message';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { AgentAnalysis } from './agent-analysis';
import { AgentMessage } from './agent-message';
import { SuggestedAnswers } from './messages/suggested-answers';

export function AgentChat() {
  const { isConnected } = useAccount();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [messages, setMessages] = useState<Message<unknown>[]>([]);
  const [input, setInput] = useState('');
  const [suggestedAnswers, setSuggestedAnswers] = useState<SuggestedAnswer[]>(
    [],
  );

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

  const handleSuggestedAnswer = (answer: SuggestedAnswer) => {
    // Handle the selected answer
    setMessages([
      ...messages,
      { role: 'user', content: answer.text, type: 'default' },
    ]);
    console.log('handleSuggestedAnswer', answer);
    setSuggestedAnswers([]); // Clear suggestions after selection

    if (answer.onClick) {
      answer.onClick();
    }
  };

  return (
    <div className="grid grid-rows-[1fr_auto] overflow-hidden">
      <div className="overflow-y-auto">
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

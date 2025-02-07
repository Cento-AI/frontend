import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { useAccount } from 'wagmi';

export function AgentHeader() {
  const { isConnected } = useAccount();

  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold text-lg">AI Agent</h2>
        <span
          className={`text-sm ${isConnected ? 'text-green-500' : 'text-muted-foreground'}`}
        >
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <Button variant="ghost" size="icon" disabled={!isConnected}>
        <RefreshCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}

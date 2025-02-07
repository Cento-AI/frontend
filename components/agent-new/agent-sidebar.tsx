import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface AgentSidebarProps {
  className?: string;
}

export function AgentSidebar({ className }: AgentSidebarProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Agent Status</h3>
          <div className="text-sm text-muted-foreground">
            Connected to Base Network
          </div>
          {/* Add more agent status information here */}
        </div>
      </ScrollArea>
    </div>
  );
}

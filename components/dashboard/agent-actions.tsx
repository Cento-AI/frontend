import { formatDistanceToNow } from 'date-fns';

const mockActions = [
  {
    id: 1,
    action: 'Lend USDC',
    description: 'Deposited 5,000 USDC into Aave for lending',
    timestamp: new Date('2024-03-07T10:00:00'),
    status: 'completed',
  },
  {
    id: 2,
    action: 'Rebalance Portfolio',
    description: 'Adjusted lending positions for optimal yield',
    timestamp: new Date('2024-03-06T15:30:00'),
    status: 'completed',
  },
  {
    id: 3,
    action: 'Collect Rewards',
    description: 'Collected and reinvested yield rewards',
    timestamp: new Date('2024-03-05T09:15:00'),
    status: 'completed',
  },
];

export function AgentActions() {
  return (
    <div className="rounded-lg border bg-card/80 shadow-sm p-4">
      <h2 className="font-medium mb-4">Recent Actions</h2>
      <div className="space-y-4">
        {mockActions.map((action) => (
          <div
            key={action.id}
            className="flex items-start justify-between border-b pb-4 last:border-0"
          >
            <div className="space-y-1">
              <p className="font-medium">{action.action}</p>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNow(action.timestamp, { addSuffix: true })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

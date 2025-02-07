import { ProviderLogo } from './provider-logo';

interface OpportunityContainerProps {
  providerName: string;
  title: React.ReactNode;
  apy: number;
  children?: React.ReactNode;
}

export function OpportunityContainer({
  providerName,
  title,
  apy,
  children,
}: OpportunityContainerProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-primary/10 p-3 hover:bg-primary/15 transition-colors">
      <ProviderLogo
        providerName={providerName}
        size="md"
        className="shrink-0"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-medium">{title}</span>
          <span className="font-medium text-green-600">{apy}% APY</span>
        </div>
        <div className="text-muted-foreground text-sm">{providerName}</div>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
}

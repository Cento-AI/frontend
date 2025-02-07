'use client';
import { Card } from '@/components/ui/card';
import { ContainerLayout } from '../layout/container-layout';
import { AgentChat } from './agent-chat';
import { AgentHeader } from './agent-header';
import { AgentSidebar } from './agent-sidebar';

export function Agent() {
  return (
    <ContainerLayout>
      <Card className="flex h-[600px] flex-col overflow-hidden">
        <AgentSidebar className="h-[15%] w-full border-t md:w-1/3 md:border-r md:border-t-0" />
        <div className="flex h-full flex-1 flex-col">
          <AgentHeader />
          <AgentChat />
        </div>
      </Card>
    </ContainerLayout>
  );
}

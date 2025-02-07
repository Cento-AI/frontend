'use client';
import { Card } from '@/components/ui/card';
import { ContainerLayout } from '../layout/container-layout';
import { AgentChat } from './agent-chat';
import { AgentHeader } from './agent-header';

export function Agent() {
  return (
    <ContainerLayout>
      <Card className="grid h-[600px] grid-rows-[auto_1fr]">
        <AgentHeader />
        {/* <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]"> */}
        {/* <AgentSidebar className="border-t md:border-r md:border-t-0" /> */}
        <AgentChat />
        {/* </div> */}
      </Card>
    </ContainerLayout>
  );
}

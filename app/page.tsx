import { Agent } from '@/components/agent-new/agent';
import { Header } from '@/components/layout/header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <Header />
      <main className="container mx-auto p-4">
        <Agent />
      </main>
    </div>
  );
}

import { Agent } from '@/components/agent-new/agent';
import { Header } from '@/components/layout/header';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Agent />
      </main>
    </div>
  );
}

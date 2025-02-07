import { Agent } from '@/components/agent-new/agent';
import { Header } from '@/components/layout/header';
import { AnalysisSection } from '@/components/portfolio/analysis-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* <HeroSection />
        <FeaturesSection /> */}
        <Agent />
        <AnalysisSection />
      </main>
    </div>
  );
}

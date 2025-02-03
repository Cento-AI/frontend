import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FeaturesSection() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          title="AI Analysis"
          description="Advanced AI agents analyze your portfolio for optimization opportunities"
        />
        <FeatureCard 
          title="Smart Recommendations"
          description="Get personalized investment recommendations based on your goals"
        />
        <FeatureCard 
          title="Real-time Optimization"
          description="Continuous monitoring and adjustment of your portfolio"
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
} 
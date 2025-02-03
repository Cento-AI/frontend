import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HeroSection() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Optimize Your Portfolio with AI
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Let our AI agents analyze and optimize your investment portfolio for maximum performance
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">Learn More</Button>
        </div>
      </div>
    </div>
  )
} 
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Describe Your Vision",
    description: "Tell our AI about your product goals, timeline, and key milestones.",
  },
  {
    number: "02",
    title: "AI Generates Roadmap",
    description: "Our advanced AI analyzes your input and creates a comprehensive roadmap.",
  },
  {
    number: "03",
    title: "Customize & Refine",
    description: "Fine-tune the roadmap to match your exact needs and priorities.",
  },
  {
    number: "04",
    title: "Share & Collaborate",
    description: "Share with your team, gather feedback, and iterate together.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform your vision into an actionable roadmap.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 border-border/50 bg-card/50 h-full">
                <div className="text-4xl font-bold text-primary/30 mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight size={24} className="text-primary/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

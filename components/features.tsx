import { Card } from "@/components/ui/card"
import { Zap, Brain, BarChart3, Users, Lock, ZapIcon } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Planning",
    description: "Let AI analyze your goals and generate comprehensive roadmaps tailored to your needs.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Create detailed roadmaps in seconds, not hours. Save time on planning and focus on execution.",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Beautiful, interactive visualizations that make it easy to understand your product timeline.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share roadmaps with your team, gather feedback, and iterate together in real-time.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Your data is encrypted and secure. Enterprise-grade security for peace of mind.",
  },
  {
    icon: ZapIcon,
    title: "Smart Suggestions",
    description: "AI provides intelligent recommendations to optimize your roadmap and timeline.",
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-transparent via-primary/5 to-transparent"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, manage, and execute your product roadmap with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="p-6 border-border/50 bg-card/50 hover:bg-card/80 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

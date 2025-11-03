import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at TechCorp",
    content: "Roadmapper AI cut our planning time in half. What used to take days now takes minutes.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Founder at StartupXYZ",
    content: "The AI suggestions are incredibly insightful. It helped us identify gaps we would have missed.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Product at InnovateCo",
    content: "Our team loves the collaboration features. Sharing and iterating on roadmaps is seamless.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-transparent via-primary/5 to-transparent"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">Loved by Product Teams</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what industry leaders are saying about Roadmapper AI.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border-border/50 bg-card/50">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

              {/* Author */}
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

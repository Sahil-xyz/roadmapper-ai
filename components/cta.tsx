import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <ScrollVelocityContainer className="text-4xl font-bold md:text-7xl bg-white text-black gap-5">
  <ScrollVelocityRow baseVelocity={20} direction={1}>
    Velocity Scroll
  </ScrollVelocityRow>
  <ScrollVelocityRow baseVelocity={20} direction={-1}>
    Velocity Scroll
  </ScrollVelocityRow>
</ScrollVelocityContainer>
    </section>
  )
}

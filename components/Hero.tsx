"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";
import { toast } from "sonner";
import { useUser, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Particles } from "@/components/ui/particles";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { AuroraText } from "@/components/ui/aurora-text"

export function Hero() {
  const { isSignedIn } = useUser();

  return (
    <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20" />
        <Particles />
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Badge */}
        <div className="flex justify-center mb-8 mt-16">
          
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-balance mb-6">
          Create Intelligent Roadmaps in{" "}
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            <AuroraText>Seconds</AuroraText>
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-muted-foreground text-center text-balance mb-8 max-w-2xl mx-auto">
          Transform your product vision into actionable roadmaps. Let AI handle
          the complexity while you focus on strategy.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          {isSignedIn ? (
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              <Link href="/roadmap/generate/">AI Generate</Link>
              <ArrowRight className="ml-2" size={20} />
            </Button>
          ) : (
            <SignInButton>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              >
                <Link href="">AI Generate</Link>
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </SignInButton>
          )}
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-muted px-8 bg-transparent"
          >
            <Link href="/roadmap/create">Create Manually</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

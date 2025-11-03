'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { Meteors } from "@/components/ui/meteors"
import { toast } from "sonner"
import { useUser, SignInButton} from "@clerk/nextjs";
import Link from "next/link"

export function Hero() {

  const { isSignedIn } = useUser();

  return (
    <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20" />
        <Meteors />
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Badge */}
        <div className="flex justify-center mb-8 mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm text-primary">Powered by Advanced AI</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-balance mb-6">
          Create Intelligent Roadmaps in{" "}
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Seconds</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-muted-foreground text-center text-balance mb-8 max-w-2xl mx-auto">
          Transform your product vision into actionable roadmaps. Let AI handle the complexity while you focus on
          strategy.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          {
            isSignedIn ? (
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                <Link href="/api/generate/">
                  Start Creating
                </Link>
                <ArrowRight className="ml-2" size={20} />
              </Button>
            ) : (
              <SignInButton>
               <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8" >
                <Link href="">
                  Start Creating
                </Link>
                <ArrowRight className="ml-2" size={20} />
              </Button> 
              </SignInButton>
            )
          }
          <Button size="lg" variant="outline" className="border-border hover:bg-muted px-8 bg-transparent" onClick={() =>
          toast.warning("Demo video is not created yet.")
        } >
            Watch Demo
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-1 overflow-hidden">
          <div className="relative bg-linear-to-b from-primary/10 to-transparent rounded-lg p-8 sm:p-12 min-h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/20 mb-4">
                <Sparkles size={32} className="text-primary" />
              </div>
              <p className="text-muted-foreground">Your AI-powered roadmap preview will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

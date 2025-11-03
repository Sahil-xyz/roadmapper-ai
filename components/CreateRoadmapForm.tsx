"use client"

import type React from "react"

import { useState } from "react"
import { Sparkles, ArrowRight, CheckCircle2, Zap, Brain, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignInButton, useUser } from "@clerk/nextjs"

// Type Definitions
type Step = {
  task: string
  completed: boolean
}

type Stage = {
  title: string
  steps: Step[]
}

type Resource = {
  name: string
  type: "Book" | "Course" | "Video" | "Article"
  link: string
}

type Roadmap = {
  id: string
  title: string
  goal: string
  resources: Resource[]
  stages: Stage[]
}

// How It Works Data
const HOW_IT_WORKS = [
  {
    icon: Brain,
    title: "Enter Your Goal",
    description: "Type what you want to achieve or learn",
  },
  {
    icon: Zap,
    title: "AI Processes",
    description: "Our AI analyzes and creates a structured plan",
  },
  {
    icon: Target,
    title: "Get Roadmap",
    description: "Receive a complete roadmap with stages and tasks",
  },
  {
    icon: CheckCircle2,
    title: "Track Progress",
    description: "Check off tasks as you complete them",
  },
]

export default function CreateRoadmapForm() {
  const { isSignedIn } = useUser();
  const [goal, setGoal] = useState("")
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  
  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center bg-background px-4">
        <h1 className="text-3xl font-bold mb-4">You need to sign in</h1>
        <p className="text-muted-foreground mb-6">Please sign in to create your personalized roadmap.</p>
        <SignInButton mode="modal">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3">
            Sign In
          </Button>
        </SignInButton>
      </main>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!goal.trim()) return

    setLoading(true)
    setRoadmap(null)

    try {
      const res = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      })

      const data: Roadmap = await res.json()
      setRoadmap(data)
    } catch (err) {
      console.error(err)
      alert("Error generating roadmap")
    } finally {
      setLoading(false)
    }
  }

  function toggleStep(stageIndex: number, stepIndex: number) {
    if (!roadmap) return

    const updated = { ...roadmap }
    const step = updated.stages[stageIndex].steps[stepIndex]
    step.completed = !step.completed

    setRoadmap(updated)

    fetch("/api/roadmap/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: roadmap.id, stages: updated.stages }),
    }).catch(console.error)
  }

  function calculateProgress() {
    if (!roadmap) return 0
    const allSteps = roadmap.stages.flatMap((s) => s.steps)
    const completed = allSteps.filter((s) => s.completed).length
    return allSteps.length === 0 ? 0 : Math.round((completed / allSteps.length) * 100)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Input */}
      <section className="relative overflow-hidden pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="mx-auto max-w-3xl">
          

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-primary/30 to-accent/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-75" />
              <div className="relative flex gap-3 p-2 rounded-2xl bg-card border border-primary/20 backdrop-blur-sm">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g., Learn Machine Learning, Build a Startup, Master React..."
                  className="flex-1 bg-transparent px-6 py-4 text-lg placeholder:text-muted-foreground focus:outline-none"
                  required
                />
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate
                      <ArrowRight size={20} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* How It Works Section */}
          {!roadmap && (
            <div className="mb-20">
              <h2 className="text-2xl font-bold text-center mb-12 text-balance">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {HOW_IT_WORKS.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="group">
                      <div className="relative h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-all hover:bg-card/80">
                        {/* Icon Container */}
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                          <Icon size={24} className="text-primary" />
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>

                        {/* Step Number */}
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Roadmap Display Section */}
      {roadmap && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Roadmap Header */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{roadmap.title}</h2>
              <p className="text-lg text-muted-foreground mb-8">{roadmap.goal}</p>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-bold text-primary">{calculateProgress()}%</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${calculateProgress()}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Resources Section */}
            {roadmap.resources.length > 0 && (
              <div className="mb-12 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Sparkles size={20} className="text-primary" />
                  Recommended Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roadmap.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 rounded-lg border border-border/50 bg-background hover:bg-card hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium group-hover:text-primary transition-colors">{res.name}</p>
                          <span className="text-xs text-muted-foreground mt-1 block">{res.type}</span>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Stages & Steps */}
            <div className="space-y-6">
              {roadmap.stages.map((stage, stageIndex) => {
                const stageProgress = stage.steps.length
                  ? Math.round((stage.steps.filter((s) => s.completed).length / stage.steps.length) * 100)
                  : 0

                return (
                  <div
                    key={stageIndex}
                    className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 hover:border-primary/50 transition-all"
                  >
                    {/* Stage Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                            {stageIndex + 1}
                          </div>
                          <h3 className="text-xl font-semibold">{stage.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground ml-11">
                          {stageProgress}% complete • {stage.steps.filter((s) => s.completed).length} of{" "}
                          {stage.steps.length} tasks
                        </p>
                      </div>
                    </div>

                    {/* Stage Progress Bar */}
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-6">
                      <div
                        className="h-full bg-linear-to-r from-primary to-accent transition-all duration-500"
                        style={{ width: `${stageProgress}%` }}
                      />
                    </div>

                    {/* Steps */}
                    <div className="space-y-3">
                      {stage.steps.map((step, stepIndex) => (
                        <label
                          key={stepIndex}
                          className="flex items-start gap-3 p-4 rounded-lg border border-border/50 bg-background hover:bg-muted/50 cursor-pointer transition-all group"
                        >
                          <div className="shrink-0 mt-1">
                            <input
                              type="checkbox"
                              checked={step.completed}
                              onChange={() => toggleStep(stageIndex, stepIndex)}
                              className="w-5 h-5 rounded border-primary/30 bg-background text-primary accent-primary cursor-pointer"
                            />
                          </div>
                          <span
                            className={`flex-1 transition-all ${
                              step.completed ? "line-through text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {step.task}
                          </span>
                          {step.completed && <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />}
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Generate New Roadmap Button */}
            <div className="mt-12 text-center">
              <Button
                onClick={() => {
                  setRoadmap(null)
                  setGoal("")
                }}
                variant="outline"
                size="lg"
                className="border-border hover:bg-muted"
              >
                <ArrowRight size={20} className="mr-2 rotate-180" />
                Create Another Roadmap
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

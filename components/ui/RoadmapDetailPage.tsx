"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Sparkles, CheckCircle2, ArrowRight, Loader2, Flame, Trophy, Target, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "../Header"

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

const iconMap = {
  Book: BookOpen,
  Course: Target,
  Video: Flame,
  Article: Sparkles,
}

export default function RoadmapDetailPage() {
  const params = useParams()
  const roadmapId = params.id as string

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedStage, setExpandedStage] = useState<number | null>(null)

  useEffect(() => {
    async function fetchRoadmap() {
      try {
        setLoading(true)
        const res = await fetch(`/api/roadmap/${roadmapId}`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })

        if (!res.ok) {
          throw new Error("Failed to fetch roadmap")
        }

        const data: Roadmap = await res.json()
        setRoadmap(data)
      } catch (err) {
        console.error(err)
        setError("Failed to load roadmap. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchRoadmap()
  }, [roadmapId])

  function toggleStep(stageIndex: number, stepIndex: number) {
    if (!roadmap) return

    const updated = { ...roadmap }
    const step = updated.stages[stageIndex].steps[stepIndex]
    step.completed = !step.completed

    setRoadmap(updated)

    // Save to backend
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

  function getCompletedStages() {
    if (!roadmap) return 0
    return roadmap.stages.filter((stage) => {
      const allCompleted = stage.steps.every((s) => s.completed)
      return allCompleted && stage.steps.length > 0
    }).length
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
          <span className="ml-3 text-muted-foreground">Loading roadmap...</span>
        </div>
      </main>
    )
  }

  if (error || !roadmap) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <p className="text-lg text-destructive mb-6">{error || "Roadmap not found"}</p>
          <Link href="/roadmaps">
            <Button variant="outline">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Roadmaps
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const progress = calculateProgress()
  const completedStages = getCompletedStages()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Back Button & Hero Header */}
      <section className="relative pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link href="/roadmaps">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Roadmaps
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Trophy size={16} className="text-primary" />
              <span className="text-sm text-primary font-medium">Roadmap Overview</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance leading-tight">
              {roadmap.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl text-balance">{roadmap.goal}</p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-4"
              >
                <p className="text-xs text-muted-foreground mb-1">Progress</p>
                <p className="text-2xl font-bold text-primary">{progress}%</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-4"
              >
                <p className="text-xs text-muted-foreground mb-1">Stages</p>
                <p className="text-2xl font-bold text-accent">{roadmap.stages.length}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-4"
              >
                <p className="text-xs text-muted-foreground mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-500">{completedStages}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-4"
              >
                <p className="text-xs text-muted-foreground mb-1">Tasks</p>
                <p className="text-2xl font-bold">{roadmap.stages.reduce((acc, s) => acc + s.steps.length, 0)}</p>
              </motion.div>
            </div>

            {/* Overall Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold text-primary">{progress}% Complete</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-border/30">
                <motion.div
                  className="h-full bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_auto]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      {roadmap.resources.length > 0 && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-border/50 bg-linear-to-br from-primary/10 via-card/50 to-accent/5 backdrop-blur-sm p-8"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Sparkles size={24} className="text-primary" />
                Recommended Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roadmap.resources.map((res, i) => {
                  const Icon = iconMap[res.type as keyof typeof iconMap] || Sparkles
                  return (
                    <motion.a
                      key={i}
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative p-5 rounded-lg border border-border/50 bg-background hover:bg-card hover:border-primary/50 transition-all overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                            <Icon size={18} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium group-hover:text-primary transition-colors">{res.name}</p>
                            <span className="text-xs text-muted-foreground mt-1 block">{res.type}</span>
                          </div>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-muted-foreground group-hover:text-primary transition-all mt-1 shrink-0 group-hover:translate-x-1"
                        />
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Stages & Steps */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-5xl space-y-6">
          {roadmap.stages.map((stage, stageIndex) => {
            const stageProgress = stage.steps.length
              ? Math.round((stage.steps.filter((s) => s.completed).length / stage.steps.length) * 100)
              : 0
            const completedSteps = stage.steps.filter((s) => s.completed).length
            const allStepsCompleted = completedSteps === stage.steps.length && stage.steps.length > 0
            const isExpanded = expandedStage === stageIndex

            return (
              <motion.div
                key={stageIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: stageIndex * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                onClick={() => setExpandedStage(isExpanded ? null : stageIndex)}
                className="rounded-xl border border-border/50 bg-linear-to-br from-card/80 via-card/50 to-card/30 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer overflow-hidden group"
              >
                {/* Stage Header */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Stage Number Badge */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 transition-all ${
                          allStepsCompleted
                            ? "bg-linear-to-br from-green-400/30 to-green-500/20 text-green-400 border border-green-400/30"
                            : "bg-linear-to-br from-primary to-accent text-primary-foreground border border-primary/30"
                        }`}
                      >
                        {stageIndex + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-balance group-hover:text-primary transition-colors">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {stageProgress}% complete • {completedSteps} of {stage.steps.length} tasks
                          {allStepsCompleted && <span className="ml-2 text-green-400 font-medium">✓ Completed</span>}
                        </p>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ArrowRight size={20} className="text-primary" />
                    </motion.div>
                  </div>

                  {/* Stage Progress Bar */}
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden border border-border/20">
                    <motion.div
                      className="h-full bg-linear-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${stageProgress}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Steps - Expandable */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 sm:px-8 pb-6 space-y-3 border-t border-border/30 pt-6">
                    {stage.steps.map((step, stepIndex) => (
                      <motion.label
                        key={stepIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: stepIndex * 0.05 }}
                        className="flex items-start gap-4 p-4 rounded-lg border border-border/30 bg-background/50 hover:bg-background hover:border-primary/50 cursor-pointer transition-all group/item"
                      >
                        <div className="shrink-0 mt-1">
                          <div className="relative w-6 h-6">
                            <input
                              type="checkbox"
                              checked={step.completed}
                              onChange={() => toggleStep(stageIndex, stepIndex)}
                              className="w-6 h-6 rounded border-2 border-primary/30 bg-background text-primary accent-primary cursor-pointer appearance-none checked:bg-linear-to-br checked:from-primary checked:to-accent checked:border-primary transition-all"
                              onClick={(e) => e.stopPropagation()}
                            />
                            {step.completed && (
                              <CheckCircle2 size={20} className="absolute inset-0 text-primary pointer-events-none" />
                            )}
                          </div>
                        </div>
                        <span
                          className={`flex-1 transition-all text-sm sm:text-base ${
                            step.completed
                              ? "line-through text-muted-foreground"
                              : "text-foreground group-hover/item:text-primary"
                          }`}
                        >
                          {step.task}
                        </span>
                        {step.completed && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="shrink-0">
                            <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center">
                              <CheckCircle2 size={16} className="text-green-400" />
                            </div>
                          </motion.div>
                        )}
                      </motion.label>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </main>
  )
}

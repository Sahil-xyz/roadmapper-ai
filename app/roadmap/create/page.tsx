"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"

type Step = {
  task: string
  completed: boolean
}

type Stage = {
  title: string
  steps: Step[]
}

export default function CreateRoadmapPage() {
  const router = useRouter()

  const [roadmap, setRoadmap] = useState({
    title: "",
    goal: "",
    stages: [] as Stage[]
  })

  const [saving, setSaving] = useState(false)

  // Update stage title
  function updateStageTitle(stageIndex: number, value: string) {
    const updatedStages = roadmap.stages.map((stage, i) =>
      i === stageIndex ? { ...stage, title: value } : stage
    )

    setRoadmap({
      ...roadmap,
      stages: updatedStages
    })
  }

  // Update step task
  function updateStep(stageIndex: number, stepIndex: number, value: string) {
    const updatedStages = roadmap.stages.map((stage, i) => {
      if (i !== stageIndex) return stage

      const updatedSteps = stage.steps.map((step, si) =>
        si === stepIndex ? { ...step, task: value } : step
      )

      return { ...stage, steps: updatedSteps }
    })

    setRoadmap({
      ...roadmap,
      stages: updatedStages
    })
  }

  // Add new stage
  function addStage() {
    setRoadmap({
      ...roadmap,
      stages: [
        ...roadmap.stages,
        {
          title: "New Stage",
          steps: []
        }
      ]
    })
  }

  // Add new step
  function addStep(stageIndex: number) {
    const updatedStages = roadmap.stages.map((stage, i) =>
      i === stageIndex
        ? {
            ...stage,
            steps: [
              ...stage.steps,
              { task: "New Step", completed: false }
            ]
          }
        : stage
    )

    setRoadmap({
      ...roadmap,
      stages: updatedStages
    })
  }

  // Save roadmap
  async function saveRoadmap() {
    if (!roadmap.title) {
      alert("Please enter a roadmap title")
      return
    }

    try {
      setSaving(true)

      const res = await fetch("/api/roadmap/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: roadmap.title,
          goal: roadmap.goal,
          stages: roadmap.stages
        })
      })

      const data = await res.json()

      router.push(`/roadmap/${data.id}`)
    } catch (err) {
      console.error("Failed to create roadmap", err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="block">
      <main>
    <Header/>
      </main>
    <main className="max-w-4xl mx-auto p-8 space-y-6 mt-20">

      <h1 className="text-3xl font-bold">
        Create Manual Roadmap
      </h1>

      {/* Title */}
      <input
        placeholder="Roadmap Title"
        value={roadmap.title}
        onChange={(e) =>
          setRoadmap({
            ...roadmap,
            title: e.target.value
          })
        }
        className="w-full border p-3 rounded"
      />

      {/* Goal */}
      <textarea
        placeholder="Goal of this roadmap"
        value={roadmap.goal}
        onChange={(e) =>
          setRoadmap({
            ...roadmap,
            goal: e.target.value
          })
        }
        className="w-full border p-3 rounded"
      />

      {/* Stages */}
      {roadmap.stages.map((stage, stageIndex) => (
        <div
          key={stageIndex}
          className="border p-4 rounded space-y-3"
        >

          {/* Stage Title */}
          <input
            value={stage.title}
            onChange={(e) =>
              updateStageTitle(stageIndex, e.target.value)
            }
            className="w-full border p-2 rounded"
          />

          {/* Steps */}
          {stage.steps.map((step, stepIndex) => (
            <input
              key={stepIndex}
              value={step.task}
              onChange={(e) =>
                updateStep(stageIndex, stepIndex, e.target.value)
              }
              className="w-full border p-2 rounded"
            />
          ))}

          <Button
            variant="outline"
            onClick={() => addStep(stageIndex)}
          >
            Add Step
          </Button>

        </div>
      ))}

      {/* Add Stage */}
      <Button className="mr-2" onClick={addStage}>
        Add Stage
      </Button>

      {/* Save */}
      <Button
        onClick={saveRoadmap}
        disabled={saving}
      >
        {saving ? "Creating..." : "Create Roadmap"}
      </Button>

    </main>
    </div>
  )
}
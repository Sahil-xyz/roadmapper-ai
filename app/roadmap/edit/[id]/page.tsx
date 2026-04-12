"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Step = {
  task: string;
  completed: boolean;
};

type Stage = {
  title: string;
  steps: Step[];
};

type Roadmap = {
  id: string;
  title: string;
  goal: string;
  stages: Stage[];
};

export default function EditRoadmapPage() {
  const params = useParams();
  const router = useRouter();
  const roadmapId = params.id as string;

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    async function fetchRoadmap() {
      const res = await fetch(`/api/roadmap/${roadmapId}`);
      const data = await res.json();

      setRoadmap({
        ...data,
        stages: data.stages ?? [],
      });
    }

    fetchRoadmap();
  }, [roadmapId]);

  if (!roadmap) return <p className="p-8">Loading...</p>;

  // Update stage title
  function updateStageTitle(stageIndex: number, value: string) {

    if(!roadmap) return;

    const updatedStages = roadmap.stages.map((stage, i) =>
      i === stageIndex ? { ...stage, title: value } : stage
    );

    setRoadmap({ ...roadmap, stages: updatedStages });
  }

  // Update step text
  function updateStep(stageIndex: number, stepIndex: number, value: string) {
    if (!roadmap) return
    const updatedStages = roadmap.stages.map((stage, i) => {
      if (i !== stageIndex) return stage;

      const updatedSteps = stage.steps.map((step, si) =>
        si === stepIndex ? { ...step, task: value } : step
      );

      return { ...stage, steps: updatedSteps };
    });

    setRoadmap({ ...roadmap, stages: updatedStages });
  }

  // Add step
  function addStep(stageIndex: number) {
    if (!roadmap) return
    const updatedStages = roadmap.stages.map((stage, i) =>
      i === stageIndex
        ? {
            ...stage,
            steps: [...stage.steps, { task: "New Step", completed: false }],
          }
        : stage
    );

    setRoadmap({ ...roadmap, stages: updatedStages });
  }

  // Add stage
  function addStage() {
    if (!roadmap) return
    setRoadmap({
      ...roadmap,
      stages: [...roadmap.stages, { title: "New Stage", steps: [] }],
    });
  }

  // Save changes
  async function saveChanges() {
    if (!roadmap) return
    await fetch("/api/roadmap/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: roadmap.id,
        title: roadmap.title,
        goal: roadmap.goal,
        stages: roadmap.stages,
      }),
    });

    router.push(`/roadmap/${roadmap.id}`);
  }

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Edit Roadmap</h1>

      {/* Title */}
      <input
        value={roadmap.title}
        onChange={(e) =>
          setRoadmap({ ...roadmap, title: e.target.value })
        }
        className="w-full border p-3 rounded"
      />

      {/* Goal */}
      <textarea
        value={roadmap.goal}
        onChange={(e) =>
          setRoadmap({ ...roadmap, goal: e.target.value })
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
      <Button onClick={addStage}>Add Stage</Button>

      {/* Save */}
      <Button onClick={saveChanges}>Save Changes</Button>
    </main>
  );
}
export type Step = {
  task: string
  completed: boolean
}

export type Stage = {
  title: string
  steps: Step[]
}

export type Resource = {
  name: string
  type: "Book" | "Course" | "Video" | "Article"
  link: string
}

export type Roadmap = {
  id: string
  title: string
  goal: string
  resources: Resource[]
  stages: Stage[]
}
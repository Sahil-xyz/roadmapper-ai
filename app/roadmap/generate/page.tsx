// app/roadmap/page.tsx
import CreateRoadmapForm from "@/components/CreateRoadmapForm";
import { Header } from "@/components/Header";

export default function RoadmapPage() {
  return (
    <>
      <main className="min-h-screen p-6">
        <Header/>
        <CreateRoadmapForm />
      </main>
    </>
  );
}

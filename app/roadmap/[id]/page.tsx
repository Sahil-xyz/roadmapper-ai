// app/roadmap/page.tsx
import { Header } from "@/components/Header";
import RoadmapDetailPage from "@/components/ui/RoadmapDetailPage";

export default function RoadmapPage() {
  return (
    <>
      <main className="min-h-screen p-6">
        <Header/>
        <RoadmapDetailPage />
      </main>
    </>
  );
}

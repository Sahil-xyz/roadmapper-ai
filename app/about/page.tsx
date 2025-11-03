// app/roadmap/page.tsx
import { Header } from "@/components/Header";
import RoadmapListPage from "@/components/RoadmapListPage";
import  AboutDetails from '@/components/AboutDetails'

export default function RoadmapPage() {
  return (
    <>
      <main className="min-h-screen p-6">
        <Header/>
        <AboutDetails />
      </main>
    </>
  );
}

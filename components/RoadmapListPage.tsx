"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";

type Roadmap = {
  id: string;
  title: string;
  goal: string;
  createdAt: string;
};

export default function RoadmapListPage() {
  const { isSignedIn } = useUser();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Always define hooks first (don’t return early before hooks)
  useEffect(() => {
    if (!isSignedIn) return; // only run fetch after sign-in

    async function fetchRoadmaps() {
      try {
        const res = await fetch("/api/roadmap/display", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch roadmaps");
        const data = await res.json();
        setRoadmaps(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmaps();
  }, [isSignedIn]);

  // ✅ After all hooks are defined, render conditionally
  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center bg-background px-4">
        <h1 className="text-3xl font-bold mb-4">You need to sign in</h1>
        <p className="text-muted-foreground mb-6">
          Please sign in to create your personalized roadmap.
        </p>
        <SignInButton mode="modal">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3">
            Sign In
          </Button>
        </SignInButton>
      </main>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
        <span className="ml-3 text-muted-foreground">Fetching your roadmaps...</span>
      </div>
    );
  }

  if (roadmaps.length === 0) {
    return (
      <div className="text-center py-32">
        <p className="text-lg text-muted-foreground mb-6">
          You haven’t created any roadmaps yet.
        </p>
        <Link href="/roadmaps/generate">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Sparkles className="mr-2 w-4 h-4" />
            Generate a Roadmap
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-background via-background/90 to-background">
      {/* HEADER SECTION */}
      <section className="relative pt-32 pb-20 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-30 -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium">
            <Sparkles className="w-4 h-4" /> Your AI Roadmaps
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Manage & Track{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Your Roadmaps
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All your AI-generated learning and project roadmaps — organized in one place.
          </p>
        </motion.div>
      </section>

      {/* ROADMAP LIST */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {roadmaps.map((roadmap, index) => (
            <motion.div
              key={roadmap.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg hover:bg-card/80 transition-all flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {roadmap.title}
                </h2>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6">{roadmap.goal}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {new Date(roadmap.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <Link href={`/roadmap/${roadmap.id}`}>
                  <Button variant="ghost" size="sm" className="text-primary group-hover:translate-x-1 transition-all">
                    View
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

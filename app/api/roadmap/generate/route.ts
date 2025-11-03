import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { generateRoadmap } from "@/lib/ai";
import { createUserIfNotExists } from "@/lib/createUserIfNotExists";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const dbUser = await createUserIfNotExists(userId, email);

    const { goal } = await req.json();
    if (!goal || typeof goal !== "string") {
      return NextResponse.json({ error: "Invalid goal" }, { status: 400 });
    }

    const roadmap = await generateRoadmap(goal);

    if (
      !roadmap.title ||
      !roadmap.goal ||
      !Array.isArray(roadmap.resources) ||
      !Array.isArray(roadmap.stages)
    ) {
      return NextResponse.json({ error: "Invalid roadmap format from AI" }, { status: 400 });
    }

    const saved = await prisma.roadmap.create({
      data: {
        title: roadmap.title,
        goal: roadmap.goal,
        resources: roadmap.resources,
        stages: roadmap.stages,
        userId: dbUser.id,
      },
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("Error creating roadmap:", error);
    return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST to generate a roadmap.",
  });
}

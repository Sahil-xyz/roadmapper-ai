
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    console.log("User ID:", userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const roadmaps = await prisma.roadmap.findMany({
      where: { user: { clerkId: userId } }, // ✅ fix filtering
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(roadmaps);
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    return NextResponse.json({ error: "Failed to fetch roadmaps" }, { status: 500 });
  }
}

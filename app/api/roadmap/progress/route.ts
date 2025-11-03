import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, stages } = await req.json()

    // Update roadmap progress
    const updated = await prisma.roadmap.update({
      where: { id, userId },
      data: { stages },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating progress:", error)
    return NextResponse.json(
      { error: "Failed to update roadmap progress" },
      { status: 500 }
    )
  }
}

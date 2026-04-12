// This will save the updated roadmap 


import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, title, goal, stages } = await req.json()

    const user = await prisma.user.findUnique({
      where: { clerkId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
    })

    if (!roadmap || roadmap.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const updated = await prisma.roadmap.update({
      where: { id },
      data: {
        title,
        goal,
        stages,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to update roadmap" },
      { status: 500 }
    )
  }
}
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, goal, stages } = await req.json()

    const user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const roadmap = await prisma.roadmap.create({
      data: {
        title,
        goal,
        stages,
        resources: [],
        userId: user.id
      }
    })

    return NextResponse.json(roadmap)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to create roadmap" },
      { status: 500 }
    )
  }
}
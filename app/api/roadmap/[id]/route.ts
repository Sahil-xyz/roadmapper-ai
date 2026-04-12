import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
      include: { user: true }, // optional — to show who owns it
    })

    if (!roadmap) {
      return NextResponse.json({ error: "Roadmap not found" }, { status: 404 })
    }

    return NextResponse.json(roadmap)
  } catch (error) {
    console.error("Error fetching roadmap:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Delete Roadmap

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params

    await prisma.roadmap.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete roadmap error:", error)
    return NextResponse.json(
      { error: "Failed to delete roadmap" },
      { status: 500 }
    )
  }
}
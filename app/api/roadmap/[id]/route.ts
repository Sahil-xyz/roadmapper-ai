import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

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

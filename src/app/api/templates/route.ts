import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const occasion = searchParams.get("occasion");

  try {
    const whereClause: { active: boolean; occasion?: string } = { active: true };
    if (occasion && occasion !== "All") {
      whereClause.occasion = occasion;
    }

    const templates = await prisma.template.findMany({
      where: whereClause,
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ templates });
  } catch (error) {
    console.error("Fetch public templates failed", error);
    return NextResponse.json({ error: "Failed to load templates." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/authz";
import { logActivity } from "@/lib/activity";
import { z } from "zod";

const templateSchema = z.object({
  title: z.string().trim().min(2).max(120),
  occasion: z.string().trim().min(1).max(60),
  subtitle: z.string().trim().max(200).default(""),
  theme: z.enum(["wine", "champagne", "midnight", "blush", "heritage", "minimal", "rose"]).default("wine"),
  sampleHost: z.string().trim().min(2).max(120),
  sampleEvent: z.string().trim().min(2).max(160),
  sampleDate: z.string().trim().max(120).default(""),
  sampleVenue: z.string().trim().max(240).default(""),
  accent: z.string().trim().max(30).default("#D6B574"),
  tag: z.string().trim().max(40).default("Luxury"),
  active: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  const auth = await requireSuperAdmin(request);
  if (auth.response) return auth.response;

  try {
    const templates = await prisma.template.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ templates });
  } catch (error) {
    console.error("Admin fetch templates failed", error);
    return NextResponse.json({ error: "Failed to load admin templates." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireSuperAdmin(request);
  if (auth.response) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = templateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Template details are invalid.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const baseSlug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "custom-template";
  const slug = `${baseSlug}-${Date.now().toString(36)}`;

  try {
    const template = await prisma.template.create({
      data: {
        slug,
        title: data.title,
        occasion: data.occasion,
        subtitle: data.subtitle,
        theme: data.theme,
        sampleHost: data.sampleHost,
        sampleEvent: data.sampleEvent,
        sampleDate: data.sampleDate,
        sampleVenue: data.sampleVenue,
        accent: data.accent,
        tag: data.tag,
        active: data.active,
      },
    });

    await logActivity({
      userId: auth.user.id,
      action: "template_created",
      feature: "admin_templates",
      metadata: { templateId: template.id, occasion: template.occasion, title: template.title },
    });

    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error("Create template failed", error);
    return NextResponse.json({ error: "Failed to create template." }, { status: 500 });
  }
}

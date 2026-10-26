import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/authz";
import { logActivity } from "@/lib/activity";
import { z } from "zod";

type RouteContext = { params: Promise<{ id: string }> };

const templatePatchSchema = z.object({
  title: z.string().trim().min(2).max(120).optional(),
  occasion: z.string().trim().min(1).max(60).optional(),
  subtitle: z.string().trim().max(200).optional(),
  theme: z.enum(["wine", "champagne", "midnight", "blush", "heritage", "minimal", "rose"]).optional(),
  sampleHost: z.string().trim().min(2).max(120).optional(),
  sampleEvent: z.string().trim().min(2).max(160).optional(),
  sampleDate: z.string().trim().max(120).optional(),
  sampleVenue: z.string().trim().max(240).optional(),
  accent: z.string().trim().max(30).optional(),
  tag: z.string().trim().max(40).optional(),
  active: z.boolean().optional(),
});

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const auth = await requireSuperAdmin(request);
  if (auth.response) return auth.response;

  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = templatePatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid update data.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.template.update({
      where: { id },
      data: parsed.data,
    });

    await logActivity({
      userId: auth.user.id,
      action: "template_updated",
      feature: "admin_templates",
      metadata: { templateId: id, changes: Object.keys(parsed.data).join(",") },
    });


    return NextResponse.json({ template: updated });
  } catch (error) {
    console.error("Update template failed", error);
    return NextResponse.json({ error: "Failed to update template." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const auth = await requireSuperAdmin(request);
  if (auth.response) return auth.response;

  const { id } = await params;
  try {
    await prisma.template.delete({ where: { id } });

    await logActivity({
      userId: auth.user.id,
      action: "template_deleted",
      feature: "admin_templates",
      metadata: { templateId: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete template failed", error);
    return NextResponse.json({ error: "Failed to delete template." }, { status: 500 });
  }
}

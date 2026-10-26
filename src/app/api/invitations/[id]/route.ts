import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSameOrigin } from "@/lib/session";
import { currentActiveUser } from "@/lib/authz";
import { logActivity } from "@/lib/activity";
import { invitationSchema } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const user = await currentActiveUser(request);
  if (!user) return NextResponse.json({ error: "Please sign in with an active account." }, { status: 401 });
  const userId = user.id;
  const { id } = await context.params;
  const invitation = await prisma.invitation.findFirst({ where: { id, ownerId: userId } });
  if (!invitation) return NextResponse.json({ error: "Invitation not found." }, { status: 404 });
  return NextResponse.json({ invitation });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const blocked = requireSameOrigin(request);
  if (blocked) return blocked;
  const user = await currentActiveUser(request);
  if (!user) return NextResponse.json({ error: "Please sign in with an active account." }, { status: 401 });
  const userId = user.id;
  const { id } = await context.params;
  const existing = await prisma.invitation.findFirst({ where: { id, ownerId: userId } });
  if (!existing) return NextResponse.json({ error: "Invitation not found." }, { status: 404 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }
  const parsed = invitationSchema.partial().safeParse(body);
  if (!parsed.success || !Object.keys(parsed.data ?? {}).length) {
    return NextResponse.json({ error: "Provide valid invitation fields to update.", details: parsed.success ? undefined : parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const data = parsed.data;
  const invitation = await prisma.invitation.update({
    where: { id },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.occasion !== undefined ? { occasion: data.occasion } : {}),
      ...(data.hostName !== undefined ? { hostName: data.hostName } : {}),
      ...(data.eventDate !== undefined ? { eventDate: data.eventDate ? new Date(data.eventDate) : null } : {}),
      ...(data.venue !== undefined ? { venue: data.venue } : {}),
      ...(data.message !== undefined ? { message: data.message } : {}),
      ...(data.theme !== undefined ? { theme: data.theme } : {}),
      ...(data.published !== undefined ? { published: data.published } : {}),
    },
  });
  await logActivity({ userId, action: data.published === undefined ? "invitation_updated" : data.published ? "invitation_published" : "invitation_unpublished", feature: "invitations", metadata: { invitationId: id, published: invitation.published } });
  return NextResponse.json({ invitation });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const blocked = requireSameOrigin(request);
  if (blocked) return blocked;
  const user = await currentActiveUser(request);
  if (!user) return NextResponse.json({ error: "Please sign in with an active account." }, { status: 401 });
  const userId = user.id;
  const { id } = await context.params;
  const result = await prisma.invitation.deleteMany({ where: { id, ownerId: userId } });
  if (!result.count) return NextResponse.json({ error: "Invitation not found." }, { status: 404 });
  await logActivity({ userId, action: "invitation_deleted", feature: "invitations", metadata: { invitationId: id } });
  return NextResponse.json({ ok: true });
}

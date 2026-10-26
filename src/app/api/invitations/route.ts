import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSameOrigin } from "@/lib/session";
import { currentActiveUser } from "@/lib/authz";
import { logActivity } from "@/lib/activity";
import { invitationSchema } from "@/lib/validation";

function makeSlug() { return randomBytes(9).toString("base64url"); }

export async function GET(request: NextRequest) {
  const user = await currentActiveUser(request);
  if (!user) return NextResponse.json({ error: "Please sign in with an active account." }, { status: 401 });
  const userId = user.id;
  const invitations = await prisma.invitation.findMany({ where: { ownerId: userId }, orderBy: { updatedAt: "desc" } });
  await logActivity({ userId, action: "dashboard_opened", feature: "dashboard", metadata: { invitationCount: invitations.length } });
  return NextResponse.json({ invitations });
}

export async function POST(request: NextRequest) {
  const blocked = requireSameOrigin(request);
  if (blocked) return blocked;
  const user = await currentActiveUser(request);
  if (!user) return NextResponse.json({ error: "Please sign in with an active account." }, { status: 401 });
  const userId = user.id;
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }
  const parsed = invitationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invitation details are invalid.", details: parsed.error.flatten().fieldErrors }, { status: 400 });
  const data = parsed.data;
  try {
    const invitation = await prisma.invitation.create({
      data: {
        ownerId: userId,
        slug: makeSlug(),
        title: data.title,
        occasion: data.occasion,
        hostName: data.hostName,
        eventDate: data.eventDate ? new Date(data.eventDate) : null,
        venue: data.venue,
        message: data.message,
        theme: data.theme,
        published: data.published ?? false,
      },
    });
    await logActivity({ userId, action: "invitation_created", feature: "invitations", metadata: { invitationId: invitation.id, occasion: invitation.occasion, published: invitation.published } });
    return NextResponse.json({ invitation }, { status: 201 });
  } catch (error) {
    console.error("Create invitation failed", error);
    return NextResponse.json({ error: "Could not save invitation." }, { status: 500 });
  }
}

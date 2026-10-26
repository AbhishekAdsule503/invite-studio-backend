import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/authz";
import { requireSameOrigin } from "@/lib/session";
import { logActivity } from "@/lib/activity";

type Context = { params: Promise<{ id: string }> };
const schema = z.object({ status: z.enum(["ACTIVE", "SUSPENDED"]) });
export async function PATCH(request: NextRequest, context: Context) {
  const blocked = requireSameOrigin(request); if (blocked) return blocked;
  const auth = await requireSuperAdmin(request);
  if (auth.response) return auth.response;
  if (!auth.user) return NextResponse.json({ error: "Super Admin access required." }, { status: 403 });
  const { id } = await context.params;
  if (id === auth.user.id) return NextResponse.json({ error: "You cannot change your own account status." }, { status: 400 });
  let body: unknown; try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }
  const parsed = schema.safeParse(body); if (!parsed.success) return NextResponse.json({ error: "Choose ACTIVE or SUSPENDED." }, { status: 400 });
  const target = await prisma.user.findUnique({ where: { id }, select: { id: true, role: true } });
  if (!target) return NextResponse.json({ error: "User not found." }, { status: 404 });
  if (target.role === "SUPER_ADMIN") return NextResponse.json({ error: "Super Admin accounts cannot be suspended here." }, { status: 403 });
  const updated = await prisma.user.update({ where: { id }, data: { status: parsed.data.status }, select: { id: true, name: true, email: true, status: true } });
  await logActivity({ userId: auth.user.id, action: "user_status_changed", feature: "admin", metadata: { targetUserId: id, status: updated.status } });
  return NextResponse.json({ user: updated });
}

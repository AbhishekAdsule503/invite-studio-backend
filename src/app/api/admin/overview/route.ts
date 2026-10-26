import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/authz";

export async function GET(request: NextRequest) {
  const auth = await requireSuperAdmin(request); if (auth.response) return auth.response;
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [totalUsers, verifiedUsers, suspendedUsers, totalInvitations, publishedInvitations, activeUserIds, recentEvents, users] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { phoneVerified: true } }),
    prisma.user.count({ where: { status: "SUSPENDED" } }),
    prisma.invitation.count(),
    prisma.invitation.count({ where: { published: true } }),
    prisma.activityEvent.findMany({ where: { createdAt: { gte: sevenDaysAgo }, userId: { not: null } }, distinct: ["userId"], select: { userId: true } }),
    prisma.activityEvent.findMany({ take: 100, orderBy: { createdAt: "desc" }, include: { user: { select: { id: true, name: true, email: true, phone: true } } } }),
    prisma.user.findMany({ take: 100, orderBy: { createdAt: "desc" }, select: { id: true, name: true, email: true, phone: true, phoneVerified: true, role: true, status: true, createdAt: true, _count: { select: { invitations: true } } } }),
  ]);
  const featureCounts = await prisma.activityEvent.groupBy({ by: ["feature"], _count: { _all: true }, orderBy: { _count: { feature: "desc" } }, take: 10 });
  return NextResponse.json({ metrics: { totalUsers, verifiedUsers, suspendedUsers, totalInvitations, publishedInvitations, activeUsers7d: activeUserIds.length }, users, recentEvents, featureCounts });
}

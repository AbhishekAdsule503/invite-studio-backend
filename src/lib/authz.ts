import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserIdFromRequest } from "@/lib/session";

export async function currentActiveUser(request: NextRequest) {
  const userId = await getSessionUserIdFromRequest(request);
  if (!userId) return null;
  return prisma.user.findFirst({
    where: { id: userId, status: "ACTIVE" },
    select: { id: true, name: true, email: true, phone: true, phoneVerified: true, role: true, status: true },
  });
}

export function getDesignatedSuperAdminEmail(): string {
  return (process.env.SUPER_ADMIN_EMAIL || "0808ci221006.ies@ipsacademy.org").trim().toLowerCase();
}

export function isDesignatedSuperAdmin(email?: string | null): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === getDesignatedSuperAdminEmail();
}

export async function requireSuperAdmin(request: NextRequest) {
  const user = await currentActiveUser(request);
  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Please sign in with an active account." }, { status: 401 }),
    };
  }

  const designatedEmail = getDesignatedSuperAdminEmail();
  const userEmail = user.email.trim().toLowerCase();

  // Strictly enforce that only the single designated email with role SUPER_ADMIN can access
  if (user.role !== "SUPER_ADMIN" || userEmail !== designatedEmail) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Access denied. Only the sole designated Super Admin can access this panel." },
        { status: 403 }
      ),
    };
  }

  return { user, response: null };
}


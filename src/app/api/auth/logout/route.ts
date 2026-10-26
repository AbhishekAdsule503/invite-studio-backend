import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, requireSameOrigin } from "@/lib/session";

export async function POST(request: NextRequest) {
  const blocked = requireSameOrigin(request);
  if (blocked) return blocked;
  return clearSessionCookie(NextResponse.json({ ok: true }));
}

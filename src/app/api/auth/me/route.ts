import { NextRequest, NextResponse } from "next/server";
import { currentActiveUser } from "@/lib/authz";
export async function GET(request: NextRequest) {
  const user = await currentActiveUser(request);
  return NextResponse.json({ user });
}

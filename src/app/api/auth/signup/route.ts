import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({ error: "Password registration is disabled. Use /login to register with mobile OTP." }, { status: 410 });
}

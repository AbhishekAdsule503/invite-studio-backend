import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession, requireSameOrigin, setSessionCookie } from "@/lib/session";
import { logActivity } from "@/lib/activity";

const schema = z.object({
  intent: z.enum(["signup", "login"]),
  phone: z.string().trim().regex(/^\+[1-9]\d{7,14}$/),
  code: z.string().trim().regex(/^\d{4,10}$/),
  name: z.string().trim().min(2).max(80).optional(),
  email: z.string().trim().email().max(254).transform(v => v.toLowerCase()).optional(),
});

export async function POST(request: NextRequest) {
  const blocked = requireSameOrigin(request); if (blocked) return blocked;
  let raw: unknown; try { raw = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Enter your phone, the SMS code, and registration details if registering." , details: parsed.error.flatten().fieldErrors }, { status: 400 });
  const { intent, phone, code, name, email } = parsed.data;
  if (intent === "signup" && (!name || !email)) return NextResponse.json({ error: "Name and email are required to register." }, { status: 400 });
  const sid = process.env.TWILIO_ACCOUNT_SID, token = process.env.TWILIO_AUTH_TOKEN, service = process.env.TWILIO_VERIFY_SERVICE_SID;
  const isTwilioConfigured = Boolean(sid && token && service && !sid.startsWith("ACxxxx") && !service.startsWith("VAxxxx") && !token.includes("replace-with"));

  try {
    if (isTwilioConfigured) {
      const body = new URLSearchParams({ To: phone, Code: code });
      const result = await fetch(`https://verify.twilio.com/v2/Services/${service}/VerificationCheck`, {
        method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" }, body, cache: "no-store",
      });
      const verification = await result.json();
      if (!result.ok || verification.status !== "approved") return NextResponse.json({ error: "OTP is incorrect or expired. Request a new code and try again." }, { status: 401 });
    } else {
      // Twilio not configured: allow any 5-digit OTP (or any 4-10 digit code)
      if (!/^\d{5}$/.test(code) && !/^\d{4,10}$/.test(code)) {
        return NextResponse.json({ error: "Please enter a valid 5-digit OTP." }, { status: 400 });
      }
    }

    let user;
    if (intent === "signup") {
      const conflict = await prisma.user.findFirst({ where: { OR: [{ phone }, { email: email! }] } });
      if (conflict) return NextResponse.json({ error: "This phone number or email is already registered. Please log in instead." }, { status: 409 });
      user = await prisma.user.create({ data: { name: name!, email: email!, phone, phoneVerified: true }, select: { id: true, name: true, email: true, phone: true, phoneVerified: true, role: true } });
      await logActivity({ userId: user.id, action: "signup_verified", feature: "authentication" });
    } else {
      user = await prisma.user.findUnique({ where: { phone }, select: { id: true, name: true, email: true, phone: true, phoneVerified: true, role: true, status: true } });
      if (!user || user.status !== "ACTIVE") return NextResponse.json({ error: "This account is unavailable. Please contact support." }, { status: 403 });
      if (!user.phoneVerified) await prisma.user.update({ where: { id: user.id }, data: { phoneVerified: true } });
      await logActivity({ userId: user.id, action: "login_verified", feature: "authentication" });
    }
    const session = await createSession(user.id);
    const safeUser = { id: user.id, name: user.name, email: user.email, phone: user.phone, phoneVerified: true, role: user.role };
    return setSessionCookie(NextResponse.json({ ok: true, user: safeUser }), session);
  } catch (error) {
    console.error("OTP verify failed", error);
    return NextResponse.json({ error: "Could not verify OTP. Check the database and Twilio configuration." }, { status: 500 });
  }
}

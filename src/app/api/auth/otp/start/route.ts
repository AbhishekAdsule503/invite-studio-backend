import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSameOrigin } from "@/lib/session";
import { logActivity } from "@/lib/activity";

const schema = z.object({
  intent: z.enum(["signup", "login"]),
  name: z.string().trim().min(2).max(80).optional(),
  email: z.string().trim().email().max(254).transform(v => v.toLowerCase()).optional(),
  phone: z.string().trim().regex(/^\+[1-9]\d{7,14}$/, "Use international format, e.g. +919876543210"),
});

export async function POST(request: NextRequest) {
  const blocked = requireSameOrigin(request); if (blocked) return blocked;
  let raw: unknown; try { raw = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid name, email, and phone number. Phone must include country code." , details: parsed.error.flatten().fieldErrors }, { status: 400 });
  const { intent, name, email, phone } = parsed.data;
  if (intent === "signup" && (!name || !email)) return NextResponse.json({ error: "Name, email, and phone are required to register." }, { status: 400 });
  const sid = process.env.TWILIO_ACCOUNT_SID, token = process.env.TWILIO_AUTH_TOKEN, service = process.env.TWILIO_VERIFY_SERVICE_SID;
  const isTwilioConfigured = Boolean(sid && token && service && !sid.startsWith("ACxxxx") && !service.startsWith("VAxxxx") && !token.includes("replace-with"));

  try {
    if (intent === "signup") {
      const existing = await prisma.user.findFirst({ where: { OR: [{ phone }, { email: email! }] }, select: { phone: true, email: true } });
      if (existing) return NextResponse.json({ error: "This phone number or email is already registered. Choose Login instead." }, { status: 409 });
    } else {
      const existing = await prisma.user.findUnique({ where: { phone }, select: { id: true, status: true } });
      if (!existing) return NextResponse.json({ error: "No account found for this phone number. Please register first." }, { status: 404 });
      if (existing.status !== "ACTIVE") return NextResponse.json({ error: "This account is suspended. Contact support." }, { status: 403 });
    }

    if (isTwilioConfigured) {
      const body = new URLSearchParams({ To: phone, Channel: "sms" });
      const result = await fetch(`https://verify.twilio.com/v2/Services/${service}/Verifications`, {
        method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" }, body, cache: "no-store",
      });
      const data = await result.json();
      if (!result.ok) {
        console.error("Twilio Verify start failed", { status: result.status, code: data.code });
        return NextResponse.json({ error: "Could not send SMS OTP. Check the phone number and Twilio Verify configuration." }, { status: 502 });
      }
      await logActivity({ action: "otp_requested", feature: "authentication", metadata: { intent } });
      return NextResponse.json({ ok: true, message: "OTP sent by SMS. It expires shortly; request another only after the resend wait." });
    }

    // Twilio not configured: allow any 5-digit OTP
    await logActivity({ action: "otp_requested", feature: "authentication", metadata: { intent, devMode: true } });
    return NextResponse.json({ ok: true, message: "Twilio not configured: Enter any 5-digit OTP to continue." });
  } catch (error) {
    console.error("OTP start failed", error);
    return NextResponse.json({ error: "Could not start phone verification." }, { status: 500 });
  }
}

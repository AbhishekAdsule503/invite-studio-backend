import { prisma } from "@/lib/prisma";

/** Store minimal product analytics. Never pass passwords, OTPs, tokens, or full invitation message text. */
export async function logActivity(input: {
  userId?: string | null;
  action: string;
  feature: string;
  metadata?: Record<string, string | number | boolean | null>;
}) {
  try {
    await prisma.activityEvent.create({
      data: {
        userId: input.userId ?? null,
        action: input.action.slice(0, 80),
        feature: input.feature.slice(0, 80),
        metadata: input.metadata ?? undefined,
      },
    });
  } catch (error) {
    // Analytics should not break the primary user action; report only a server-side error.
    console.error("Activity event could not be recorded", error);
  }
}

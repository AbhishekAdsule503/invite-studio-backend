import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { logActivity } from "@/lib/activity";
import PublicInvitationClient from "./PublicInvitationClient";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await prisma.invitation.findFirst({
    where: { slug, published: true },
    select: { title: true, hostName: true, occasion: true },
  });

  if (!invitation) return { title: "Invitation Not Found — Invite Studio" };

  return {
    title: `${invitation.title} — ${invitation.hostName}`,
    description: `You are cordially invited by ${invitation.hostName} to ${invitation.title}. View event details, schedule, venue, download as PNG, and RSVP online.`,
    openGraph: {
      title: `${invitation.title} | Invite Studio`,
      description: `${invitation.hostName} invites you to celebrate.`,
    },
  };
}

export default async function PublicInvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const invitation = await prisma.invitation.findFirst({ where: { slug, published: true } });

  if (!invitation) notFound();

  await logActivity({
    action: "public_invitation_viewed",
    feature: "public_invitation",
    metadata: { slug: invitation.slug, occasion: invitation.occasion },
  });

  const formattedDate = invitation.eventDate
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }).format(invitation.eventDate)
    : null;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://invitestudio.com";

  const themePalettes: Record<
    string,
    {
      background: string;
      surface: string;
      color: string;
      accent: string;
      accentLight: string;
      border: string;
      sealBg: string;
      isDark: boolean;
    }
  > = {
    wine: {
      background: "#2A0D19",
      surface: "#3A1424",
      color: "#FAF6EF",
      accent: "#D6B574",
      accentLight: "rgba(214, 181, 116, 0.16)",
      border: "rgba(214, 181, 116, 0.65)",
      sealBg: "#4D1A30",
      isDark: true,
    },
    champagne: {
      background: "#F5ECE1",
      surface: "#FCF8F2",
      color: "#382C1E",
      accent: "#B88E3E",
      accentLight: "rgba(184, 142, 62, 0.18)",
      border: "rgba(184, 142, 62, 0.45)",
      sealBg: "#FFFFFF",
      isDark: false,
    },
    midnight: {
      background: "#080F1A",
      surface: "#0E1A2B",
      color: "#F2EADA",
      accent: "#E2C485",
      accentLight: "rgba(226, 196, 133, 0.2)",
      border: "rgba(226, 196, 133, 0.6)",
      sealBg: "#15263F",
      isDark: true,
    },
    blush: {
      background: "#F6ECE8",
      surface: "#F8EEEA",
      color: "#4A222B",
      accent: "#8C324E",
      accentLight: "rgba(140, 50, 78, 0.14)",
      border: "rgba(140, 50, 78, 0.4)",
      sealBg: "#FFFFFF",
      isDark: false,
    },
    heritage: {
      background: "#F4E3D7",
      surface: "#FDF4ED",
      color: "#4C2619",
      accent: "#B86638",
      accentLight: "rgba(184, 102, 56, 0.18)",
      border: "rgba(184, 102, 56, 0.45)",
      sealBg: "#FFFFFF",
      isDark: false,
    },
    rose: {
      background: "#F7EAEF",
      surface: "#F9ECEF",
      color: "#3D242B",
      accent: "#C27B8A",
      accentLight: "rgba(194, 123, 138, 0.18)",
      border: "rgba(194, 123, 138, 0.45)",
      sealBg: "#FFFFFF",
      isDark: false,
    },
    minimal: {
      background: "#F2EFE8",
      surface: "#FAF6EF",
      color: "#252329",
      accent: "#651E32",
      accentLight: "rgba(101, 30, 50, 0.12)",
      border: "rgba(101, 30, 50, 0.35)",
      sealBg: "#FFFFFF",
      isDark: false,
    },
    classic: {
      background: "#F2EFE8",
      surface: "#FAF6EF",
      color: "#252329",
      accent: "#D6B574",
      accentLight: "rgba(214, 181, 116, 0.18)",
      border: "rgba(214, 181, 116, 0.45)",
      sealBg: "#FFFFFF",
      isDark: false,
    },
  };

  const colors = themePalettes[invitation.theme] ?? themePalettes.wine;

  const invitationData = {
    id: invitation.id,
    slug: invitation.slug,
    title: invitation.title,
    occasion: invitation.occasion,
    hostName: invitation.hostName,
    eventDate: invitation.eventDate ? invitation.eventDate.toISOString() : null,
    venue: invitation.venue,
    message: invitation.message,
    theme: invitation.theme,
  };

  return (
    <PublicInvitationClient
      invitation={invitationData}
      colors={colors}
      formattedDate={formattedDate}
      appUrl={appUrl}
    />
  );
}

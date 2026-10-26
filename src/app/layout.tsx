import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invite Studio — Luxury Digital Invitations & Celebration Suite",
  description: "Create bespoke, editorial-grade digital invitations for weddings, birthdays, anniversaries, and grand celebrations. Share instantly via WhatsApp and private links.",
  keywords: ["digital invitations", "wedding invitations", "birthday invites", "online RSVP", "Invite Studio", "luxury invitations"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

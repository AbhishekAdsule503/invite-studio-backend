"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Check,
  Copy,
  Download,
  Mail,
  MapPin,
  MessageCircle,
  RefreshCw,
  Share2,
  Sparkles,
} from "lucide-react";
import { downloadInvitationPng, shareInvitationWithImage } from "@/lib/export-image";
import { InvitationCard } from "@/components/InvitationCard";

interface InvitationData {

  id: string;
  slug: string;
  title: string;
  occasion: string;
  hostName: string;
  eventDate: string | null;
  venue: string;
  message: string;
  theme: string;
}

interface Palette {
  background: string;
  surface: string;
  color: string;
  accent: string;
  accentLight: string;
  border: string;
  sealBg: string;
  isDark: boolean;
}

export default function PublicInvitationClient({
  invitation,
  colors,
  formattedDate,
  appUrl,
}: {
  invitation: InvitationData;
  colors: Palette;
  formattedDate: string | null;
  appUrl: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const invitationUrl = `${appUrl}/invite/${invitation.slug}`;
  const shareText = `${invitation.title}\n${invitation.hostName} warmly invite you.\n${formattedDate ? `Date: ${formattedDate}\n` : ""}${invitation.venue ? `Venue: ${invitation.venue}\n` : ""}\n${invitation.message ? `“${invitation.message}”\n\n` : ""}View details & RSVP: ${invitationUrl}`;

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  async function handleDownloadPng() {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      await downloadInvitationPng(cardRef.current, invitation.title, 2.5);
      showFeedback("High-resolution PNG downloaded!");
    } catch (err) {
      console.error("Export error", err);
      showFeedback("Failed to export image. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }

  async function handleWhatsAppShare() {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      // Try native Web Share API (which on supported mobile browsers attaches the PNG image directly)
      const res = await shareInvitationWithImage(
        cardRef.current,
        {
          title: invitation.title,
          text: shareText,
          url: invitationUrl,
        },
        2.5
      );

      if (res.sharedViaNative) {
        showFeedback("Shared successfully!");
      } else if (res.downloaded) {
        showFeedback("PNG saved to device! Opening WhatsApp...");
        // Open WhatsApp web / mobile with text and invitation link
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
      }
    } catch (err) {
      console.error("Share error", err);
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    } finally {
      setIsExporting(false);
    }
  }

  async function handleEmailShare() {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      // Download PNG so user has the card ready to attach if desired
      await downloadInvitationPng(cardRef.current, invitation.title, 2.5);
      showFeedback("PNG saved! Opening email client...");
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(invitation.title)}&body=${encodeURIComponent(shareText)}`;
      window.location.href = mailtoUrl;
    } catch (err) {
      console.error("Email export error", err);
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(invitation.title)}&body=${encodeURIComponent(shareText)}`;
      window.location.href = mailtoUrl;
    } finally {
      setIsExporting(false);
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopied(true);
      showFeedback("Invitation link copied to clipboard!");
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Invitation link:", invitationUrl);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        display: "grid",
        placeItems: "center",
        padding: "clamp(24px, 5vw, 60px) 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 680, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Toast / Feedback Notice */}
        {feedback && (
          <div
            role="status"
            style={{
              padding: "12px 20px",
              borderRadius: 14,
              backgroundColor: "var(--pure-white)",
              color: "var(--rich-burgundy)",
              border: "1px solid var(--border-gold)",
              boxShadow: "var(--shadow-md)",
              fontSize: "0.88rem",
              fontWeight: 700,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Check size={16} color="var(--rich-burgundy)" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Action Bar (Top) */}
        <div
          style={{
            backgroundColor: "var(--pure-white)",
            borderRadius: 18,
            padding: "14px 20px",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--light-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={16} color="var(--champagne-gold)" />
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--rich-burgundy)" }}>
              {invitation.occasion} Invitation
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {/* Download PNG Button */}
            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="btn btn-gold btn-sm"
              style={{ gap: 6 }}
              title="Save as 2.5x High-Resolution PNG"
            >
              {isExporting ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
              <span>Download PNG</span>
            </button>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="btn btn-secondary btn-sm"
              style={{ gap: 6 }}
              title="Copy public invitation link"
            >
              {copied ? <Check size={14} color="var(--rich-burgundy)" /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy Link"}</span>
            </button>
          </div>
        </div>

        {/* ================= INVITATION CARD (TARGET FOR PNG EXPORT) ================= */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <InvitationCard
            ref={cardRef}
            data={{
              title: invitation.title,
              occasion: invitation.occasion,
              hostName: invitation.hostName,
              eventDate: invitation.eventDate,
              venue: invitation.venue,
              message: invitation.message,
              theme: invitation.theme,
            }}
          />
        </div>

        {/* Action Share Buttons Suite (Bottom) */}
        <div
          style={{
            backgroundColor: "var(--pure-white)",
            borderRadius: 20,
            padding: "22px 24px",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--light-border)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--rich-burgundy)", textAlign: "center" }}>
            Share & RSVP Options
          </div>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
            {/* WhatsApp Share with PNG generation */}
            <button
              onClick={handleWhatsAppShare}
              disabled={isExporting}
              className="btn btn-primary"
              style={{ padding: "12px 22px", fontSize: "0.9rem", gap: 8 }}
            >
              <MessageCircle size={17} />
              <span>Share on WhatsApp</span>
            </button>

            {/* Email Share with PNG generation */}
            <button
              onClick={handleEmailShare}
              disabled={isExporting}
              className="btn btn-secondary"
              style={{ padding: "12px 22px", fontSize: "0.9rem", gap: 8 }}
            >
              <Mail size={17} />
              <span>Share via Email</span>
            </button>

            {/* Direct PNG Download */}
            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="btn btn-gold"
              style={{ padding: "12px 22px", fontSize: "0.9rem", gap: 8 }}
            >
              <Download size={17} />
              <span>Download PNG Image</span>
            </button>
          </div>

          <div style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--muted-taupe)" }}>
            Need your own invitation?{" "}
            <Link href="/" style={{ color: "var(--rich-burgundy)", fontWeight: 700, textDecoration: "none" }}>
              Create an invitation on Invite Studio →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

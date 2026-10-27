import React from "react";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import {
  PinkLotusGaneshLayout,
  AquaFloralEngagementLayout,
  LavenderWisteriaWeddingLayout,
  MarathiGodBharaiLayout,
  MarigoldHaldiLayout,
  ChampagneWalimaLayout,
  BurgundyEmbossedLayout,
  BurgundyRoyalNikahLayout,
  RoyalMughalWeddingLayout,
  MidnightCelestialWeddingLayout,
  MinimalEditorialWeddingLayout,
  RoseGardenEngagementLayout,
  PearlAnniversaryLayout,
  RoyalReceptionLayout,
} from "./templates-extended";

export interface InvitationCardData {
  title: string;
  occasion: string;
  hostName?: string;
  host?: string;
  eventDate?: string | Date | null;
  date?: string | Date | null;
  time?: string | null;
  venue?: string;
  message?: string;
  theme?: string;
  templateSlug?: string;
  badge?: string;
  familyName?: string;
  brideName?: string;
  groomName?: string;
  devotionalHeading?: string;
  ceremonyDetails?: string;
}


export interface PaletteConfig {
  bg: string;
  surface: string;
  color: string;
  accent: string;
  accentLight: string;
  border: string;
  isDark: boolean;
}

export const THEME_PALETTES: Record<string, PaletteConfig> = {
  wine: {
    bg: "#2A0D19",
    surface: "#3A1424",
    color: "#FAF6EF",
    accent: "#D6B574",
    accentLight: "rgba(214, 181, 116, 0.16)",
    border: "rgba(214, 181, 116, 0.65)",
    isDark: true,
  },
  champagne: {
    bg: "#F5ECE1",
    surface: "#FCF8F2",
    color: "#382C1E",
    accent: "#B88E3E",
    accentLight: "rgba(184, 142, 62, 0.18)",
    border: "rgba(184, 142, 62, 0.45)",
    isDark: false,
  },
  midnight: {
    bg: "#080F1A",
    surface: "#0E1A2B",
    color: "#F2EADA",
    accent: "#E2C485",
    accentLight: "rgba(226, 196, 133, 0.2)",
    border: "rgba(226, 196, 133, 0.6)",
    isDark: true,
  },
  blush: {
    bg: "#F6ECE8",
    surface: "#F8EEEA",
    color: "#4A222B",
    accent: "#8C324E",
    accentLight: "rgba(140, 50, 78, 0.14)",
    border: "rgba(140, 50, 78, 0.4)",
    isDark: false,
  },
  heritage: {
    bg: "#F4E3D7",
    surface: "#FDF4ED",
    color: "#4C2619",
    accent: "#B86638",
    accentLight: "rgba(184, 102, 56, 0.18)",
    border: "rgba(184, 102, 56, 0.45)",
    isDark: false,
  },
  minimal: {
    bg: "#F2EFE8",
    surface: "#FAF6EF",
    color: "#252329",
    accent: "#651E32",
    accentLight: "rgba(101, 30, 50, 0.12)",
    border: "rgba(101, 30, 50, 0.35)",
    isDark: false,
  },
  rose: {
    bg: "#F7EAEF",
    surface: "#F9ECEF",
    color: "#3D242B",
    accent: "#C27B8A",
    accentLight: "rgba(194, 123, 138, 0.18)",
    border: "rgba(194, 123, 138, 0.45)",
    isDark: false,
  },
  classic: {
    bg: "#F2EFE8",
    surface: "#FAF6EF",
    color: "#252329",
    accent: "#D6B574",
    accentLight: "rgba(214, 181, 116, 0.18)",
    border: "rgba(214, 181, 116, 0.45)",
    isDark: false,
  },
  lotus: {
    bg: "#F5ECE1",
    surface: "#FAF3E7",
    color: "#382B2A",
    accent: "#AD8745",
    accentLight: "rgba(173, 135, 69, 0.16)",
    border: "rgba(173, 135, 69, 0.65)",
    isDark: false,
  },
  nikah: {
    bg: "#F2EBE5",
    surface: "#F8F0EA",
    color: "#3B2025",
    accent: "#A77C43",
    accentLight: "rgba(167, 124, 67, 0.16)",
    border: "rgba(167, 124, 67, 0.55)",
    isDark: false,
  },
  aqua: {
    bg: "#E8F4F7",
    surface: "#F4FAFA",
    color: "#1E353B",
    accent: "#C9A45C",
    accentLight: "rgba(201, 164, 92, 0.18)",
    border: "rgba(201, 164, 92, 0.6)",
    isDark: false,
  },
  wisteria: {
    bg: "#F3EEF8",
    surface: "#FAF6FC",
    color: "#342240",
    accent: "#B88E3E",
    accentLight: "rgba(184, 142, 62, 0.18)",
    border: "rgba(184, 142, 62, 0.55)",
    isDark: false,
  },
  marathi: {
    bg: "#F5EFE6",
    surface: "#FCF8F2",
    color: "#3D261C",
    accent: "#B87A4F",
    accentLight: "rgba(184, 122, 79, 0.18)",
    border: "rgba(184, 122, 79, 0.6)",
    isDark: false,
  },
  haldi: {
    bg: "#FCF6E8",
    surface: "#FFFDF6",
    color: "#3D2B10",
    accent: "#D69F3D",
    accentLight: "rgba(214, 159, 61, 0.22)",
    border: "rgba(214, 159, 61, 0.65)",
    isDark: false,
  },
  walima: {
    bg: "#F3EDE5",
    surface: "#F9F5EE",
    color: "#2C2620",
    accent: "#C2A368",
    accentLight: "rgba(194, 163, 104, 0.18)",
    border: "rgba(194, 163, 104, 0.55)",
    isDark: false,
  },
  embossed: {
    bg: "#F2ECE6",
    surface: "#FAF6F0",
    color: "#341E25",
    accent: "#8B263E",
    accentLight: "rgba(139, 38, 62, 0.15)",
    border: "rgba(139, 38, 62, 0.45)",
    isDark: false,
  },
  celestial: {
    bg: "#080F1E",
    surface: "#0F1A2E",
    color: "#FAF6EE",
    accent: "#E2C485",
    accentLight: "rgba(226, 196, 133, 0.18)",
    border: "rgba(226, 196, 133, 0.6)",
    isDark: true,
  },
  mughal: {
    bg: "#F4EDE2",
    surface: "#FAF4EB",
    color: "#3B2A1E",
    accent: "#AD8745",
    accentLight: "rgba(173, 135, 69, 0.18)",
    border: "rgba(173, 135, 69, 0.65)",
    isDark: false,
  },
  reception: {
    bg: "#2A0D19",
    surface: "#3A1424",
    color: "#FAF6EF",
    accent: "#D6B574",
    accentLight: "rgba(214, 181, 116, 0.2)",
    border: "rgba(214, 181, 116, 0.65)",
    isDark: true,
  },
};



export function formatDateTime(dateVal?: string | Date | null, timeVal?: string | null): { dateStr: string | null; timeStr: string | null; full: string | null } {
  if (!dateVal && !timeVal) return { dateStr: null, timeStr: null, full: null };

  let datePart: string | null = null;
  let timePart: string | null = null;

  if (typeof dateVal === "string") {
    const trimmed = dateVal.trim();
    // Check if it's datetime-local format: "YYYY-MM-DDTHH:mm"
    if (trimmed.includes("T")) {
      const [d, t] = trimmed.split("T");
      if (d) {
        const [y, m, day] = d.split("-").map(Number);
        if (y && m && day) {
          const localDate = new Date(y, m - 1, day);
          datePart = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(localDate);
        }
      }
      if (t) {
        const [h, min] = t.split(":").map(Number);
        if (!isNaN(h) && !isNaN(min)) {
          const dummy = new Date(2000, 0, 1, h, min);
          timePart = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }).format(dummy);
        }
      }
    } else if (trimmed.includes("-") && trimmed.length === 10) {
      // "YYYY-MM-DD"
      const [y, m, day] = trimmed.split("-").map(Number);
      if (y && m && day) {
        const localDate = new Date(y, m - 1, day);
        datePart = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(localDate);
      }
    } else {
      const parsed = new Date(trimmed);
      if (!isNaN(parsed.getTime())) {
        datePart = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(parsed);
        timePart = new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(parsed);
      } else {
        datePart = trimmed;
      }
    }
  } else if (dateVal instanceof Date && !isNaN(dateVal.getTime())) {
    datePart = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateVal);
    timePart = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(dateVal);
  }

  // Explicit time override if timeVal provided
  if (timeVal) {
    const tTrim = timeVal.trim();
    if (tTrim.includes(":")) {
      const [h, min] = tTrim.split(":").map(Number);
      if (!isNaN(h) && !isNaN(min)) {
        const dummy = new Date(2000, 0, 1, h, min);
        timePart = new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(dummy);
      } else {
        timePart = tTrim;
      }
    } else {
      timePart = tTrim;
    }
  }

  const full = datePart && timePart ? `${datePart} at ${timePart}` : datePart || timePart || null;
  return { dateStr: datePart, timeStr: timePart, full };
}

export function formatDate(dateVal?: string | Date | null, timeVal?: string | null) {
  return formatDateTime(dateVal, timeVal).full;
}

/**
 * 1. WEDDING DESIGN FAMILY:
 * Regal editorial typography, ornamental arched borders, filigree corner motifs, gold foiled dual divider
 */
function WeddingLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 620,
        backgroundColor: palette.surface,
        color: palette.color,
        borderRadius: 24,
        padding: "clamp(36px, 6vw, 56px) clamp(28px, 5vw, 48px)",
        textAlign: "center",
        boxShadow: palette.isDark ? "0 25px 60px rgba(0,0,0,0.6)" : "0 25px 55px rgba(58,20,36,0.12)",
        border: `2px solid ${palette.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Intricate Inner Arch Inset */}
      <div
        style={{
          position: "absolute",
          inset: 14,
          border: `1px solid ${palette.border}`,
          borderRadius: 18,
          pointerEvents: "none",
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 18,
          border: `1px dashed ${palette.border}`,
          borderRadius: 14,
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />

      {/* Luxury Corner Ornaments */}
      <span style={{ position: "absolute", top: 22, left: 24, color: palette.accent, fontSize: "1.1rem" }}>❦</span>
      <span style={{ position: "absolute", top: 22, right: 24, color: palette.accent, fontSize: "1.1rem" }}>❧</span>
      <span style={{ position: "absolute", bottom: 22, left: 24, color: palette.accent, fontSize: "1.1rem" }}>❧</span>
      <span style={{ position: "absolute", bottom: 22, right: 24, color: palette.accent, fontSize: "1.1rem" }}>❦</span>

      {/* Top Header */}
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.75rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: palette.accent,
            fontWeight: 700,
            marginBottom: 16,
            fontFamily: "Cinzel, var(--font-serif)",
          }}
        >
          <span>✦</span>
          <span>THE WEDDING CELEBRATION</span>
          <span>✦</span>
        </div>

        <p
          style={{
            fontFamily: "Cormorant Garamond, var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.15rem",
            opacity: 0.9,
            marginBottom: 14,
          }}
        >
          Together with their families & loved ones
        </p>

        {/* Couple Names in Grand Regal Serif */}
        <h1
          style={{
            fontFamily: "Playfair Display, var(--font-serif)",
            fontSize: "clamp(2rem, 4.5vw, 2.9rem)",
            fontWeight: 600,
            lineHeight: 1.18,
            letterSpacing: "-0.01em",
            color: palette.color,
            margin: "10px 0",
            overflowWrap: "anywhere",
          }}
        >
          {data.hostName || "Siddharth & Ananya"}
        </h1>

        {/* Luxury Gold Medallion Divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "16px auto" }}>
          <div style={{ width: 60, height: 1, backgroundColor: palette.accent, opacity: 0.7 }} />
          <span style={{ color: palette.accent, fontSize: "1rem" }}>✦</span>
          <div style={{ width: 60, height: 1, backgroundColor: palette.accent, opacity: 0.7 }} />
        </div>

        <h2
          style={{
            fontFamily: "Cinzel, var(--font-serif)",
            fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: palette.accent,
            marginBottom: 16,
          }}
        >
          {data.title || "Holy Matrimony & Royal Reception"}
        </h2>
      </div>

      {/* Middle: Personal Message */}
      {data.message && (
        <div style={{ padding: "0 clamp(10px, 3vw, 24px)", margin: "12px 0" }}>
          <p
            style={{
              fontFamily: "Cormorant Garamond, var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              lineHeight: 1.65,
              opacity: 0.92,
              whiteSpace: "pre-wrap",
            }}
          >
            “{data.message}”
          </p>
        </div>
      )}

      {/* Bottom: Date & Venue */}
      <div>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: 10,
            padding: "16px 24px",
            borderRadius: 16,
            backgroundColor: palette.accentLight,
            border: `1px solid ${palette.border}`,
            margin: "12px 0 16px",
            width: "min(460px, 100%)",
          }}
        >
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.95rem", fontWeight: 600 }}>
              <Calendar size={16} color={palette.accent} />
              <span>{formattedDate}</span>
            </div>
          )}
          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.9rem", opacity: 0.9 }}>
              <MapPin size={16} color={palette.accent} />
              <span>{data.venue}</span>
            </div>
          )}
        </div>

        <div style={{ fontSize: "0.68rem", letterSpacing: "0.24em", textTransform: "uppercase", color: palette.accent, opacity: 0.85 }}>
          INVITE STUDIO BESPOKE COUTURE
        </div>
      </div>
    </div>
  );
}

/**
 * 2. BIRTHDAY DESIGN FAMILY:
 * Modern celebratory gala style with prominent birthday badge, confetti sparkle typography, and festive hierarchy
 */
function BirthdayLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 580,
        backgroundColor: palette.surface,
        color: palette.color,
        borderRadius: 24,
        padding: "clamp(36px, 6vw, 54px) clamp(24px, 5vw, 44px)",
        textAlign: "center",
        boxShadow: palette.isDark ? "0 25px 60px rgba(0,0,0,0.55)" : "0 25px 50px rgba(58,20,36,0.12)",
        border: `2px solid ${palette.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Decorative Sparkle Highlights */}
      <span style={{ position: "absolute", top: 18, left: 24, color: palette.accent, fontSize: "1.3rem" }}>✨</span>
      <span style={{ position: "absolute", top: 32, right: 30, color: palette.accent, fontSize: "0.9rem" }}>✦</span>
      <span style={{ position: "absolute", bottom: 24, left: 30, color: palette.accent, fontSize: "0.9rem" }}>✦</span>
      <span style={{ position: "absolute", bottom: 18, right: 24, color: palette.accent, fontSize: "1.3rem" }}>🥂</span>

      {/* Top Banner */}
      <div>
        <div
          style={{
            display: "inline-block",
            padding: "6px 20px",
            borderRadius: 999,
            backgroundColor: palette.accentLight,
            border: `1px solid ${palette.border}`,
            fontSize: "0.78rem",
            fontWeight: 800,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: palette.accent,
            marginBottom: 16,
            fontFamily: "Montserrat, var(--font-sans)",
          }}
        >
          ★ CELEBRATION SOIRÉE ★
        </div>

        <p
          style={{
            fontFamily: "Cormorant Garamond, var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.2rem",
            opacity: 0.9,
            marginBottom: 8,
          }}
        >
          Join us for an unforgettable evening in honor of
        </p>

        {/* Honoree / Birthday Star Name */}
        <h1
          style={{
            fontFamily: "Playfair Display, var(--font-serif)",
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            color: palette.color,
            margin: "8px 0 12px",
            overflowWrap: "anywhere",
          }}
        >
          {data.hostName || "Sophia Montgomery"}
        </h1>

        <div style={{ width: 80, height: 3, backgroundColor: palette.accent, margin: "14px auto", borderRadius: 999 }} />

        {/* Event Milestone Title */}
        <h2
          style={{
            fontFamily: "Montserrat, var(--font-sans)",
            fontSize: "clamp(1.2rem, 2.4vw, 1.55rem)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: palette.accent,
            marginBottom: 16,
          }}
        >
          {data.title || "The 30th Birthday Gala"}
        </h2>
      </div>

      {/* Message */}
      {data.message && (
        <div style={{ padding: "0 16px", margin: "10px 0" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.92rem, 1.6vw, 1.05rem)",
              lineHeight: 1.65,
              opacity: 0.9,
              whiteSpace: "pre-wrap",
            }}
          >
            {data.message}
          </p>
        </div>
      )}

      {/* Schedule & Venue Card */}
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 10,
            padding: "16px 24px",
            borderRadius: 16,
            backgroundColor: palette.isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)",
            border: `1px solid ${palette.border}`,
            margin: "12px auto 14px",
            maxWidth: 440,
            textAlign: "center",
          }}
        >
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.95rem", fontWeight: 700 }}>
              <Clock size={16} color={palette.accent} />
              <span>{formattedDate}</span>
            </div>
          )}
          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.88rem", opacity: 0.85 }}>
              <MapPin size={16} color={palette.accent} />
              <span>{data.venue}</span>
            </div>
          )}
        </div>

        <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: palette.accent, opacity: 0.85 }}>
          DRESS CODE: CHIC & GILDED
        </div>
      </div>
    </div>
  );
}

/**
 * 3. ENGAGEMENT DESIGN FAMILY:
 * Romantic script accents, ring motif, intimate intertwined flourishes
 */
function EngagementLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 600,
        backgroundColor: palette.surface,
        color: palette.color,
        borderRadius: 24,
        padding: "clamp(36px, 6vw, 56px) clamp(24px, 5vw, 44px)",
        textAlign: "center",
        boxShadow: palette.isDark ? "0 25px 60px rgba(0,0,0,0.6)" : "0 25px 50px rgba(58,20,36,0.12)",
        border: `2px solid ${palette.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Delicate Double Outline */}
      <div
        style={{
          position: "absolute",
          inset: 16,
          border: `1px solid ${palette.border}`,
          borderRadius: 16,
          pointerEvents: "none",
          opacity: 0.75,
        }}
      />

      <div>
        <div style={{ fontSize: "1.8rem", marginBottom: 6, color: palette.accent }}>💍</div>
        <div
          style={{
            fontFamily: "Cinzel, var(--font-serif)",
            fontSize: "0.78rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: palette.accent,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          TWO HEARTS · ONE PROMISE
        </div>

        <p
          style={{
            fontFamily: "Cormorant Garamond, var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.2rem",
            opacity: 0.9,
            marginBottom: 8,
          }}
        >
          With immense joy, we announce the engagement of
        </p>

        {/* Intimate Couple Names */}
        <h1
          style={{
            fontFamily: "Great Vibes, cursive, var(--font-serif)",
            fontSize: "clamp(2.6rem, 6vw, 3.8rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: palette.accent,
            margin: "12px 0 8px",
            overflowWrap: "anywhere",
          }}
        >
          {data.hostName || "Elena & Marcus"}
        </h1>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "12px auto" }}>
          <div style={{ width: 45, height: 1, backgroundColor: palette.accent, opacity: 0.6 }} />
          <span style={{ fontSize: "0.9rem", color: palette.accent }}>♡</span>
          <div style={{ width: 45, height: 1, backgroundColor: palette.accent, opacity: 0.6 }} />
        </div>

        <h2
          style={{
            fontFamily: "Playfair Display, var(--font-serif)",
            fontSize: "clamp(1.15rem, 2.2vw, 1.4rem)",
            fontWeight: 600,
            letterSpacing: "0.06em",
            marginBottom: 14,
          }}
        >
          {data.title || "The Ring Ceremony & Dinner"}
        </h2>
      </div>

      {data.message && (
        <div style={{ padding: "0 20px", margin: "12px 0" }}>
          <p
            style={{
              fontFamily: "Cormorant Garamond, var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              lineHeight: 1.6,
              opacity: 0.9,
              whiteSpace: "pre-wrap",
            }}
          >
            “{data.message}”
          </p>
        </div>
      )}

      <div>
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 16,
            backgroundColor: palette.accentLight,
            border: `1px solid ${palette.border}`,
            margin: "12px auto 14px",
            maxWidth: 440,
          }}
        >
          {formattedDate && (
            <div style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 4 }}>
              📅 {formattedDate}
            </div>
          )}
          {data.venue && (
            <div style={{ fontSize: "0.88rem", opacity: 0.85 }}>
              📍 {data.venue}
            </div>
          )}
        </div>

        <div style={{ fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: palette.accent }}>
          INVITE STUDIO ROMANTIC SUITE
        </div>
      </div>
    </div>
  );
}

/**
 * 4. ANNIVERSARY DESIGN FAMILY:
 * Timeless milestone badge, laurel leaf wreath filigree, silver/golden jubilee tribute
 */
function AnniversaryLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 600,
        backgroundColor: palette.surface,
        color: palette.color,
        borderRadius: 24,
        padding: "clamp(36px, 6vw, 56px) clamp(24px, 5vw, 44px)",
        textAlign: "center",
        boxShadow: palette.isDark ? "0 25px 60px rgba(0,0,0,0.6)" : "0 25px 50px rgba(58,20,36,0.12)",
        border: `2px solid ${palette.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 14,
          border: `1px solid ${palette.border}`,
          borderRadius: 16,
          pointerEvents: "none",
          opacity: 0.7,
        }}
      />

      <div>
        <div style={{ fontSize: "1.4rem", color: palette.accent, marginBottom: 4 }}>❦ ❦</div>
        <div
          style={{
            fontFamily: "Cinzel, var(--font-serif)",
            fontSize: "0.76rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: palette.accent,
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          A LIFETIME OF DEVOTION
        </div>

        <p
          style={{
            fontFamily: "Cormorant Garamond, var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.2rem",
            opacity: 0.9,
            marginBottom: 8,
          }}
        >
          Celebrating the Wedding Anniversary of
        </p>

        <h1
          style={{
            fontFamily: "Playfair Display, var(--font-serif)",
            fontSize: "clamp(2rem, 4.8vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            margin: "8px 0 10px",
            overflowWrap: "anywhere",
          }}
        >
          {data.hostName || "Kavita & Rajesh Verma"}
        </h1>

        <div style={{ width: 60, height: 1, backgroundColor: palette.accent, margin: "14px auto" }} />

        <h2
          style={{
            fontFamily: "Cinzel, var(--font-serif)",
            fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: palette.accent,
            marginBottom: 14,
          }}
        >
          {data.title || "Silver Jubilee Milestone Celebration"}
        </h2>
      </div>

      {data.message && (
        <div style={{ padding: "0 20px", margin: "10px 0" }}>
          <p
            style={{
              fontFamily: "Cormorant Garamond, var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              lineHeight: 1.6,
              opacity: 0.92,
              whiteSpace: "pre-wrap",
            }}
          >
            “{data.message}”
          </p>
        </div>
      )}

      <div>
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 16,
            backgroundColor: palette.accentLight,
            border: `1px solid ${palette.border}`,
            margin: "12px auto 14px",
            maxWidth: 440,
          }}
        >
          {formattedDate && (
            <div style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 4 }}>
              📅 {formattedDate}
            </div>
          )}
          {data.venue && (
            <div style={{ fontSize: "0.88rem", opacity: 0.85 }}>
              📍 {data.venue}
            </div>
          )}
        </div>

        <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: palette.accent }}>
          INVITE STUDIO HERITAGE MILESTONE
        </div>
      </div>
    </div>
  );
}

/**
 * 5. BABY SHOWER DESIGN FAMILY:
 * Whimsical, warm, gentle nursery curves, playful stars, pastel charm
 */
function BabyShowerLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 580,
        backgroundColor: palette.surface,
        color: palette.color,
        borderRadius: 32,
        padding: "clamp(36px, 6vw, 54px) clamp(24px, 5vw, 44px)",
        textAlign: "center",
        boxShadow: "0 25px 50px rgba(74, 34, 43, 0.08)",
        border: `2px dashed ${palette.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <span style={{ position: "absolute", top: 22, left: 24, fontSize: "1.4rem" }}>🧸</span>
      <span style={{ position: "absolute", top: 22, right: 24, fontSize: "1.4rem" }}>⭐</span>
      <span style={{ position: "absolute", bottom: 22, left: 24, fontSize: "1.4rem" }}>🍼</span>
      <span style={{ position: "absolute", bottom: 22, right: 24, fontSize: "1.4rem" }}>🌙</span>

      <div>
        <div
          style={{
            display: "inline-block",
            padding: "6px 18px",
            borderRadius: 999,
            backgroundColor: palette.accentLight,
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: palette.accent,
            marginBottom: 14,
          }}
        >
          A LITTLE MIRACLE IS ON THE WAY
        </div>

        <p
          style={{
            fontFamily: "Cormorant Garamond, var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.15rem",
            opacity: 0.9,
            marginBottom: 6,
          }}
        >
          Please join us for a Baby Shower honouring
        </p>

        <h1
          style={{
            fontFamily: "Playfair Display, var(--font-serif)",
            fontSize: "clamp(2.1rem, 5vw, 3rem)",
            fontWeight: 600,
            lineHeight: 1.2,
            color: palette.color,
            margin: "8px 0 10px",
            overflowWrap: "anywhere",
          }}
        >
          {data.hostName || "Priya & Rohan"}
        </h1>

        <div style={{ fontSize: "1rem", color: palette.accent, margin: "6px auto 12px" }}>☁ ☁ ☁</div>

        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
            fontWeight: 700,
            color: palette.accent,
            marginBottom: 14,
          }}
        >
          {data.title || "Sweet Dreams & Baby Beams"}
        </h2>
      </div>

      {data.message && (
        <div style={{ padding: "0 16px", margin: "10px 0" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.92rem, 1.6vw, 1.05rem)",
              lineHeight: 1.65,
              opacity: 0.9,
              whiteSpace: "pre-wrap",
            }}
          >
            “{data.message}”
          </p>
        </div>
      )}

      <div>
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 20,
            backgroundColor: palette.accentLight,
            border: `1px solid ${palette.border}`,
            margin: "10px auto 14px",
            maxWidth: 440,
          }}
        >
          {formattedDate && (
            <div style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 4 }}>
              📅 {formattedDate}
            </div>
          )}
          {data.venue && (
            <div style={{ fontSize: "0.88rem", opacity: 0.85 }}>
              📍 {data.venue}
            </div>
          )}
        </div>

        <div style={{ fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: palette.accent, opacity: 0.85 }}>
          INVITE STUDIO WHIMSICAL PASTEL
        </div>
      </div>
    </div>
  );
}

/**
 * 6. FESTIVALS & CULTURAL EVENTS:
 * Diya / lantern motifs, radiant symmetrical border, warm opulent heritage tones
 */
function FestivalsLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 600,
        backgroundColor: palette.surface,
        color: palette.color,
        borderRadius: 24,
        padding: "clamp(36px, 6vw, 56px) clamp(24px, 5vw, 44px)",
        textAlign: "center",
        boxShadow: palette.isDark ? "0 25px 60px rgba(0,0,0,0.6)" : "0 25px 50px rgba(58,20,36,0.12)",
        border: `3px double ${palette.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 14,
          border: `1px solid ${palette.border}`,
          borderRadius: 16,
          pointerEvents: "none",
          opacity: 0.8,
        }}
      />

      <div>
        <div style={{ fontSize: "1.6rem", color: palette.accent, marginBottom: 4 }}>🪔 ✦ 🪔</div>
        <div
          style={{
            fontFamily: "Cinzel, var(--font-serif)",
            fontSize: "0.78rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: palette.accent,
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          JOY, LIGHT & ABUNDANCE
        </div>

        <p
          style={{
            fontFamily: "Cormorant Garamond, var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.2rem",
            opacity: 0.9,
            marginBottom: 8,
          }}
        >
          Warmly hosted by
        </p>

        <h1
          style={{
            fontFamily: "Playfair Display, var(--font-serif)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            margin: "8px 0 10px",
            overflowWrap: "anywhere",
          }}
        >
          {data.hostName || "The Kapoor Family"}
        </h1>

        <div style={{ width: 80, height: 2, backgroundColor: palette.accent, margin: "14px auto" }} />

        <h2
          style={{
            fontFamily: "Cinzel, var(--font-serif)",
            fontSize: "clamp(1.15rem, 2.3vw, 1.45rem)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: palette.accent,
            marginBottom: 14,
          }}
        >
          {data.title || "Diwali Feast & Evening of Lights"}
        </h2>
      </div>

      {data.message && (
        <div style={{ padding: "0 20px", margin: "10px 0" }}>
          <p
            style={{
              fontFamily: "Cormorant Garamond, var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              lineHeight: 1.6,
              opacity: 0.92,
              whiteSpace: "pre-wrap",
            }}
          >
            “{data.message}”
          </p>
        </div>
      )}

      <div>
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 16,
            backgroundColor: palette.accentLight,
            border: `1px solid ${palette.border}`,
            margin: "12px auto 14px",
            maxWidth: 440,
          }}
        >
          {formattedDate && (
            <div style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 4 }}>
              📅 {formattedDate}
            </div>
          )}
          {data.venue && (
            <div style={{ fontSize: "0.88rem", opacity: 0.85 }}>
              📍 {data.venue}
            </div>
          )}
        </div>

        <div style={{ fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: palette.accent }}>
          INVITE STUDIO FESTIVE CELEBRATION
        </div>
      </div>
    </div>
  );
}

/**
 * 7. CORPORATE & EXECUTIVE EVENTS:
 * Modernist architectural grid, clean sans-serif typography, crisp prestige layout
 */
function CorporateLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 560,
        backgroundColor: palette.surface,
        color: palette.color,
        borderRadius: 20,
        padding: "clamp(36px, 6vw, 54px) clamp(24px, 5vw, 44px)",
        textAlign: "left",
        boxShadow: palette.isDark ? "0 25px 60px rgba(0,0,0,0.6)" : "0 25px 50px rgba(58,20,36,0.12)",
        border: `2px solid ${palette.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: palette.accent,
              fontFamily: "Montserrat, var(--font-sans)",
            }}
          >
            EXECUTIVE SUMMIT & GALA
          </span>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: palette.accent }} />
        </div>

        <h1
          style={{
            fontFamily: "Playfair Display, var(--font-serif)",
            fontSize: "clamp(2rem, 4.5vw, 2.8rem)",
            fontWeight: 700,
            lineHeight: 1.18,
            color: palette.color,
            margin: "0 0 10px",
            overflowWrap: "anywhere",
          }}
        >
          {data.title || "Annual Innovation & Design Showcase"}
        </h1>

        <div
          style={{
            fontFamily: "Montserrat, var(--font-sans)",
            fontSize: "1rem",
            fontWeight: 600,
            color: palette.accent,
            marginBottom: 16,
          }}
        >
          Presented by {data.hostName || "Studio Arch & Design"}
        </div>

        <div style={{ width: "100%", height: 1, backgroundColor: palette.border, margin: "16px 0" }} />
      </div>

      {data.message && (
        <div style={{ margin: "12px 0" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
              lineHeight: 1.65,
              opacity: 0.9,
              whiteSpace: "pre-wrap",
            }}
          >
            {data.message}
          </p>
        </div>
      )}

      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            padding: "16px",
            borderRadius: 14,
            backgroundColor: palette.accentLight,
            border: `1px solid ${palette.border}`,
            margin: "14px 0",
          }}
        >
          {formattedDate && (
            <div>
              <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: palette.accent, fontWeight: 700 }}>
                SCHEDULE
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, marginTop: 2 }}>{formattedDate}</div>
            </div>
          )}
          {data.venue && (
            <div>
              <div style={{ fontSize: "0.72rem", textTransform: "uppercase", color: palette.accent, fontWeight: 700 }}>
                LOCATION
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, marginTop: 2 }}>{data.venue}</div>
            </div>
          )}
        </div>

        <div style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: palette.accent, opacity: 0.85 }}>
          INVITE STUDIO CORPORATE ATELIER
        </div>
      </div>
    </div>
  );
}

/**
 * 8. HOUSEWARMING & OTHER OCCASIONS:
 * Warm hearth motifs, welcoming floral border, inviting friendly typography
 */
function HousewarmingLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 580,
        backgroundColor: palette.surface,
        color: palette.color,
        borderRadius: 24,
        padding: "clamp(36px, 6vw, 56px) clamp(24px, 5vw, 44px)",
        textAlign: "center",
        boxShadow: palette.isDark ? "0 25px 60px rgba(0,0,0,0.6)" : "0 25px 50px rgba(58,20,36,0.12)",
        border: `2px solid ${palette.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 14,
          border: `1px dashed ${palette.border}`,
          borderRadius: 16,
          pointerEvents: "none",
          opacity: 0.75,
        }}
      />

      <div>
        <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>🏡</div>
        <div
          style={{
            fontFamily: "Montserrat, var(--font-sans)",
            fontSize: "0.76rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: palette.accent,
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          NEW ROOF · NEW BEGINNINGS
        </div>

        <p
          style={{
            fontFamily: "Cormorant Garamond, var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.15rem",
            opacity: 0.9,
            marginBottom: 6,
          }}
        >
          Warmly inviting you to the new home of
        </p>

        <h1
          style={{
            fontFamily: "Playfair Display, var(--font-serif)",
            fontSize: "clamp(2rem, 5vw, 2.9rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            margin: "8px 0 10px",
            overflowWrap: "anywhere",
          }}
        >
          {data.hostName || "The Sharma Family"}
        </h1>

        <div style={{ width: 60, height: 2, backgroundColor: palette.accent, margin: "12px auto" }} />

        <h2
          style={{
            fontFamily: "Montserrat, var(--font-sans)",
            fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
            fontWeight: 700,
            color: palette.accent,
            marginBottom: 14,
          }}
        >
          {data.title || "Housewarming & Griha Pravesh"}
        </h2>
      </div>

      {data.message && (
        <div style={{ padding: "0 20px", margin: "10px 0" }}>
          <p
            style={{
              fontFamily: "Cormorant Garamond, var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              lineHeight: 1.6,
              opacity: 0.92,
              whiteSpace: "pre-wrap",
            }}
          >
            “{data.message}”
          </p>
        </div>
      )}

      <div>
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 16,
            backgroundColor: palette.accentLight,
            border: `1px solid ${palette.border}`,
            margin: "12px auto 14px",
            maxWidth: 440,
          }}
        >
          {formattedDate && (
            <div style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 4 }}>
              📅 {formattedDate}
            </div>
          )}
          {data.venue && (
            <div style={{ fontSize: "0.88rem", opacity: 0.85 }}>
              📍 {data.venue}
            </div>
          )}
        </div>

        <div style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: palette.accent }}>
          INVITE STUDIO BESPOKE HOME
        </div>
      </div>
    </div>
  );
}

/**


 * TEMPLATE 1: Traditional Indian Lotus Wedding
 * Warm ivory background, ornate carved-style borders, pink lotus flowers,
 * Ganesha symbol with devotional heading "॥ श्री गणेशाय नमः ॥",
 * gold ornamental dividers, elegant burgundy calligraphy, and wedding couple artwork.
 */
function TraditionalLotusWeddingLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);

  // Specific bespoke palette for Indian Lotus Wedding
  const ivoryBg = "#FAF3E7";
  const antiqueGold = "#AD8745";
  const deepBurgundy = "#7D263F";
  const lotusPink = "#D85A8A";
  const darkText = "#382B2A";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        backgroundColor: ivoryBg,
        color: darkText,
        borderRadius: 24,
        padding: "clamp(36px, 6vw, 54px) clamp(24px, 5vw, 42px)",
        textAlign: "center",
        boxShadow: "0 25px 60px rgba(125, 38, 63, 0.15), 0 4px 16px rgba(173, 135, 69, 0.12)",
        border: `3px solid ${antiqueGold}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Outer Traditional Architectural Jali / Carved Inset Border */}
      <div
        style={{
          position: "absolute",
          inset: 10,
          border: `1.5px solid ${antiqueGold}`,
          borderRadius: 18,
          pointerEvents: "none",
          opacity: 0.85,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 15,
          border: "1px dashed rgba(173, 135, 69, 0.6)",
          borderRadius: 14,
          pointerEvents: "none",
        }}
      />

      {/* Decorative Ornate Corners (SVG Indian Paisley / Arch Motifs) */}
      <svg
        style={{ position: "absolute", top: 18, left: 18, pointerEvents: "none" }}
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <path d="M4 4H28C28 17.25 17.25 28 4 28V4Z" fill="rgba(216, 90, 138, 0.1)" stroke={antiqueGold} strokeWidth="1.2" />
        <circle cx="10" cy="10" r="3" fill={deepBurgundy} />
        <path d="M18 4C18 11.73 11.73 18 4 18" stroke={lotusPink} strokeWidth="1" strokeDasharray="2 2" />
      </svg>
      <svg
        style={{ position: "absolute", top: 18, right: 18, transform: "scaleX(-1)", pointerEvents: "none" }}
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <path d="M4 4H28C28 17.25 17.25 28 4 28V4Z" fill="rgba(216, 90, 138, 0.1)" stroke={antiqueGold} strokeWidth="1.2" />
        <circle cx="10" cy="10" r="3" fill={deepBurgundy} />
        <path d="M18 4C18 11.73 11.73 18 4 18" stroke={lotusPink} strokeWidth="1" strokeDasharray="2 2" />
      </svg>
      <svg
        style={{ position: "absolute", bottom: 18, left: 18, transform: "scaleY(-1)", pointerEvents: "none" }}
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <path d="M4 4H28C28 17.25 17.25 28 4 28V4Z" fill="rgba(216, 90, 138, 0.1)" stroke={antiqueGold} strokeWidth="1.2" />
        <circle cx="10" cy="10" r="3" fill={deepBurgundy} />
        <path d="M18 4C18 11.73 11.73 18 4 18" stroke={lotusPink} strokeWidth="1" strokeDasharray="2 2" />
      </svg>
      <svg
        style={{ position: "absolute", bottom: 18, right: 18, transform: "scale(-1, -1)", pointerEvents: "none" }}
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <path d="M4 4H28C28 17.25 17.25 28 4 28V4Z" fill="rgba(216, 90, 138, 0.1)" stroke={antiqueGold} strokeWidth="1.2" />
        <circle cx="10" cy="10" r="3" fill={deepBurgundy} />
        <path d="M18 4C18 11.73 11.73 18 4 18" stroke={lotusPink} strokeWidth="1" strokeDasharray="2 2" />
      </svg>

      {/* Side Pink Lotus Blossom Accents */}
      <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", opacity: 0.85 }}>
        <svg width="28" height="48" viewBox="0 0 28 48" fill="none">
          <path d="M14 6C14 6 5 18 5 28C5 35 14 42 14 42C14 42 23 35 23 28C23 18 14 6 14 6Z" fill="rgba(216, 90, 138, 0.22)" stroke={lotusPink} strokeWidth="1.2" />
          <path d="M14 14C14 14 9 22 9 28C9 32 14 36 14 36C14 36 19 32 19 28C19 22 14 14 14 14Z" fill="rgba(241, 215, 213, 0.6)" stroke={deepBurgundy} strokeWidth="1" />
          <circle cx="14" cy="28" r="2.5" fill={antiqueGold} />
        </svg>
      </div>
      <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%) scaleX(-1)", pointerEvents: "none", opacity: 0.85 }}>
        <svg width="28" height="48" viewBox="0 0 28 48" fill="none">
          <path d="M14 6C14 6 5 18 5 28C5 35 14 42 14 42C14 42 23 35 23 28C23 18 14 6 14 6Z" fill="rgba(216, 90, 138, 0.22)" stroke={lotusPink} strokeWidth="1.2" />
          <path d="M14 14C14 14 9 22 9 28C9 32 14 36 14 36C14 36 19 32 19 28C19 22 14 14 14 14Z" fill="rgba(241, 215, 213, 0.6)" stroke={deepBurgundy} strokeWidth="1" />
          <circle cx="14" cy="28" r="2.5" fill={antiqueGold} />
        </svg>
      </div>

      {/* Top Section: Sacred Ganesha & Devotional Inscription */}
      <div>
        {/* Lord Ganesha Ceremonial Artwork */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              backgroundColor: "rgba(173, 135, 69, 0.12)",
              border: `1.5px solid ${antiqueGold}`,
              display: "grid",
              placeItems: "center",
              boxShadow: "0 4px 12px rgba(173, 135, 69, 0.2)",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              {/* Crown / Mukut */}
              <path d="M14 7L18 3L22 7L24 10H12L14 7Z" fill={antiqueGold} stroke={deepBurgundy} strokeWidth="0.8" />
              {/* Ears */}
              <ellipse cx="10" cy="17" rx="5" ry="7" fill="rgba(216,90,138,0.2)" stroke={antiqueGold} strokeWidth="1" />
              <ellipse cx="26" cy="17" rx="5" ry="7" fill="rgba(216,90,138,0.2)" stroke={antiqueGold} strokeWidth="1" />
              {/* Head & Forehead Tilak */}
              <ellipse cx="18" cy="16" rx="6" ry="7" fill="#FAF3E7" stroke={antiqueGold} strokeWidth="1.2" />
              <path d="M16 12H20M17 14H19M18 10V16" stroke={deepBurgundy} strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="18" cy="11" r="1.2" fill={lotusPink} />
              {/* Trunk (Vakratunda curve) */}
              <path d="M18 19C18 24 14 26 12 24C11 23 12 21 14 21C16 21 17 22 17 24" stroke={antiqueGold} strokeWidth="2.2" strokeLinecap="round" />
              {/* Modak in Hand */}
              <circle cx="23" cy="24" r="2.2" fill={antiqueGold} />
            </svg>
          </div>
        </div>

        {/* Sacred Sanskrit Devotional Heading in Devanagari */}
        <div
          style={{
            fontFamily: "'Yatra One', 'Rozha One', var(--font-serif)",
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            letterSpacing: "0.08em",
            color: deepBurgundy,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          ॥ श्री गणेशाय नमः ॥
        </div>

        {/* Sub-header text */}
        <p
          style={{
            fontFamily: "Cormorant Garamond, var(--font-serif)",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            fontStyle: "italic",
            color: antiqueGold,
            letterSpacing: "0.04em",
            marginBottom: 6,
          }}
        >
          Shubh Vivah · Auspicious Wedding Ceremony
        </p>

        {/* Lotus Floral Ornament Divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "10px auto 14px" }}>
          <div style={{ width: 44, height: 1, backgroundColor: antiqueGold, opacity: 0.7 }} />
          <span style={{ color: lotusPink, fontSize: "1.1rem" }}>🪷</span>
          <span style={{ color: antiqueGold, fontSize: "0.85rem" }}>❖</span>
          <span style={{ color: lotusPink, fontSize: "1.1rem" }}>🪷</span>
          <div style={{ width: 44, height: 1, backgroundColor: antiqueGold, opacity: 0.7 }} />
        </div>

        <p
          style={{
            fontFamily: "Cormorant Garamond, var(--font-serif)",
            fontSize: "clamp(0.9rem, 1.7vw, 1.05rem)",
            fontStyle: "italic",
            opacity: 0.9,
            marginBottom: 6,
            color: darkText,
          }}
        >
          Together with their parents & families, we joyfully invite you to the wedding of
        </p>

        {/* Couple Names in Grand Burgundy Calligraphy Script */}
        <h1
          style={{
            fontFamily: "'Great Vibes', 'Playfair Display', cursive, serif",
            fontSize: "clamp(2.4rem, 6vw, 3.6rem)",
            lineHeight: 1.15,
            color: deepBurgundy,
            margin: "12px 0 8px",
            textShadow: "0 2px 8px rgba(125, 38, 63, 0.15)",
            overflowWrap: "anywhere",
          }}
        >
          {data.hostName || "Siddharth & Ananya"}
        </h1>

        {/* Gold Filigree Line with Lotus Icon */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "10px auto 14px" }}>
          <div style={{ width: 50, height: 1.5, backgroundColor: antiqueGold }} />
          <span style={{ color: antiqueGold, fontSize: "0.9rem" }}>✦</span>
          <div style={{ width: 50, height: 1.5, backgroundColor: antiqueGold }} />
        </div>

        <h2
          style={{
            fontFamily: "Cinzel, var(--font-serif)",
            fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: deepBurgundy,
            marginBottom: 12,
          }}
        >
          {data.title || "Wedding Ceremony & Reception"}
        </h2>
      </div>

      {/* Middle: Personal Message */}
      {data.message && (
        <div
          style={{
            margin: "10px auto 14px",
            padding: "10px 18px",
            backgroundColor: "rgba(241, 215, 213, 0.28)",
            borderRadius: 14,
            borderLeft: `3px solid ${lotusPink}`,
            maxWidth: 480,
          }}
        >
          <p
            style={{
              fontFamily: "Cormorant Garamond, var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
              lineHeight: 1.6,
              color: deepBurgundy,
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            “{data.message}”
          </p>
        </div>
      )}

      {/* Bottom Section: Ceremonial Date, Time, Venue, Address */}
      <div>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: 8,
            backgroundColor: "rgba(173, 135, 69, 0.08)",
            border: `1.5px solid ${antiqueGold}`,
            borderRadius: 16,
            padding: "14px 22px",
            maxWidth: 480,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: deepBurgundy, fontWeight: 600, fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", fontFamily: "Cinzel, serif" }}>
              <Calendar size={16} color={antiqueGold} />
              <span>{formattedDate}</span>
            </div>
          )}

          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "clamp(0.85rem, 1.6vw, 0.95rem)", color: darkText, opacity: 0.9 }}>
              <MapPin size={16} color={deepBurgundy} />
              <span style={{ overflowWrap: "anywhere" }}>{data.venue}</span>
            </div>
          )}
        </div>

        {/* Traditional Indian Bride & Groom Royal Silhouette Illustration */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, marginTop: 16 }}>
          <span style={{ color: lotusPink, fontSize: "1.2rem" }}>🪷</span>
          <svg width="48" height="28" viewBox="0 0 48 28" fill="none">
            {/* Couple Wedding Garland / Varmala Motif */}
            <path d="M4 14C12 24 36 24 44 14" stroke={antiqueGold} strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="24" cy="21" r="3.5" fill={deepBurgundy} />
            <circle cx="18" cy="18" r="2.5" fill={lotusPink} />
            <circle cx="30" cy="18" r="2.5" fill={lotusPink} />
          </svg>
          <span style={{ color: lotusPink, fontSize: "1.2rem" }}>🪷</span>
        </div>

        <div
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: antiqueGold,
            marginTop: 10,
            fontWeight: 700,
            fontFamily: "Cinzel, serif",
          }}
        >
          ॥ मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः ॥
        </div>
      </div>
    </div>
  );
}

/**
 * TEMPLATE 2: Luxury Muslim Nikah Wedding
 * Soft pearl ivory & champagne background, rich deep-red roses,
 * Arabic calligraphy Bismillah heading ("بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ"),
 * delicate golden arch, romantic script couple names, and Nikah blessing.
 */
function LuxuryNikahWeddingLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);

  // Specific bespoke palette for Nikah Wedding
  const pearlIvory = "#F8F0EA";
  const champagne = "#D9BC91";
  const deepBurgundy = "#591D2B";
  const roseRed = "#9E1830";
  const antiqueGold = "#A77C43";
  const darkText = "#3B2025";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        backgroundColor: pearlIvory,
        color: darkText,
        borderRadius: 24,
        padding: "clamp(36px, 6vw, 54px) clamp(24px, 5vw, 42px)",
        textAlign: "center",
        boxShadow: "0 25px 60px rgba(89, 29, 43, 0.16), 0 4px 18px rgba(167, 124, 67, 0.12)",
        border: `3px solid ${antiqueGold}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Islamic Arch Architectural Silhouette (Pointed Ogee Arch outline) */}
      <div
        style={{
          position: "absolute",
          inset: 10,
          border: `1.5px solid ${champagne}`,
          borderRadius: 18,
          pointerEvents: "none",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 14,
          border: `1px solid ${antiqueGold}`,
          borderRadius: 14,
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />

      {/* Top Left Deep-Red Rose Botanical Arrangement */}
      <div style={{ position: "absolute", top: 12, left: 12, pointerEvents: "none" }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          {/* Outer foliage */}
          <path d="M12 28C10 20 18 12 28 12C28 20 20 28 12 28Z" fill="rgba(167, 124, 67, 0.2)" stroke={antiqueGold} strokeWidth="1" />
          <path d="M28 12C36 10 44 18 44 28C36 28 28 20 28 12Z" fill="rgba(167, 124, 67, 0.2)" stroke={antiqueGold} strokeWidth="1" />
          {/* Main Rose Blossom */}
          <circle cx="20" cy="20" r="14" fill={roseRed} />
          <path d="M14 20C14 16.6863 16.6863 14 20 14C23.3137 14 26 16.6863 26 20C26 23.3137 23.3137 26 20 26" stroke="#FAF0EA" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16 18C16 15.79 17.79 14 20 14C22.21 14 24 15.79 24 18" stroke={champagne} strokeWidth="1.2" />
          <circle cx="20" cy="20" r="3" fill={deepBurgundy} />
        </svg>
      </div>

      {/* Top Right Deep-Red Rose Botanical Arrangement (Mirrored) */}
      <div style={{ position: "absolute", top: 12, right: 12, transform: "scaleX(-1)", pointerEvents: "none" }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M12 28C10 20 18 12 28 12C28 20 20 28 12 28Z" fill="rgba(167, 124, 67, 0.2)" stroke={antiqueGold} strokeWidth="1" />
          <path d="M28 12C36 10 44 18 44 28C36 28 28 20 28 12Z" fill="rgba(167, 124, 67, 0.2)" stroke={antiqueGold} strokeWidth="1" />
          <circle cx="20" cy="20" r="14" fill={roseRed} />
          <path d="M14 20C14 16.6863 16.6863 14 20 14C23.3137 14 26 16.6863 26 20C26 23.3137 23.3137 26 20 26" stroke="#FAF0EA" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16 18C16 15.79 17.79 14 20 14C22.21 14 24 15.79 24 18" stroke={champagne} strokeWidth="1.2" />
          <circle cx="20" cy="20" r="3" fill={deepBurgundy} />
        </svg>
      </div>

      {/* Bottom Corner Roses */}
      <div style={{ position: "absolute", bottom: 12, left: 12, transform: "scaleY(-1)", pointerEvents: "none", opacity: 0.85 }}>
        <svg width="46" height="46" viewBox="0 0 60 60" fill="none">
          <circle cx="20" cy="20" r="12" fill={roseRed} />
          <path d="M15 20C15 17 17 15 20 15C23 15 25 17 25 20" stroke="#FAF0EA" strokeWidth="1.4" />
          <circle cx="20" cy="20" r="2.5" fill={deepBurgundy} />
        </svg>
      </div>
      <div style={{ position: "absolute", bottom: 12, right: 12, transform: "scale(-1, -1)", pointerEvents: "none", opacity: 0.85 }}>
        <svg width="46" height="46" viewBox="0 0 60 60" fill="none">
          <circle cx="20" cy="20" r="12" fill={roseRed} />
          <path d="M15 20C15 17 17 15 20 15C23 15 25 17 25 20" stroke="#FAF0EA" strokeWidth="1.4" />
          <circle cx="20" cy="20" r="2.5" fill={deepBurgundy} />
        </svg>
      </div>

      {/* Top Section: Islamic Calligraphy Bismillah & Ceremonial Inscription */}
      <div>
        {/* Sacred Bismillah in Authentic Arabic Calligraphy */}
        <div
          dir="rtl"
          lang="ar"
          style={{
            fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
            fontSize: "clamp(1.5rem, 3.8vw, 2.2rem)",
            lineHeight: 1.4,
            color: deepBurgundy,
            fontWeight: 700,
            marginBottom: 6,
            textShadow: "0 1px 4px rgba(89, 29, 43, 0.12)",
          }}
        >
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>

        {/* Translation & Blessings */}
        <p
          style={{
            fontFamily: "Cormorant Garamond, var(--font-serif)",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            fontStyle: "italic",
            color: antiqueGold,
            letterSpacing: "0.06em",
            marginBottom: 8,
          }}
        >
          “In the name of Allah, the Most Gracious, the Most Merciful”
        </p>

        {/* Islamic Star Crescent / Gilded Arch Divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "8px auto 12px" }}>
          <div style={{ width: 44, height: 1, backgroundColor: antiqueGold, opacity: 0.7 }} />
          <span style={{ color: antiqueGold, fontSize: "1rem" }}>☽ ✦ ☾</span>
          <div style={{ width: 44, height: 1, backgroundColor: antiqueGold, opacity: 0.7 }} />
        </div>

        <p
          style={{
            fontFamily: "Cinzel, var(--font-serif)",
            fontSize: "0.78rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: deepBurgundy,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          WITH THE BLESSINGS OF ALLAH & OUR FAMILIES
        </p>

        <p
          style={{
            fontFamily: "Cormorant Garamond, var(--font-serif)",
            fontSize: "clamp(0.95rem, 1.8vw, 1.08rem)",
            fontStyle: "italic",
            opacity: 0.9,
            marginBottom: 8,
            color: darkText,
          }}
        >
          Cordially request the honour of your presence at the Nikah ceremony of
        </p>

        {/* Bride & Groom Couple Names in Burgundy Calligraphy */}
        <h1
          style={{
            fontFamily: "'Great Vibes', 'Playfair Display', cursive, serif",
            fontSize: "clamp(2.4rem, 6vw, 3.6rem)",
            lineHeight: 1.18,
            color: deepBurgundy,
            margin: "10px 0 8px",
            textShadow: "0 2px 8px rgba(89, 29, 43, 0.12)",
            overflowWrap: "anywhere",
          }}
        >
          {data.hostName || "Zayd & Aaliyah"}
        </h1>

        {/* Delicate Golden Divider with Rose Icon */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "10px auto 14px" }}>
          <div style={{ width: 50, height: 1.5, backgroundColor: antiqueGold }} />
          <span style={{ color: roseRed, fontSize: "0.95rem" }}>🌹</span>
          <div style={{ width: 50, height: 1.5, backgroundColor: antiqueGold }} />
        </div>

        <h2
          style={{
            fontFamily: "Cinzel, var(--font-serif)",
            fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: deepBurgundy,
            marginBottom: 10,
          }}
        >
          {data.title || "Holy Nikah & Walima Reception"}
        </h2>
      </div>

      {/* Middle: Du'a & Personal Message */}
      {data.message && (
        <div
          style={{
            margin: "10px auto 14px",
            padding: "10px 18px",
            backgroundColor: "rgba(217, 188, 145, 0.22)",
            borderRadius: 14,
            borderLeft: `3px solid ${roseRed}`,
            maxWidth: 480,
          }}
        >
          <p
            style={{
              fontFamily: "Cormorant Garamond, var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
              lineHeight: 1.6,
              color: deepBurgundy,
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            “{data.message}”
          </p>
        </div>
      )}

      {/* Bottom Section: Nikah Ceremony Schedule, Venue & Du'a */}
      <div>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: 8,
            backgroundColor: "rgba(167, 124, 67, 0.08)",
            border: `1.5px solid ${antiqueGold}`,
            borderRadius: 16,
            padding: "14px 22px",
            maxWidth: 480,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: deepBurgundy, fontWeight: 600, fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", fontFamily: "Cinzel, serif" }}>
              <Calendar size={16} color={antiqueGold} />
              <span>{formattedDate}</span>
            </div>
          )}

          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "clamp(0.85rem, 1.6vw, 0.95rem)", color: darkText, opacity: 0.9 }}>
              <MapPin size={16} color={deepBurgundy} />
              <span style={{ overflowWrap: "anywhere" }}>{data.venue}</span>
            </div>
          )}
        </div>

        {/* Wedding Du'a Blessing */}
        <div
          dir="rtl"
          lang="ar"
          style={{
            fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
            fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)",
            color: deepBurgundy,
            marginTop: 14,
            fontWeight: 600,
          }}
        >
          بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </div>
        <div
          style={{
            fontSize: "0.78rem",
            fontStyle: "italic",
            fontFamily: "Cormorant Garamond, serif",
            color: antiqueGold,
            marginTop: 4,
          }}
        >
          “May Allah bless you both and shower His blessings upon you, and unite you in goodness.”
        </div>

        <div
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: deepBurgundy,
            marginTop: 10,
            fontWeight: 700,
            fontFamily: "Cinzel, serif",
          }}
        >
          ✦ WALIMA & CELEBRATION TO FOLLOW ✦
        </div>
      </div>
    </div>
  );
}

/**
 * Universal Invitation Renderer:
 * Dispatches to individual occasion and specific template design families,
 * while respecting the selected theme color palette and content data.
 */
export const InvitationCard = React.forwardRef<
  HTMLDivElement,
  {
    data: InvitationCardData;
    customPalette?: PaletteConfig;
    className?: string;
  }
>(function InvitationCard({ data, customPalette, className }, ref) {
  const themeKey = data.theme || "wine";
  const palette = customPalette || THEME_PALETTES[themeKey] || THEME_PALETTES.wine;
  const occasion = (data.occasion || "Wedding").toLowerCase().trim();
  const templateSlug = (data.templateSlug || "").toLowerCase().trim();

  // Normalize fallback properties
  const normalizedData: InvitationCardData = {
    ...data,
    hostName: data.hostName || data.host || "",
    eventDate: data.eventDate || data.date,
  };

  // 14 Specialized Templates Match Logic
  const slug = templateSlug;
  const title = (data.title || "").toLowerCase();
  const occ = occasion;

  // 1. Pink Lotus Ganesh Wedding
  const isPinkLotusGanesh =
    slug === "pink-lotus-ganesh-wedding" ||
    (slug.includes("pink") && slug.includes("lotus")) ||
    themeKey === "lotus-ganesh" ||
    themeKey === "lotus" ||
    title.includes("pink lotus");

  // 2. Aqua Floral Royal Engagement
  const isAquaFloralEngagement =
    slug === "aqua-floral-royal-engagement" ||
    slug.includes("aqua") ||
    themeKey === "aqua" ||
    title.includes("aqua floral") ||
    (occ.includes("engagement") && themeKey === "aqua");

  // 3. Lavender Wisteria Royal Wedding
  const isLavenderWisteria =
    slug === "lavender-wisteria-royal-wedding" ||
    slug.includes("wisteria") ||
    slug.includes("lavender") ||
    themeKey === "wisteria" ||
    title.includes("wisteria") ||
    title.includes("lavender");

  // 4. Traditional Marathi God Bharai
  const isMarathiGodBharai =
    slug === "marathi-god-bharai-heritage" ||
    slug.includes("god-bharai") ||
    slug.includes("marathi") ||
    themeKey === "marathi" ||
    title.includes("गोद भराई") ||
    title.includes("डोहाळे जेवण") ||
    occ.includes("god bharai");

  // 5. Marigold Haldi Ceremony
  const isMarigoldHaldi =
    slug === "marigold-haldi-celebration" ||
    slug.includes("haldi") ||
    themeKey === "haldi" ||
    title.includes("haldi") ||
    occ.includes("haldi");

  // 6. Elegant Walima Islamic Wedding
  const isChampagneWalima =
    slug === "champagne-walima-elegance" ||
    slug.includes("walima") ||
    themeKey === "walima" ||
    title.includes("walima") ||
    occ.includes("walima");

  // 7. Embossed Burgundy Floral
  const isBurgundyEmbossed =
    slug === "burgundy-embossed-luxury" ||
    slug.includes("embossed") ||
    themeKey === "embossed" ||
    title.includes("embossed");

  // 8. Deep Burgundy Royal Nikah
  const isBurgundyRoyalNikah =
    slug === "burgundy-royal-nikah" ||
    (slug.includes("nikah") && themeKey === "wine") ||
    themeKey === "nikah-royal" ||
    title.includes("royal nikah");

  // 9. Royal Mughal Wedding
  const isRoyalMughal =
    slug === "royal-mughal-wedding" ||
    slug.includes("mughal") ||
    themeKey === "mughal" ||
    title.includes("mughal");

  // 10. Midnight Celestial Wedding
  const isMidnightCelestial =
    slug === "midnight-celestial-wedding" ||
    (slug.includes("celestial") && occ.includes("wedding")) ||
    themeKey === "celestial" ||
    title.includes("celestial wedding");

  // 11. Minimal Editorial Wedding
  const isMinimalEditorial =
    slug === "minimal-editorial-wedding" ||
    (slug.includes("minimal") && occ.includes("wedding")) ||
    title.includes("minimal editorial");

  // 12. Rose Garden Engagement
  const isRoseGarden =
    slug === "rose-garden-engagement" ||
    (slug.includes("rose") && occ.includes("engagement")) ||
    title.includes("rose garden");

  // 13. Pearl Anniversary
  const isPearlAnniversary =
    slug === "pearl-anniversary" ||
    (slug.includes("pearl") && occ.includes("anniversary")) ||
    title.includes("pearl anniversary");

  // 14. Royal Reception
  const isRoyalReception =
    slug === "royal-reception" ||
    slug.includes("reception") ||
    themeKey === "reception" ||
    title.includes("royal reception") ||
    occ.includes("reception");

  // Legacy traditional lotus and nikah fallback matches
  const isTraditionalLotus =
    slug === "traditional-lotus-wedding" ||
    slug.includes("lotus") ||
    themeKey === "lotus" ||
    title.includes("lotus vivah");

  const isLuxuryNikah =
    slug === "luxury-nikah-wedding" ||
    slug.includes("nikah") ||
    themeKey === "nikah" ||
    title.includes("nikah") ||
    occ.includes("nikah");

  return (
    <div ref={ref} className={className} style={{ width: "100%", maxWidth: 640 }}>
      {isPinkLotusGanesh ? (
        <PinkLotusGaneshLayout data={normalizedData} palette={palette} />
      ) : isAquaFloralEngagement ? (
        <AquaFloralEngagementLayout data={normalizedData} palette={palette} />
      ) : isLavenderWisteria ? (
        <LavenderWisteriaWeddingLayout data={normalizedData} palette={palette} />
      ) : isMarathiGodBharai ? (
        <MarathiGodBharaiLayout data={normalizedData} palette={palette} />
      ) : isMarigoldHaldi ? (
        <MarigoldHaldiLayout data={normalizedData} palette={palette} />
      ) : isChampagneWalima ? (
        <ChampagneWalimaLayout data={normalizedData} palette={palette} />
      ) : isBurgundyEmbossed ? (
        <BurgundyEmbossedLayout data={normalizedData} palette={palette} />
      ) : isBurgundyRoyalNikah ? (
        <BurgundyRoyalNikahLayout data={normalizedData} palette={palette} />
      ) : isRoyalMughal ? (
        <RoyalMughalWeddingLayout data={normalizedData} palette={palette} />
      ) : isMidnightCelestial ? (
        <MidnightCelestialWeddingLayout data={normalizedData} palette={palette} />
      ) : isMinimalEditorial ? (
        <MinimalEditorialWeddingLayout data={normalizedData} palette={palette} />
      ) : isRoseGarden ? (
        <RoseGardenEngagementLayout data={normalizedData} palette={palette} />
      ) : isPearlAnniversary ? (
        <PearlAnniversaryLayout data={normalizedData} palette={palette} />
      ) : isRoyalReception ? (
        <RoyalReceptionLayout data={normalizedData} palette={palette} />
      ) : isTraditionalLotus ? (
        <TraditionalLotusWeddingLayout data={normalizedData} palette={palette} />
      ) : isLuxuryNikah ? (
        <LuxuryNikahWeddingLayout data={normalizedData} palette={palette} />
      ) : occ.includes("wedding") ? (
        <WeddingLayout data={normalizedData} palette={palette} />
      ) : occ.includes("birthday") ? (
        <BirthdayLayout data={normalizedData} palette={palette} />
      ) : occ.includes("engagement") ? (
        <EngagementLayout data={normalizedData} palette={palette} />
      ) : occ.includes("anniversary") ? (
        <AnniversaryLayout data={normalizedData} palette={palette} />
      ) : occ.includes("baby") ? (
        <BabyShowerLayout data={normalizedData} palette={palette} />
      ) : occ.includes("festival") || occ.includes("diwali") || occ.includes("holiday") ? (
        <FestivalsLayout data={normalizedData} palette={palette} />
      ) : occ.includes("corporate") || occ.includes("summit") || occ.includes("business") ? (
        <CorporateLayout data={normalizedData} palette={palette} />
      ) : (
        <HousewarmingLayout data={normalizedData} palette={palette} />
      )}
    </div>
  );
});




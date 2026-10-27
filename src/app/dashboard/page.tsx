"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Eye,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  Plus,
  RefreshCw,
  Share2,
  Shield,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { downloadInvitationPng, shareInvitationWithImage } from "@/lib/export-image";
import { InvitationCard } from "@/components/InvitationCard";


type Invitation = {
  id: string;
  slug: string;
  title: string;
  occasion: string;
  hostName: string;
  eventDate: string | null;
  venue: string;
  message: string;
  theme: string;
  published: boolean;
  updatedAt: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type StudioTemplate = {
  id: string;
  slug: string;
  title: string;
  occasion: string;
  subtitle: string;
  theme: string;
  sampleHost: string;
  sampleEvent: string;
  sampleDate: string;
  sampleVenue: string;
  accent: string;
  tag: string;
  active: boolean;
};

type Draft = {
  title: string;
  occasion: string;
  hostName: string;
  eventDate: string;
  time: string;
  venue: string;
  message: string;
  theme: string;
};


const emptyDraft: Draft = {
  title: "",
  occasion: "Wedding",
  hostName: "",
  eventDate: "",
  time: "",
  venue: "",
  message: "",
  theme: "wine",
};

const themePalettes: Record<string, { bg: string; color: string; accent: string; label: string }> = {
  wine: { bg: "#3A1424", color: "#FAF6EF", accent: "#D6B574", label: "Royal Burgundy & Wine" },
  champagne: { bg: "#FCF8F2", color: "#382C1E", accent: "#C9A45C", label: "Champagne Soirée" },
  midnight: { bg: "#0E1A2B", color: "#F2EADA", accent: "#E2C485", label: "Midnight Celestial" },
  blush: { bg: "#F8EEEA", color: "#4A222B", accent: "#8C324E", label: "Dusty Rose & Blush" },
  heritage: { bg: "#FDF4ED", color: "#4C2619", accent: "#B87A4F", label: "Heritage Saffron" },
  minimal: { bg: "#FAF6EF", color: "#252329", accent: "#651E32", label: "Minimalist Ivory" },
  rose: { bg: "#F9ECEF", color: "#3D242B", accent: "#C27B8A", label: "Lavender & Peach" },
  classic: { bg: "#FAF6EF", color: "#252329", accent: "#D6B574", label: "Classic Gilded" },
  lotus: { bg: "#FAF3E7", color: "#382B2A", accent: "#AD8745", label: "Pink Lotus Ganesh Vivah" },
  nikah: { bg: "#F8F0EA", color: "#3B2025", accent: "#A77C43", label: "Luxury Islamic Nikah & Rose" },
  aqua: { bg: "#F4FAFA", color: "#1E353B", accent: "#C9A45C", label: "Aqua Floral Royal Engagement" },
  wisteria: { bg: "#FAF6FC", color: "#342240", accent: "#B88E3E", label: "Lavender Wisteria Royal Wedding" },
  marathi: { bg: "#FCF8F2", color: "#3D261C", accent: "#B87A4F", label: "Traditional Marathi God Bharai" },
  haldi: { bg: "#FFFDF6", color: "#3D2B10", accent: "#D69F3D", label: "Marigold Haldi Celebration" },
  walima: { bg: "#F9F5EE", color: "#2C2620", accent: "#C2A368", label: "Champagne Walima Elegance" },
  embossed: { bg: "#FAF6F0", color: "#341E25", accent: "#8B263E", label: "Burgundy Embossed Luxury" },
  celestial: { bg: "#0F1A2E", color: "#FAF6EE", accent: "#E2C485", label: "Midnight Celestial Wedding" },
  mughal: { bg: "#FAF4EB", color: "#3B2A1E", accent: "#AD8745", label: "Royal Mughal Matrimony" },
  reception: { bg: "#3A1424", color: "#FAF6EF", accent: "#D6B574", label: "Royal Wedding Reception" },
};



export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Invitation[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [filter, setFilter] = useState<"all" | "published" | "drafts">("all");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const previewCardRef = useRef<HTMLDivElement>(null);
  const itemCardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  async function handleDownloadCardPng(element: HTMLElement | null, title: string, id: string) {
    if (!element) return;
    setExportingId(id);
    try {
      await downloadInvitationPng(element, title, 2.5);
      showToast("High-resolution PNG downloaded!");
    } catch (err) {
      console.error("Export error", err);
      showToast("Failed to export image. Please try again.");
    } finally {
      setExportingId(null);
    }
  }

  async function handleShareWhatsApp(element: HTMLElement | null, item: { title: string; hostName: string; slug: string; published: boolean }, id: string) {
    if (!element) return;
    setExportingId(id);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const invitationUrl = item.published ? `${origin}/invite/${item.slug}` : "";
    const shareText = `${item.title}\n${item.hostName} warmly invite you.\n${invitationUrl ? `View invitation details: ${invitationUrl}` : ""}`;

    try {
      const res = await shareInvitationWithImage(
        element,
        {
          title: item.title,
          text: shareText,
          url: invitationUrl || undefined,
        },
        2.5
      );

      if (res.sharedViaNative) {
        showToast("Shared successfully!");
      } else if (res.downloaded) {
        showToast("PNG saved to device! Opening WhatsApp...");
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
      }
    } catch (err) {
      console.error("Share error", err);
      showToast("Failed to share invitation.");
    } finally {
      setExportingId(null);
    }
  }

  async function handleShareEmail(element: HTMLElement | null, item: { title: string; hostName: string; slug: string; published: boolean }, id: string) {
    if (!element) return;
    setExportingId(id);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const invitationUrl = item.published ? `${origin}/invite/${item.slug}` : "";

    try {
      await downloadInvitationPng(element, item.title, 2.5);
      showToast("PNG saved! Preparing email...");
      const subject = encodeURIComponent(`Invitation: ${item.title}`);
      const body = encodeURIComponent(
        `Dear Friend,\n\nYou are cordially invited by ${item.hostName} to ${item.title}.\n\n${invitationUrl ? `View invitation details: ${invitationUrl}\n\n` : ""}We look forward to celebrating together!`
      );
      window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
    } catch (err) {
      console.error("Email export error", err);
      showToast("Could not export image for email.");
    } finally {
      setExportingId(null);
    }
  }


  const [templates, setTemplates] = useState<StudioTemplate[]>([]);

  const load = useCallback(async () => {
    try {
      const me = await fetch("/api/auth/me", { cache: "no-store" }).then((r) => r.json());
      if (!me.user) {
        router.replace("/login");
        return;
      }
      setUser(me.user);

      const [invRes, tplRes] = await Promise.all([
        fetch("/api/invitations", { cache: "no-store" }),
        fetch("/api/templates", { cache: "no-store" }),
      ]);

      const data = await invRes.json();
      if (invRes.ok) {
        setItems(data.invitations || []);
      } else {
        setError(data.error || "Could not load invitations.");
      }

      const tplData = await tplRes.json();
      if (tplRes.ok && Array.isArray(tplData.templates)) {
        setTemplates(tplData.templates);
      }
    } catch {
      setError("Network error while loading your invitations.");
    }
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  function applyTemplate(tpl: StudioTemplate) {
    setDraft({
      title: tpl.title,
      occasion: tpl.occasion,
      hostName: tpl.sampleHost,
      eventDate: "",
      time: "",
      venue: tpl.sampleVenue,
      message: tpl.sampleEvent ? `We warmly invite you to join us: ${tpl.sampleEvent}` : "",
      theme: tpl.theme,
    });
    showToast(`Applied preset: ${tpl.title} (${tpl.occasion})`);
  }


  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      let combinedIso: string | null = null;
      if (draft.eventDate) {
        const dateClean = draft.eventDate.trim();
        const timeClean = draft.time ? draft.time.trim() : "12:00";
        if (dateClean) {
          // Construct local ISO date without unexpected timezone offset jumps
          const [y, m, d] = dateClean.split("-").map(Number);
          const [h, min] = timeClean.includes(":") ? timeClean.split(":").map(Number) : [12, 0];
          if (y && m && d) {
            const localObj = new Date(y, m - 1, d, h || 0, min || 0, 0);
            combinedIso = localObj.toISOString();
          }
        }
      }

      const payload = {
        title: draft.title,
        occasion: draft.occasion,
        hostName: draft.hostName,
        eventDate: combinedIso,
        venue: draft.venue,
        message: draft.message,
        theme: draft.theme,
      };
      const response = await fetch(editingId ? `/api/invitations/${editingId}` : "/api/invitations", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save invitation.");

      setDraft(emptyDraft);
      setEditingId(null);
      setShowEditor(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save invitation.");
    } finally {
      setBusy(false);
    }
  }

  function startEdit(item: Invitation) {
    setEditingId(item.id);
    let parsedDate = "";
    let parsedTime = "";

    if (item.eventDate) {
      const d = new Date(item.eventDate);
      if (!isNaN(d.getTime())) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        parsedDate = `${year}-${month}-${day}`;

        const hours = String(d.getHours()).padStart(2, "0");
        const mins = String(d.getMinutes()).padStart(2, "0");
        parsedTime = `${hours}:${mins}`;
      }
    }

    setDraft({
      title: item.title,
      occasion: item.occasion,
      hostName: item.hostName,
      eventDate: parsedDate,
      time: parsedTime,
      venue: item.venue,
      message: item.message,
      theme: item.theme,
    });
    setShowEditor(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function togglePublished(item: Invitation) {
    setError("");
    try {
      const response = await fetch(`/api/invitations/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !item.published }),
      });
      const data = await response.json();
      if (!response.ok) setError(data.error || "Could not update status.");
      else await load();
    } catch {
      setError("Failed to update status.");
    }
  }

  async function remove(item: Invitation) {
    if (!window.confirm(`Are you sure you want to delete “${item.title}”? This cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/invitations/${item.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) setError(data.error || "Could not delete invitation.");
      else await load();
    } catch {
      setError("Failed to delete invitation.");
    }
  }

  async function copyLink(slug: string) {
    const url = `${window.location.origin}/invite/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopyFeedback(slug);
      setTimeout(() => setCopyFeedback(null), 2200);
    } catch {
      window.prompt("Invitation link:", url);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  }

  const filteredItems = items.filter((item) => {
    if (filter === "published") return item.published;
    if (filter === "drafts") return !item.published;
    return true;
  });

  const activeThemePalette = themePalettes[draft.theme] || themePalettes.wine;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--warm-ivory)", color: "var(--charcoal)" }}>
      {/* ================= DASHBOARD HEADER ================= */}
      <header
        style={{
          backgroundColor: "var(--pure-white)",
          borderBottom: "1px solid var(--light-border)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          className="container dashboard-header-inner"
          style={{
            height: 74,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: "var(--deep-wine)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--champagne-gold)",
                }}
              >
                <Sparkles size={18} />
              </div>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--rich-burgundy)" }}>
                Invite<span style={{ color: "var(--champagne-gold)", fontStyle: "italic", marginLeft: 4 }}>Studio</span>
              </span>
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {user?.role === "SUPER_ADMIN" && (
              <Link href="/admin" className="btn btn-secondary btn-sm" style={{ gap: 6 }}>
                <Shield size={14} color="var(--rich-burgundy)" />
                <span>Super Admin</span>
              </Link>
            )}

            {user && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    backgroundColor: "var(--soft-blush)",
                    color: "var(--rich-burgundy)",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    border: "1px solid var(--light-border)",
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--rich-burgundy)" }} className="desktop-nav">
                  {user.name}
                </span>
              </div>
            )}

            <button onClick={logout} className="btn btn-ghost btn-sm" title="Sign out" style={{ padding: "8px 12px" }}>
              <LogOut size={16} />
              <span className="desktop-nav">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN DASHBOARD BODY ================= */}
      <main className="container" style={{ paddingTop: 36, paddingBottom: 80 }}>
        {/* Welcome & Actions Row */}
        <div className="dashboard-welcome-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 32 }}>
          <div>
            <div className="section-eyebrow dark" style={{ marginBottom: 6 }}>
              <Sparkles size={13} />
              <span>Host Suite Workspace</span>
            </div>
            <h1 style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)", color: "var(--rich-burgundy)", margin: 0 }}>
              Your Invitation Studio
            </h1>
          </div>

          <button
            onClick={() => {
              if (showEditor && !editingId) {
                setShowEditor(false);
              } else {
                setEditingId(null);
                setDraft(emptyDraft);
                setShowEditor(true);
              }
            }}
            className="btn btn-primary dashboard-welcome-btn"
            style={{ padding: "12px 22px" }}
          >
            <Plus size={18} />
            <span>{showEditor && !editingId ? "Close Editor" : "Create New Invitation"}</span>
          </button>
        </div>

        {/* Feedback Toast Notification Banner */}
        {toastMessage && (
          <div
            role="status"
            style={{
              padding: "14px 18px",
              borderRadius: 14,
              backgroundColor: "var(--deep-wine)",
              color: "var(--champagne-gold)",
              fontSize: "0.92rem",
              fontWeight: 600,
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "var(--shadow-md)",
              border: "1px solid var(--border-gold)",
            }}
          >
            <Sparkles size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Global Error Banner */}
        {error && (
          <div
            role="alert"
            style={{
              padding: "14px 18px",
              borderRadius: 14,
              backgroundColor: "#FFF1F0",
              border: "1px solid #FFA39E",
              color: "#CF1322",
              fontSize: "0.9rem",
              marginBottom: 24,
            }}
          >
            {error}
          </div>
        )}

        {/* Quick Stats Strip */}
        <div
          className="dashboard-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 36,
          }}
        >
          {[
            { label: "Total Invitations", value: items.length, color: "var(--rich-burgundy)" },
            { label: "Published & Live", value: items.filter((x) => x.published).length, color: "#8C4B2E" },
            { label: "Drafts in Progress", value: items.filter((x) => !x.published).length, color: "var(--muted-taupe)" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: "var(--pure-white)",
                borderRadius: 16,
                padding: "18px 22px",
                border: "1px solid var(--light-border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--muted-taupe)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700, color: stat.color, marginTop: 4 }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* ================= WORKSPACE EDITOR (COLLAPSIBLE / LIVE) ================= */}
        {showEditor && (
          <section
            className="dashboard-editor-card"
            style={{
              backgroundColor: "var(--pure-white)",
              borderRadius: 24,
              border: "1px solid var(--border-gold)",
              boxShadow: "var(--shadow-lg)",
              padding: "clamp(20px, 3.5vw, 36px)",
              marginBottom: 44,
              width: "100%",
              minWidth: 0,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid var(--light-border)", paddingBottom: 16, flexWrap: "wrap", gap: 12 }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: 6 }}>
                  {editingId ? "Editing Invitation" : "Design Mode"}
                </span>
                <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)", color: "var(--rich-burgundy)", margin: 0 }}>
                  {editingId ? "Update Invitation Suite" : "Create New Invitation"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowEditor(false);
                  setEditingId(null);
                  setDraft(emptyDraft);
                }}
                className="btn btn-ghost btn-sm"
              >
                Cancel
              </button>
            </div>

            <div className="dashboard-editor-grid">
              {/* Left Column: Form Fields */}
              <form onSubmit={save} className="dashboard-editor-form" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {/* Occasion Template Quick-Pick Bar */}
                {templates.length > 0 && !editingId && (
                  <div
                    style={{
                      padding: "16px 18px",
                      borderRadius: 16,
                      backgroundColor: "var(--warm-ivory)",
                      border: "1px solid var(--border-gold)",
                      width: "100%",
                      minWidth: 0,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, fontSize: "0.78rem", fontWeight: 700, color: "var(--rich-burgundy)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      <Sparkles size={14} color="var(--champagne-gold)" />
                      <span>Start with an Occasion Design Suite</span>
                    </div>
                    <div className="dashboard-quickpick-container" style={{ display: "flex", gap: 8, paddingBottom: 6 }}>
                      {templates.map((tpl) => (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() => applyTemplate(tpl)}
                          className="btn btn-secondary btn-sm"
                          style={{
                            fontSize: "0.8rem",
                            padding: "8px 14px",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                            borderRadius: 12,
                            backgroundColor: draft.title === tpl.title ? "var(--rich-burgundy)" : "var(--pure-white)",
                            color: draft.title === tpl.title ? "var(--pure-white)" : "var(--charcoal)",
                            border: draft.title === tpl.title ? "1px solid var(--rich-burgundy)" : "1px solid var(--light-border)",
                            boxShadow: draft.title === tpl.title ? "var(--shadow-sm)" : "none",
                          }}
                        >
                          <span style={{ fontWeight: 600 }}>{tpl.title}</span>
                          <span style={{ opacity: 0.75, fontSize: "0.72rem", marginLeft: 4 }}>• {tpl.occasion}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="studio-label">Invitation Title *</label>
                  <input
                    className="studio-input"
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    placeholder="e.g. Royal Wedding & Reception"
                    maxLength={120}
                    required
                  />
                </div>

                <div className="dashboard-2col-row">
                  <div>
                    <label className="studio-label">Occasion *</label>
                    <select
                      className="studio-input"
                      value={draft.occasion}
                      onChange={(e) => setDraft({ ...draft, occasion: e.target.value })}
                    >
                      {["Wedding", "Engagement", "Haldi", "God Bharai", "Nikah", "Walima", "Reception", "Birthday", "Anniversary", "Baby shower", "Festivals", "Corporate", "Housewarming", "Other"].map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="studio-label">Host Name(s) *</label>
                    <input
                      className="studio-input"
                      value={draft.hostName}
                      onChange={(e) => setDraft({ ...draft, hostName: e.target.value })}
                      placeholder="e.g. Siddharth & Ananya"
                      maxLength={120}
                      required
                    />
                  </div>
                </div>

                <div className="dashboard-2col-row">
                  <div>
                    <label className="studio-label">Event Date</label>
                    <input
                      className="studio-input"
                      type="date"
                      value={draft.eventDate}
                      onChange={(e) => setDraft({ ...draft, eventDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="studio-label">Event Time</label>
                    <input
                      className="studio-input"
                      type="time"
                      value={draft.time}
                      onChange={(e) => setDraft({ ...draft, time: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="studio-label">Venue / Location</label>
                  <input
                    className="studio-input"
                    value={draft.venue}
                    onChange={(e) => setDraft({ ...draft, venue: e.target.value })}
                    placeholder="e.g. The Glasshouse Estate, Udaipur"
                    maxLength={240}
                  />
                </div>

                <div>
                  <label className="studio-label">Visual Theme & Palette</label>
                  <select
                    className="studio-input"
                    value={draft.theme}
                    onChange={(e) => setDraft({ ...draft, theme: e.target.value })}
                  >
                    {Object.entries(themePalettes).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="studio-label">Personal Message for Guests</label>
                  <textarea
                    className="studio-input"
                    rows={4}
                    value={draft.message}
                    onChange={(e) => setDraft({ ...draft, message: e.target.value })}
                    placeholder="We warmly invite you to celebrate this joyous occasion with us..."
                    maxLength={5000}
                  />
                </div>

                <div className="dashboard-editor-actions" style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button type="submit" disabled={busy} className="btn btn-primary" style={{ padding: "14px 28px" }}>
                    {busy ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Saving…</span>
                      </span>
                    ) : (
                      <span>{editingId ? "Save Changes" : "Create Invitation"}</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditor(false);
                      setEditingId(null);
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {/* Right Column: Full-Scale Luxury Live Canvas Preview */}
              <div
                className="dashboard-editor-preview"
                style={{
                  backgroundColor: "var(--ivory-surface)",
                  borderRadius: 24,
                  padding: "clamp(20px, 3.5vw, 36px) clamp(14px, 2.5vw, 28px)",
                  border: "1px solid var(--border-gold)",
                  boxShadow: "inset 0 2px 8px rgba(58, 20, 36, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  minWidth: 0,
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 580, marginBottom: 16 }}>
                  <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--champagne-gold)", fontWeight: 700 }}>
                    ✦ FULL-SCALE BESPOKE PREVIEW ✦
                  </div>
                  <span className="badge badge-gold" style={{ fontSize: "0.7rem", textTransform: "capitalize" }}>
                    {draft.occasion || "Wedding"} Style
                  </span>
                </div>

                {/* Substantially Larger Centered Invitation Card */}
                <div
                  style={{
                    width: "100%",
                    maxWidth: 580,
                    display: "flex",
                    justifyContent: "center",
                    transition: "transform 0.25s ease",
                    minWidth: 0,
                    overflow: "hidden",
                  }}
                >
                  <InvitationCard
                    ref={previewCardRef}
                    data={{
                      title: draft.title || "",
                      occasion: draft.occasion || "Wedding",
                      hostName: draft.hostName || "",
                      eventDate: draft.eventDate,
                      time: draft.time,
                      venue: draft.venue || "",
                      message: draft.message || "",
                      theme: draft.theme || "wine",
                    }}
                  />
                </div>

                {/* Editor Action Buttons Toolbar */}
                <div style={{ marginTop: 24, width: "100%", maxWidth: 580, display: "flex", flexDirection: "column", gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => handleDownloadCardPng(previewCardRef.current, draft.title || "invitation", "editor-preview")}
                    disabled={exportingId === "editor-preview"}
                    className="btn btn-gold"
                    style={{ width: "100%", justifyContent: "center", padding: "12px 20px", fontSize: "0.92rem", fontWeight: 700 }}
                  >
                    {exportingId === "editor-preview" ? (
                      <>
                        <RefreshCw size={17} className="animate-spin" />
                        <span>Rendering 2.5× High-Resolution PNG…</span>
                      </>
                    ) : (
                      <>
                        <Download size={17} />
                        <span>Download High-Resolution PNG</span>
                      </>
                    )}
                  </button>

                  <div className="preview-share-actions" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <button
                      type="button"
                      onClick={() =>
                        handleShareWhatsApp(
                          previewCardRef.current,
                          {
                            title: draft.title || "Invitation",
                            hostName: draft.hostName || "Host",
                            slug: "",
                            published: false,
                          },
                          "editor-wa"
                        )
                      }
                      disabled={exportingId === "editor-wa"}
                      className="btn btn-primary"
                      style={{ fontSize: "0.84rem", padding: "10px 14px", justifyContent: "center" }}
                    >
                      <MessageCircle size={15} />
                      <span>Share on WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleShareEmail(
                          previewCardRef.current,
                          {
                            title: draft.title || "Invitation",
                            hostName: draft.hostName || "Host",
                            slug: "",
                            published: false,
                          },
                          "editor-email"
                        )
                      }
                      disabled={exportingId === "editor-email"}
                      className="btn btn-secondary"
                      style={{ fontSize: "0.84rem", padding: "10px 14px", justifyContent: "center" }}
                    >
                      <Mail size={15} />
                      <span>Share via Email</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= SAVED INVITATIONS COLLECTION ================= */}
        <div>
          {/* Collection Filter Tabs */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 14 }}>
            <h2 style={{ fontSize: "1.5rem", color: "var(--rich-burgundy)", margin: 0 }}>
              Your Collection ({items.length})
            </h2>

            <div style={{ display: "flex", gap: 8 }}>
              {[
                { id: "all", label: "All" },
                { id: "published", label: "Published" },
                { id: "drafts", label: "Drafts" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setFilter(t.id as typeof filter)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    border: filter === t.id ? "1px solid var(--rich-burgundy)" : "1px solid var(--light-border)",
                    backgroundColor: filter === t.id ? "var(--rich-burgundy)" : "var(--pure-white)",
                    color: filter === t.id ? "var(--pure-white)" : "var(--charcoal)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 ? (
            <div
              style={{
                backgroundColor: "var(--pure-white)",
                borderRadius: 20,
                padding: "60px 24px",
                textAlign: "center",
                border: "1px dashed var(--light-border)",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: "var(--soft-blush)",
                  color: "var(--rich-burgundy)",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: "1.3rem", color: "var(--rich-burgundy)", marginBottom: 8 }}>
                No invitations found
              </h3>
              <p style={{ color: "var(--muted-taupe)", fontSize: "0.92rem", maxWidth: 420, margin: "0 auto 24px" }}>
                {items.length === 0
                  ? "Begin your celebration by creating your first digital invitation suite with custom typography and live RSVP."
                  : "No invitations match the selected filter."}
              </p>
              {items.length === 0 && (
                <button onClick={() => setShowEditor(true)} className="btn btn-primary">
                  <Plus size={16} />
                  <span>Design Your First Invitation</span>
                </button>
              )}
            </div>
          ) : (
            /* Cards Grid */
            <div className="dashboard-collection-grid">
              {filteredItems.map((item) => {
                const palette = themePalettes[item.theme] || themePalettes.wine;
                const formattedDate = item.eventDate
                  ? new Date(item.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                  : null;
                const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/invite/${item.slug}`;
                const whatsappShareText = `${item.title} — ${item.hostName}\nView invitation & RSVP: ${shareUrl}`;

                return (
                  <article
                    key={item.id}
                    className="luxury-card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Card Header & Preview Banner */}
                    <div
                      ref={(el) => {
                        itemCardRefs.current[item.id] = el;
                      }}
                      style={{
                        padding: "24px 22px 20px",
                        backgroundColor: palette.bg,
                        color: palette.color,
                        borderBottom: "1px solid var(--light-border)",
                        position: "relative",
                        borderRadius: "16px 16px 0 0",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <span className="badge" style={{ backgroundColor: `${palette.accent}25`, color: palette.color, border: `1px solid ${palette.accent}55` }}>
                          {item.occasion}
                        </span>
                        <span className={`badge ${item.published ? "badge-published" : "badge-draft"}`}>
                          {item.published ? "● Published" : "○ Draft"}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.4rem",
                          lineHeight: 1.25,
                          marginBottom: 6,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {item.title}
                      </h3>

                      <div style={{ fontSize: "0.85rem", opacity: 0.85 }}>{item.hostName}</div>

                      {(formattedDate || item.venue) && (
                        <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${palette.accent}44`, fontSize: "0.78rem", opacity: 0.8 }}>
                          {formattedDate && <div>📅 {formattedDate}</div>}
                          {item.venue && <div>📍 {item.venue}</div>}
                        </div>
                      )}
                    </div>

                    {/* Card Body & Actions */}
                    <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
                      {/* Public Link Box (If Published) */}
                      {item.published && (
                        <div
                          style={{
                            padding: "10px 14px",
                            borderRadius: 10,
                            backgroundColor: "var(--warm-ivory)",
                            border: "1px solid var(--light-border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 8,
                          }}
                        >
                          <span style={{ fontSize: "0.78rem", color: "var(--muted-taupe)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            /invite/{item.slug}
                          </span>
                          <button
                            onClick={() => copyLink(item.slug)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--rich-burgundy)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: "0.75rem",
                              fontWeight: 700,
                            }}
                          >
                            {copyFeedback === item.slug ? <Check size={14} color="var(--rich-burgundy)" /> : <Copy size={14} />}
                            <span>{copyFeedback === item.slug ? "Copied" : "Copy"}</span>
                          </button>
                        </div>
                      )}

                      {/* Action Buttons Toolbar */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                        <button onClick={() => startEdit(item)} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                          Edit
                        </button>

                        <button
                          onClick={() => togglePublished(item)}
                          className="btn btn-sm"
                          style={{
                            flex: 1,
                            backgroundColor: item.published ? "var(--warm-ivory)" : "var(--rich-burgundy)",
                            color: item.published ? "var(--charcoal)" : "var(--pure-white)",
                            border: "1px solid var(--light-border)",
                          }}
                        >
                          {item.published ? "Unpublish" : "Publish"}
                        </button>

                        {/* Download PNG Button */}
                        <button
                          type="button"
                          onClick={() => handleDownloadCardPng(itemCardRefs.current[item.id], item.title, item.id)}
                          disabled={exportingId === item.id}
                          className="btn btn-gold btn-sm"
                          title="Download high-resolution PNG"
                          style={{ padding: "8px 12px", display: "inline-flex", alignItems: "center", gap: 6 }}
                        >
                          {exportingId === item.id ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <Download size={14} />
                          )}
                          <span style={{ fontSize: "0.75rem" }}>PNG</span>
                        </button>

                        {/* WhatsApp Share Button */}
                        <button
                          type="button"
                          onClick={() => handleShareWhatsApp(itemCardRefs.current[item.id], item, `wa-${item.id}`)}
                          disabled={exportingId === `wa-${item.id}`}
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "var(--deep-wine)",
                            color: "var(--champagne-gold)",
                            padding: "8px 10px",
                            border: "1px solid var(--border-gold)",
                          }}
                          title="Share invitation image to WhatsApp"
                        >
                          {exportingId === `wa-${item.id}` ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <MessageCircle size={15} />
                          )}
                        </button>

                        {/* Email Share Button */}
                        <button
                          type="button"
                          onClick={() => handleShareEmail(itemCardRefs.current[item.id], item, `mail-${item.id}`)}
                          disabled={exportingId === `mail-${item.id}`}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "8px 10px" }}
                          title="Share invitation via Email"
                        >
                          {exportingId === `mail-${item.id}` ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <Mail size={15} />
                          )}
                        </button>

                        {item.published && (
                          <Link
                            href={`/invite/${item.slug}`}
                            target="_blank"
                            className="btn btn-secondary btn-sm"
                            title="View Live Page"
                            style={{ padding: "8px 10px" }}
                          >
                            <ExternalLink size={15} />
                          </Link>
                        )}

                        <button
                          onClick={() => remove(item)}
                          className="btn btn-ghost btn-sm"
                          style={{ color: "#CF1322", padding: "8px 10px" }}
                          title="Delete Invitation"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Responsive layout styles */}
      <style jsx global>{`
        /* Dashboard Container & Grid Responsiveness */
        .dashboard-editor-grid {
          display: grid;
          grid-template-columns: minmax(320px, 1fr) minmax(400px, 1.2fr);
          gap: 36px;
          align-items: start;
          width: 100%;
          min-width: 0;
        }

        .dashboard-editor-form {
          min-width: 0;
          width: 100%;
        }

        .dashboard-editor-preview {
          min-width: 0;
          width: 100%;
        }

        .dashboard-2col-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          min-width: 0;
          width: 100%;
        }

        .dashboard-quickpick-container {
          width: 100%;
          min-width: 0;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }

        .dashboard-collection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          width: 100%;
        }

        /* Large Tablet / Small Laptop Breakpoint (<= 1040px) */
        @media (max-width: 1040px) {
          .dashboard-editor-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .dashboard-editor-preview {
            margin-top: 10px;
          }
        }

        /* Tablet & Mobile Breakpoint (<= 640px) */
        @media (max-width: 640px) {
          .dashboard-header-inner {
            height: 64px !important;
          }
          .dashboard-welcome-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .dashboard-welcome-btn {
            width: 100% !important;
          }
          .dashboard-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .dashboard-editor-card {
            padding: 16px !important;
            border-radius: 16px !important;
          }
          .dashboard-2col-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .dashboard-collection-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .dashboard-editor-actions {
            flex-direction: column !important;
          }
          .dashboard-editor-actions button {
            width: 100% !important;
          }
          .preview-share-actions {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

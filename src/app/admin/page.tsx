"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Filter,
  Layers,
  Mail,
  Palette,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  Tag,
  Trash2,
  UserCheck,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { InvitationCard } from "@/components/InvitationCard";
import { downloadInvitationPng } from "@/lib/export-image";


type UserRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  phoneVerified: boolean;
  role: string;
  status: string;
  createdAt: string;
  _count: { invitations: number };
};

type EventRow = {
  id: string;
  action: string;
  feature: string;
  createdAt: string;
  metadata: Record<string, unknown> | null;
  user: { id: string; name: string; email: string; phone: string | null } | null;
};

type AdminTemplate = {
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
  createdAt: string;
};

type Data = {
  metrics: {
    totalUsers: number;
    verifiedUsers: number;
    suspendedUsers: number;
    totalInvitations: number;
    publishedInvitations: number;
    activeUsers7d: number;
  };
  users: UserRow[];
  recentEvents: EventRow[];
  featureCounts: { feature: string; _count: { _all: number } }[];
};

const THEMES = [
  { id: "wine", label: "Royal Burgundy & Wine" },
  { id: "champagne", label: "Champagne Soirée" },
  { id: "midnight", label: "Midnight Celestial" },
  { id: "blush", label: "Dusty Rose & Soft Blush" },
  { id: "heritage", label: "Heritage Terracotta & Saffron" },
  { id: "minimal", label: "Minimalist Ivory" },
  { id: "rose", label: "Lavender & Peach Whispers" },
];

const OCCASIONS = [
  "Wedding",
  "Birthday",
  "Engagement",
  "Anniversary",
  "Baby Shower",
  "Festivals",
  "Housewarming",
  "Corporate",
  "Cocktail Party",
  "Graduation",
  "Other",
];

export default function AdminPage() {
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);
  const [templates, setTemplates] = useState<AdminTemplate[]>([]);
  const [activeTab, setActiveTab] = useState<"users" | "templates" | "activity">("templates");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busyId, setBusyId] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "SUSPENDED">("ALL");

  // Template form state
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [templateForm, setTemplateForm] = useState({
    title: "",
    occasion: "Wedding",
    subtitle: "",
    theme: "wine",
    sampleHost: "",
    sampleEvent: "",
    sampleDate: "",
    sampleVenue: "",
    accent: "#D6B574",
    tag: "Luxury Editorial",
    active: true,
  });

  // Template Live Preview & PNG Export State
  const [previewTemplate, setPreviewTemplate] = useState<AdminTemplate | null>(null);
  const adminPreviewCardRef = useRef<HTMLDivElement>(null);
  const [isExportingPng, setIsExportingPng] = useState(false);

  const showToast = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3500);
  };

  async function loadOverview() {
    try {
      const r = await fetch("/api/admin/overview", { cache: "no-store" });
      const d = await r.json();
      if (r.status === 401) {
        router.replace("/login");
        return;
      }
      if (r.status === 403) {
        setError("Access Denied: Only the sole designated Super Admin can access this panel.");
        setTimeout(() => {
          router.replace("/dashboard");
        }, 2500);
        return;
      }
      if (!r.ok) {
        setError(d.error || "Could not load admin analytics.");
        return;
      }
      setData(d);
    } catch {
      setError("Failed to connect to admin overview service.");
    }
  }


  async function loadTemplates() {
    try {
      const r = await fetch("/api/admin/templates", { cache: "no-store" });
      const d = await r.json();
      if (r.ok) {
        setTemplates(d.templates || []);
      }
    } catch (err) {
      console.error("Failed to fetch templates", err);
    }
  }

  async function reloadAll() {
    setError("");
    await Promise.all([loadOverview(), loadTemplates()]);
  }

  useEffect(() => {
    void reloadAll();
  }, []);

  async function setStatus(user: UserRow) {
    const nextStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    if (
      !window.confirm(
        `Are you sure you want to ${nextStatus === "SUSPENDED" ? "suspend" : "reactivate"} account for ${user.name}?`
      )
    ) {
      return;
    }

    setBusyId(user.id);
    try {
      const r = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const res = await r.json();
      if (!r.ok) {
        alert(res.error || "Could not update user status.");
        return;
      }
      await reloadAll();
      showToast(`User status updated to ${nextStatus}`);
    } catch {
      alert("Network failure.");
    } finally {
      setBusyId("");
    }
  }

  async function verifyPhone(user: UserRow) {
    setBusyId(user.id);
    try {
      const r = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneVerified: true }),
      });
      const res = await r.json();
      if (!r.ok) {
        alert(res.error || "Could not verify phone.");
        return;
      }
      await reloadAll();
      showToast(`Phone number marked verified for ${user.name}`);
    } catch {
      alert("Network failure.");
    } finally {
      setBusyId("");
    }
  }

  // Template CRUD actions
  function openCreateTemplate() {
    setEditingTemplateId(null);
    setTemplateForm({
      title: "",
      occasion: "Wedding",
      subtitle: "",
      theme: "wine",
      sampleHost: "",
      sampleEvent: "",
      sampleDate: "",
      sampleVenue: "",
      accent: "#D6B574",
      tag: "Luxury Editorial",
      active: true,
    });
    setShowTemplateModal(true);
  }

  function openEditTemplate(tpl: AdminTemplate) {
    setEditingTemplateId(tpl.id);
    setTemplateForm({
      title: tpl.title,
      occasion: tpl.occasion,
      subtitle: tpl.subtitle,
      theme: tpl.theme,
      sampleHost: tpl.sampleHost,
      sampleEvent: tpl.sampleEvent,
      sampleDate: tpl.sampleDate,
      sampleVenue: tpl.sampleVenue,
      accent: tpl.accent,
      tag: tpl.tag,
      active: tpl.active,
    });
    setShowTemplateModal(true);
  }

  async function handleSaveTemplate(e: React.FormEvent) {
    e.preventDefault();
    setBusyId("template-save");
    try {
      const url = editingTemplateId
        ? `/api/admin/templates/${editingTemplateId}`
        : "/api/admin/templates";
      const method = editingTemplateId ? "PATCH" : "POST";

      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(templateForm),
      });

      const d = await r.json();
      if (!r.ok) {
        alert(d.error || "Failed to save template.");
        return;
      }

      setShowTemplateModal(false);
      await loadTemplates();
      showToast(editingTemplateId ? "Template updated successfully!" : "New template added successfully!");
    } catch {
      alert("Failed to submit template.");
    } finally {
      setBusyId("");
    }
  }

  async function handleDeleteTemplate(id: string, title: string) {
    if (!window.confirm(`Are you sure you want to permanently delete template "${title}"?`)) return;
    setBusyId(`del-${id}`);
    try {
      const r = await fetch(`/api/admin/templates/${id}`, { method: "DELETE" });
      if (!r.ok) {
        alert("Failed to delete template.");
        return;
      }
      await loadTemplates();
      showToast(`Deleted template: ${title}`);
    } catch {
      alert("Network error.");
    } finally {
      setBusyId("");
    }
  }

  async function handleToggleTemplateActive(tpl: AdminTemplate) {
    setBusyId(`toggle-${tpl.id}`);
    try {
      const r = await fetch(`/api/admin/templates/${tpl.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !tpl.active }),
      });
      if (!r.ok) {
        alert("Failed to toggle template status.");
        return;
      }
      await loadTemplates();
      showToast(`Template ${!tpl.active ? "activated" : "deactivated"}`);
    } catch {
      alert("Network error.");
    } finally {
      setBusyId("");
    }
  }

  const filteredUsers = useMemo(() => {
    if (!data) return [];
    return data.users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        (u.phone && u.phone.includes(search));
      const matchStatus = statusFilter === "ALL" || u.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [data, search, statusFilter]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--warm-ivory)", color: "var(--charcoal)" }}>
      {/* ================= TOP NAV ================= */}
      <header
        style={{
          borderBottom: "1px solid var(--border-gold)",
          backgroundColor: "var(--deep-wine)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          className="container"
          style={{
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link
              href="/dashboard"
              className="btn btn-ghost btn-sm"
              style={{
                color: "var(--champagne-gold)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
              }}
            >
              <ArrowLeft size={15} />
              <span>Dashboard</span>
            </Link>

            <div style={{ height: 16, width: 1, backgroundColor: "rgba(214, 181, 116, 0.35)" }} />

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Shield size={17} color="var(--champagne-gold)" />
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--pure-white)",
                  whiteSpace: "nowrap",
                }}
              >
                Super Admin
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => void reloadAll()}
              className="btn btn-secondary btn-sm"
              style={{
                backgroundColor: "rgba(250, 246, 239, 0.12)",
                color: "var(--pure-white)",
                borderColor: "rgba(214, 181, 116, 0.35)",
                fontSize: "0.78rem",
                padding: "6px 12px",
              }}
            >
              <RefreshCw size={13} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN ADMIN CONTENT ================= */}
      <main className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>
        {/* Toast / Success Banner */}
        {success && (
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
            <span>{success}</span>
          </div>
        )}

        {/* Error Banner */}
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

        {!data && !error && (
          <div style={{ padding: "80px 0", textAlign: "center", color: "var(--muted-taupe)" }}>
            <RefreshCw size={28} className="animate-spin" style={{ margin: "0 auto 16px" }} />
            <p>Loading enterprise analytics & studio templates…</p>
          </div>
        )}

        {data && (
          <>
            {/* ================= METRIC CARDS GRID ================= */}
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                gap: 16,
                marginBottom: 32,
              }}
            >
              {[
                { title: "Total Users", value: data.metrics.totalUsers, icon: <Users size={18} color="var(--rich-burgundy)" />, accent: "var(--rich-burgundy)" },
                { title: "Active Templates", value: templates.filter((t) => t.active).length, icon: <Layers size={18} color="var(--champagne-gold)" />, accent: "var(--deep-wine)" },
                { title: "Total Invitations", value: data.metrics.totalInvitations, icon: <Sparkles size={18} color="var(--rich-burgundy)" />, accent: "var(--rich-burgundy)" },
                { title: "Published Live", value: data.metrics.publishedInvitations, icon: <CheckCircle2 size={18} color="#8C4B2E" />, accent: "#8C4B2E" },
                { title: "Phone Verified", value: data.metrics.verifiedUsers, icon: <UserCheck size={18} color="#8C4B2E" />, accent: "#8C4B2E" },
                { title: "Suspended Users", value: data.metrics.suspendedUsers, icon: <XCircle size={18} color="#CF1322" />, accent: "#CF1322" },
              ].map((m) => (
                <div
                  key={m.title}
                  style={{
                    backgroundColor: "var(--pure-white)",
                    borderRadius: 16,
                    padding: "18px 20px",
                    border: "1px solid var(--light-border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted-taupe)" }}>
                      {m.title}
                    </span>
                    {m.icon}
                  </div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", fontWeight: 700, color: m.accent }}>
                    {m.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </section>

            {/* ================= TABS NAVIGATION ================= */}
            <div style={{ display: "flex", gap: 10, marginBottom: 24, borderBottom: "1px solid var(--light-border)", paddingBottom: 14 }}>
              {[
                { id: "templates", label: `Templates Studio (${templates.length})`, icon: <Layers size={16} /> },
                { id: "users", label: `User Directory (${data.users.length})`, icon: <Users size={16} /> },
                { id: "activity", label: "Activity Logs & Analytics", icon: <Activity size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 18px",
                    borderRadius: 999,
                    border: activeTab === tab.id ? "1px solid var(--rich-burgundy)" : "1px solid var(--light-border)",
                    backgroundColor: activeTab === tab.id ? "var(--rich-burgundy)" : "var(--pure-white)",
                    color: activeTab === tab.id ? "var(--pure-white)" : "var(--charcoal)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* ================= TAB 1: TEMPLATE STUDIO ================= */}
            {activeTab === "templates" && (
              <section
                style={{
                  backgroundColor: "var(--pure-white)",
                  borderRadius: 20,
                  border: "1px solid var(--light-border)",
                  boxShadow: "var(--shadow-sm)",
                  padding: "28px 24px",
                  marginBottom: 36,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
                  <div>
                    <h2 style={{ fontSize: "1.45rem", color: "var(--rich-burgundy)", margin: 0 }}>
                      Customizable Occasion Templates ({templates.length})
                    </h2>
                    <p style={{ color: "var(--muted-taupe)", fontSize: "0.85rem", margin: "4px 0 0" }}>
                      Add, update, or retire design templates for any occasion. Users will see these templates immediately across the platform.
                    </p>
                  </div>

                  <button
                    onClick={openCreateTemplate}
                    className="btn btn-primary btn-sm"
                    style={{ padding: "10px 18px" }}
                  >
                    <Plus size={16} />
                    <span>Add New Template</span>
                  </button>
                </div>

                {/* Templates Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                    gap: 20,
                  }}
                >
                  {templates.map((tpl) => (
                    <article
                      key={tpl.id}
                      style={{
                        borderRadius: 16,
                        border: "1px solid var(--light-border)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        backgroundColor: "var(--pure-white)",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      {/* Card Preview Banner */}
                      <div
                        style={{
                          padding: "20px 18px",
                          backgroundColor:
                            tpl.theme === "wine"
                              ? "#3A1424"
                              : tpl.theme === "midnight"
                              ? "#0E1A2B"
                              : tpl.theme === "blush"
                              ? "#F8EEEA"
                              : tpl.theme === "champagne"
                              ? "#FCF8F2"
                              : tpl.theme === "heritage"
                              ? "#FDF4ED"
                              : tpl.theme === "rose"
                              ? "#F9ECEF"
                              : "#FAF6EF",
                          color: tpl.theme === "wine" || tpl.theme === "midnight" ? "#FAF6EF" : "#252329",
                          borderBottom: "1px solid var(--light-border)",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <span
                            className="badge"
                            style={{
                              backgroundColor: "rgba(214, 181, 116, 0.22)",
                              color: tpl.theme === "wine" || tpl.theme === "midnight" ? "var(--champagne-gold)" : "var(--rich-burgundy)",
                              border: "1px solid var(--border-gold)",
                              fontSize: "0.7rem",
                            }}
                          >
                            {tpl.occasion}
                          </span>
                          <span className={`badge ${tpl.active ? "badge-published" : "badge-draft"}`} style={{ fontSize: "0.7rem" }}>
                            {tpl.active ? "Active" : "Retired"}
                          </span>
                        </div>

                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", margin: "8px 0 4px" }}>
                          {tpl.title}
                        </h3>
                        <p style={{ fontSize: "0.8rem", opacity: 0.85, margin: 0 }}>{tpl.sampleHost}</p>
                        <p style={{ fontSize: "0.75rem", opacity: 0.75, margin: "4px 0 0", fontStyle: "italic" }}>
                          {tpl.sampleEvent}
                        </p>
                      </div>

                      {/* Card Meta & Actions */}
                      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--muted-taupe)" }}>
                          <span>Theme: <strong>{tpl.theme}</strong></span>
                          <span>Tag: <strong>{tpl.tag}</strong></span>
                        </div>
                        {tpl.subtitle && (
                          <p style={{ fontSize: "0.75rem", color: "var(--muted-taupe)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {tpl.subtitle}
                          </p>
                        )}

                        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                          <button
                            onClick={() => setPreviewTemplate(tpl)}
                            className="btn btn-gold btn-sm"
                            style={{ flex: 1, padding: "6px 10px", fontSize: "0.78rem", gap: 4 }}
                          >
                            <Eye size={13} />
                            <span>Preview</span>
                          </button>
                          <button
                            onClick={() => openEditTemplate(tpl)}
                            className="btn btn-secondary btn-sm"
                            style={{ flex: 1, padding: "6px 10px", fontSize: "0.78rem" }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleToggleTemplateActive(tpl)}
                            disabled={busyId === `toggle-${tpl.id}`}
                            className="btn btn-sm"
                            style={{
                              flex: 1,
                              padding: "6px 10px",
                              fontSize: "0.78rem",
                              backgroundColor: tpl.active ? "var(--warm-ivory)" : "var(--rich-burgundy)",
                              color: tpl.active ? "var(--charcoal)" : "var(--pure-white)",
                              border: "1px solid var(--light-border)",
                            }}
                          >
                            {tpl.active ? "Retire" : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteTemplate(tpl.id, tpl.title)}
                            disabled={busyId === `del-${tpl.id}`}
                            className="btn btn-ghost btn-sm"
                            style={{ color: "#CF1322", padding: "6px 8px" }}
                            title="Delete Template"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* ================= TAB 2: USER DIRECTORY ================= */}
            {activeTab === "users" && (
              <section
                style={{
                  backgroundColor: "var(--pure-white)",
                  borderRadius: 20,
                  border: "1px solid var(--light-border)",
                  boxShadow: "var(--shadow-sm)",
                  padding: "28px 24px",
                  marginBottom: 36,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
                  <div>
                    <h2 style={{ fontSize: "1.45rem", color: "var(--rich-burgundy)", margin: 0 }}>
                      Registered Accounts ({filteredUsers.length})
                    </h2>
                    <p style={{ color: "var(--muted-taupe)", fontSize: "0.85rem", margin: "4px 0 0" }}>
                      Manage account status, verify mobile numbers, and monitor invitation volumes.
                    </p>
                  </div>

                  {/* Search & Status Filters */}
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ position: "relative", minWidth: 220 }}>
                      <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted-taupe)" }} />
                      <input
                        className="studio-input"
                        style={{ padding: "8px 12px 8px 34px", fontSize: "0.85rem" }}
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>

                    <select
                      className="studio-input"
                      style={{ padding: "8px 12px", fontSize: "0.85rem", minWidth: 140 }}
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as "ALL" | "ACTIVE" | "SUSPENDED")}
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="ACTIVE">Active Only</option>
                      <option value="SUSPENDED">Suspended Only</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid var(--light-border)", textAlign: "left", color: "var(--muted-taupe)" }}>
                        <th style={{ padding: "12px 14px", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" }}>User</th>
                        <th style={{ padding: "12px 14px", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" }}>Mobile</th>
                        <th style={{ padding: "12px 14px", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" }}>Role</th>
                        <th style={{ padding: "12px 14px", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" }}>Status</th>
                        <th style={{ padding: "12px 14px", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" }}>Invites</th>
                        <th style={{ padding: "12px 14px", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase" }}>Joined</th>
                        <th style={{ padding: "12px 14px", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => (
                        <tr key={u.id} style={{ borderBottom: "1px solid var(--light-border)" }}>
                          <td style={{ padding: "14px" }}>
                            <div style={{ fontWeight: 600, color: "var(--rich-burgundy)" }}>{u.name}</div>
                            <div style={{ fontSize: "0.78rem", color: "var(--muted-taupe)" }}>{u.email}</div>
                          </td>
                          <td style={{ padding: "14px" }}>
                            {u.phone ? (
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span>{u.phone}</span>
                                {u.phoneVerified ? (
                                  <span className="badge badge-published" style={{ fontSize: "0.68rem", padding: "2px 6px" }}>Verified</span>
                                ) : (
                                  <button
                                    onClick={() => verifyPhone(u)}
                                    disabled={busyId === u.id}
                                    className="btn btn-ghost btn-sm"
                                    style={{ fontSize: "0.72rem", padding: "2px 6px", color: "var(--rich-burgundy)" }}
                                  >
                                    Verify
                                  </button>
                                )}
                              </div>
                            ) : (
                              <span style={{ color: "var(--muted-taupe)", fontSize: "0.8rem" }}>None</span>
                            )}
                          </td>
                          <td style={{ padding: "14px" }}>
                            <span className="badge badge-gold" style={{ fontSize: "0.75rem" }}>{u.role}</span>
                          </td>
                          <td style={{ padding: "14px" }}>
                            <span className={`badge ${u.status === "ACTIVE" ? "badge-published" : "badge-draft"}`} style={{ fontSize: "0.75rem" }}>
                              {u.status}
                            </span>
                          </td>
                          <td style={{ padding: "14px", fontWeight: 600 }}>{u._count.invitations}</td>
                          <td style={{ padding: "14px", fontSize: "0.8rem", color: "var(--muted-taupe)" }}>
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td style={{ padding: "14px", textAlign: "right" }}>
                            {u.role !== "SUPER_ADMIN" && (
                              <button
                                onClick={() => setStatus(u)}
                                disabled={busyId === u.id}
                                className="btn btn-sm"
                                style={{
                                  fontSize: "0.75rem",
                                  padding: "6px 12px",
                                  backgroundColor: u.status === "ACTIVE" ? "#FFF1F0" : "var(--rich-burgundy)",
                                  color: u.status === "ACTIVE" ? "#CF1322" : "var(--pure-white)",
                                  border: u.status === "ACTIVE" ? "1px solid #FFA39E" : "none",
                                }}
                              >
                                {u.status === "ACTIVE" ? "Suspend" : "Activate"}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* ================= TAB 3: ACTIVITY LOGS & ANALYTICS ================= */}
            {activeTab === "activity" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: 24 }}>
                {/* Feature Usage Card */}
                <div
                  style={{
                    backgroundColor: "var(--pure-white)",
                    borderRadius: 20,
                    border: "1px solid var(--light-border)",
                    boxShadow: "var(--shadow-sm)",
                    padding: "28px 24px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                    <Activity size={20} color="var(--rich-burgundy)" />
                    <h3 style={{ fontSize: "1.3rem", color: "var(--rich-burgundy)", margin: 0 }}>
                      Feature Activity Volume
                    </h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {data.featureCounts.map((row) => (
                      <div
                        key={row.feature}
                        style={{
                          padding: "12px 16px",
                          borderRadius: 12,
                          backgroundColor: "var(--warm-ivory)",
                          border: "1px solid var(--light-border)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontWeight: 600, color: "var(--rich-burgundy)", textTransform: "capitalize" }}>
                          {row.feature.replaceAll("_", " ")}
                        </span>
                        <span className="badge badge-gold" style={{ fontSize: "0.82rem" }}>
                          {row._count._all.toLocaleString()} events
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity Stream */}
                <div
                  style={{
                    backgroundColor: "var(--pure-white)",
                    borderRadius: 20,
                    border: "1px solid var(--light-border)",
                    boxShadow: "var(--shadow-sm)",
                    padding: "28px 24px",
                    maxHeight: 520,
                    overflowY: "auto",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                    <Clock size={20} color="var(--rich-burgundy)" />
                    <h3 style={{ fontSize: "1.3rem", color: "var(--rich-burgundy)", margin: 0 }}>
                      Real-Time Activity Stream
                    </h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {data.recentEvents.slice(0, 40).map((event) => (
                      <div
                        key={event.id}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 12,
                          backgroundColor: "var(--warm-ivory)",
                          border: "1px solid var(--light-border)",
                          fontSize: "0.82rem",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontWeight: 700, color: "var(--rich-burgundy)", textTransform: "capitalize" }}>
                            {event.action.replaceAll("_", " ")}
                          </span>
                          <span style={{ color: "var(--muted-taupe)", fontSize: "0.75rem" }}>
                            {new Date(event.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <div style={{ color: "var(--muted-taupe)" }}>
                          {event.user ? (
                            <span>By {event.user.name} ({event.user.email})</span>
                          ) : (
                            <span style={{ fontStyle: "italic" }}>Public Guest / Visitor</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* ================= ADD/EDIT TEMPLATE MODAL ================= */}
      {showTemplateModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(42, 13, 25, 0.82)",
            backdropFilter: "blur(6px)",
            display: "grid",
            placeItems: "center",
            padding: 20,
            overflowY: "auto",
          }}
          onClick={() => setShowTemplateModal(false)}
        >
          <div
            style={{
              width: "min(680px, 100%)",
              backgroundColor: "var(--pure-white)",
              borderRadius: 24,
              padding: "clamp(24px, 4vw, 36px)",
              boxShadow: "var(--shadow-xl)",
              border: "1px solid var(--border-gold)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderBottom: "1px solid var(--light-border)", paddingBottom: 14 }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: 4 }}>
                  {editingTemplateId ? "Editing Template" : "New Studio Design"}
                </span>
                <h3 style={{ fontSize: "1.45rem", color: "var(--rich-burgundy)", margin: 0 }}>
                  {editingTemplateId ? "Update Occasion Template" : "Add Occasion Template"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTemplateModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-taupe)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTemplate} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label className="studio-label">Template Title *</label>
                  <input
                    className="studio-input"
                    value={templateForm.title}
                    onChange={(e) => setTemplateForm({ ...templateForm, title: e.target.value })}
                    placeholder="e.g. Royal Burgundy Palace"
                    required
                  />
                </div>
                <div>
                  <label className="studio-label">Occasion *</label>
                  <select
                    className="studio-input"
                    value={templateForm.occasion}
                    onChange={(e) => setTemplateForm({ ...templateForm, occasion: e.target.value })}
                  >
                    {OCCASIONS.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="studio-label">Design Subtitle / Description</label>
                <input
                  className="studio-input"
                  value={templateForm.subtitle}
                  onChange={(e) => setTemplateForm({ ...templateForm, subtitle: e.target.value })}
                  placeholder="e.g. Deep wine velvet, ivory letterpress & champagne gold foil"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label className="studio-label">Theme Palette *</label>
                  <select
                    className="studio-input"
                    value={templateForm.theme}
                    onChange={(e) => setTemplateForm({ ...templateForm, theme: e.target.value })}
                  >
                    {THEMES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="studio-label">Style Tag</label>
                  <input
                    className="studio-input"
                    value={templateForm.tag}
                    onChange={(e) => setTemplateForm({ ...templateForm, tag: e.target.value })}
                    placeholder="e.g. Luxury Editorial, Whimsical, Romantic"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label className="studio-label">Sample Host Name(s) *</label>
                  <input
                    className="studio-input"
                    value={templateForm.sampleHost}
                    onChange={(e) => setTemplateForm({ ...templateForm, sampleHost: e.target.value })}
                    placeholder="e.g. Siddharth & Ananya"
                    required
                  />
                </div>
                <div>
                  <label className="studio-label">Sample Event Header *</label>
                  <input
                    className="studio-input"
                    value={templateForm.sampleEvent}
                    onChange={(e) => setTemplateForm({ ...templateForm, sampleEvent: e.target.value })}
                    placeholder="e.g. Request the pleasure of your company"
                    required
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label className="studio-label">Sample Date Display</label>
                  <input
                    className="studio-input"
                    value={templateForm.sampleDate}
                    onChange={(e) => setTemplateForm({ ...templateForm, sampleDate: e.target.value })}
                    placeholder="e.g. Saturday, November 28, 2026"
                  />
                </div>
                <div>
                  <label className="studio-label">Sample Venue</label>
                  <input
                    className="studio-input"
                    value={templateForm.sampleVenue}
                    onChange={(e) => setTemplateForm({ ...templateForm, sampleVenue: e.target.value })}
                    placeholder="e.g. The Glasshouse Estate, Udaipur"
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
                <input
                  type="checkbox"
                  id="templateActiveCheck"
                  checked={templateForm.active}
                  onChange={(e) => setTemplateForm({ ...templateForm, active: e.target.checked })}
                  style={{ width: 18, height: 18, accentColor: "var(--rich-burgundy)", cursor: "pointer" }}
                />
                <label htmlFor="templateActiveCheck" style={{ fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
                  Publish template immediately (visible to all users)
                </label>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 14, borderTop: "1px solid var(--light-border)", paddingTop: 16 }}>
                <button
                  type="submit"
                  disabled={busyId === "template-save"}
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  {busyId === "template-save" ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <span>{editingTemplateId ? "Save Template Changes" : "Create Studio Template"}</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowTemplateModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: SUPER ADMIN LIVE TEMPLATE PREVIEW & PNG EXPORT ================= */}
      {previewTemplate && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(42, 13, 25, 0.85)",
            backdropFilter: "blur(8px)",
            display: "grid",
            placeItems: "center",
            padding: 20,
            overflowY: "auto",
          }}
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            style={{
              width: "min(700px, 100%)",
              backgroundColor: "var(--pure-white)",
              borderRadius: 24,
              padding: "clamp(20px, 3.5vw, 32px)",
              boxShadow: "var(--shadow-xl)",
              border: "1px solid var(--border-gold)",
              maxHeight: "92vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 16, borderBottom: "1px solid var(--light-border)", paddingBottom: 12 }}>
              <div>
                <span className="badge badge-gold" style={{ fontSize: "0.7rem", marginBottom: 4 }}>
                  {previewTemplate.occasion} · {previewTemplate.tag}
                </span>
                <h3 style={{ fontSize: "1.35rem", color: "var(--rich-burgundy)", margin: 0 }}>
                  {previewTemplate.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-taupe)" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Template Card Component in High Resolution */}
            <div style={{ width: "100%", maxWidth: 560, display: "flex", justifyContent: "center" }}>
              <InvitationCard
                ref={adminPreviewCardRef}
                data={{
                  title: previewTemplate.title,
                  occasion: previewTemplate.occasion,
                  hostName: previewTemplate.sampleHost,
                  venue: previewTemplate.sampleVenue,
                  message: previewTemplate.sampleEvent,
                  theme: previewTemplate.theme,
                  templateSlug: previewTemplate.slug,
                }}
              />
            </div>

            {/* Preview Toolbar */}
            <div style={{ marginTop: 20, width: "100%", maxWidth: 560, display: "flex", gap: 12 }}>
              <button
                type="button"
                disabled={isExportingPng}
                onClick={async () => {
                  if (!adminPreviewCardRef.current) return;
                  setIsExportingPng(true);
                  try {
                    await downloadInvitationPng(adminPreviewCardRef.current, previewTemplate.title, 2.5);
                    showToast("High-resolution PNG exported successfully!");
                  } catch (err) {
                    console.error("Export error", err);
                    alert("Failed to capture template PNG.");
                  } finally {
                    setIsExportingPng(false);
                  }
                }}
                className="btn btn-gold"
                style={{ flex: 1, justifyContent: "center", padding: "12px 20px", fontWeight: 700 }}
              >
                {isExportingPng ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Rendering 2.5× PNG…</span>
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    <span>Download Production PNG</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="btn btn-secondary"
                style={{ padding: "12px 20px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

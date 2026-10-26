"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

type Mode = "signup" | "login";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"details" | "otp">("details");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function requestOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/auth/otp/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: mode,
          phone,
          ...(mode === "signup" ? { name, email } : {}),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not send OTP.");
      setStage("otp");
      setMessage(data.message || "OTP sent successfully. Please verify your phone number.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send OTP.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: mode,
          phone,
          code,
          ...(mode === "signup" ? { name, email } : {}),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "OTP verification failed.");
      router.push(data.user?.role === "SUPER_ADMIN" ? "/admin" : "/dashboard");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "OTP verification failed.");
    } finally {
      setBusy(false);
    }
  }

  function switchMode(next: Mode) {
    setMode(next);
    setStage("details");
    setError("");
    setMessage("");
    setCode("");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        backgroundColor: "var(--warm-ivory)",
      }}
      className="auth-split-layout"
    >
      {/* ================= LEFT SIDE: DEEP WINE EDITORIAL SHOWCASE ================= */}
      <section
        style={{
          backgroundColor: "var(--deep-wine)",
          color: "var(--pure-white)",
          padding: "clamp(40px, 6vw, 80px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
        className="auth-art-column"
      >
        {/* Subtle Ambient Gold Glow */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: 450,
            height: 450,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(214, 181, 116, 0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Brand Header */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                backgroundColor: "rgba(214, 181, 116, 0.2)",
                border: "1px solid var(--champagne-gold)",
                display: "grid",
                placeItems: "center",
                color: "var(--champagne-gold)",
              }}
            >
              <Sparkles size={18} />
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", fontWeight: 700, color: "#FAF6EF" }}>
              Invite<span style={{ color: "var(--champagne-gold)", fontStyle: "italic", marginLeft: 4 }}>Studio</span>
            </div>
          </Link>
        </div>

        {/* Centerpiece: Gilded Editorial Invitation Frame */}
        <div style={{ margin: "48px 0", position: "relative", zIndex: 2 }}>
          <div
            style={{
              backgroundColor: "rgba(42, 13, 25, 0.8)",
              backdropFilter: "blur(12px)",
              border: "2px solid rgba(214, 181, 116, 0.55)",
              borderRadius: 22,
              padding: "40px 32px",
              textAlign: "center",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
              position: "relative",
            }}
          >
            <div style={{ color: "var(--champagne-gold)", fontSize: "0.9rem", marginBottom: 12 }}>✦ ✦ ✦</div>
            <div style={{ fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--champagne-gold)", marginBottom: 10 }}>
              BESPOKE CELEBRATIONS
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.9rem",
                color: "#FAF6EF",
                lineHeight: 1.25,
                margin: "0 0 10px",
              }}
            >
              Every celebration begins with an extraordinary invitation.
            </h2>
            <div className="gold-divider" style={{ margin: "14px auto" }} />
            <p style={{ fontSize: "0.9rem", color: "var(--champagne-light)", opacity: 0.9, lineHeight: 1.6, maxWidth: 360, margin: "0 auto" }}>
              Curated typography, customized palettes, and one-tap guest verification designed for the moments you treasure.
            </p>
          </div>

          {/* Feature Highlights Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 24 }}>
            {[
              "Instant WhatsApp RSVP",
              "Private Link Sharing",
              "Zero Guest App Needed",
            ].map((feature) => (
              <div
                key={feature}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 999,
                  backgroundColor: "rgba(250, 246, 239, 0.08)",
                  border: "1px solid rgba(214, 181, 116, 0.28)",
                  fontSize: "0.78rem",
                  color: "var(--champagne-light)",
                }}
              >
                <CheckCircle2 size={13} color="var(--champagne-gold)" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ position: "relative", zIndex: 2, fontSize: "0.82rem", color: "var(--champagne-light)", opacity: 0.75 }}>
          © {new Date().getFullYear()} Invite Studio · Confidential & Secure Session
        </div>
      </section>

      {/* ================= RIGHT SIDE: AUTHENTICATION FORM ================= */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(32px, 5vw, 64px) clamp(24px, 6vw, 72px)",
          backgroundColor: "var(--pure-white)",
        }}
      >
        <div style={{ maxWidth: 440, width: "100%", margin: "0 auto" }}>
          {/* Back Link */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--muted-taupe)",
              textDecoration: "none",
              marginBottom: 28,
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Studio</span>
          </Link>

          {/* Segmented Mode Switcher */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              padding: 4,
              backgroundColor: "var(--ivory-surface)",
              borderRadius: 12,
              marginBottom: 28,
              border: "1px solid var(--light-border)",
            }}
          >
            <button
              type="button"
              onClick={() => switchMode("signup")}
              style={{
                padding: "10px 14px",
                border: "none",
                borderRadius: 9,
                fontSize: "0.88rem",
                fontWeight: 700,
                cursor: "pointer",
                backgroundColor: mode === "signup" ? "var(--pure-white)" : "transparent",
                color: mode === "signup" ? "var(--rich-burgundy)" : "var(--muted-taupe)",
                boxShadow: mode === "signup" ? "var(--shadow-sm)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => switchMode("login")}
              style={{
                padding: "10px 14px",
                border: "none",
                borderRadius: 9,
                fontSize: "0.88rem",
                fontWeight: 700,
                cursor: "pointer",
                backgroundColor: mode === "login" ? "var(--pure-white)" : "transparent",
                color: mode === "login" ? "var(--rich-burgundy)" : "var(--muted-taupe)",
                boxShadow: mode === "login" ? "var(--shadow-sm)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              Sign In
            </button>
          </div>

          {/* Form Header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: "2rem", color: "var(--rich-burgundy)", marginBottom: 8 }}>
              {mode === "signup" ? "Welcome to Invite Studio" : "Welcome back"}
            </h1>
            <p style={{ color: "var(--muted-taupe)", fontSize: "0.92rem", margin: 0 }}>
              {stage === "otp"
                ? `Enter the 5-digit verification code sent to ${phone}.`
                : mode === "signup"
                ? "Register your mobile number to create and manage invitation suites."
                : "Sign in with your verified mobile number to view your invitations."}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              role="alert"
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                backgroundColor: "#FFF1F0",
                border: "1px solid #FFA39E",
                color: "#CF1322",
                fontSize: "0.88rem",
                marginBottom: 20,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <div style={{ fontWeight: 700 }}>!</div>
              <div>{error}</div>
            </div>
          )}

          {/* Success / Message Banner */}
          {message && (
            <div
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                backgroundColor: "var(--soft-blush)",
                border: "1px solid var(--dusty-rose)",
                color: "var(--rich-burgundy)",
                fontSize: "0.88rem",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <CheckCircle2 size={16} />
              <div>{message}</div>
            </div>
          )}

          {/* Stage 1: Details Form (Name, Email, Mobile) */}
          {stage === "details" ? (
            <form onSubmit={requestOtp} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {mode === "signup" && (
                <>
                  <div>
                    <label className="studio-label">Full Name</label>
                    <div style={{ position: "relative" }}>
                      <User size={17} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted-taupe)" }} />
                      <input
                        className="studio-input"
                        style={{ paddingLeft: 42 }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Abhishek Adsule"
                        minLength={2}
                        maxLength={80}
                        required
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="studio-label">Email Address</label>
                    <div style={{ position: "relative" }}>
                      <Mail size={17} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted-taupe)" }} />
                      <input
                        className="studio-input"
                        style={{ paddingLeft: 42 }}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="studio-label">Mobile Number (with country code)</label>
                <div style={{ position: "relative" }}>
                  <Phone size={17} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted-taupe)" }} />
                  <input
                    className="studio-input"
                    style={{ paddingLeft: 42 }}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+919876543210"
                    pattern="\+[1-9][0-9]{7,14}"
                    required
                    autoComplete="tel"
                  />
                </div>
                <small style={{ display: "block", color: "var(--muted-taupe)", fontSize: "0.75rem", marginTop: 5 }}>
                  Include +country code (e.g. +91 for India, +1 for US).
                </small>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="btn btn-primary"
                style={{ width: "100%", padding: "14px", marginTop: 8 }}
              >
                {busy ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Please wait…</span>
                  </span>
                ) : (
                  <span>Send Verification OTP</span>
                )}
              </button>
            </form>
          ) : (
            /* Stage 2: OTP Verification Form */
            <form onSubmit={verifyOtp} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label className="studio-label">Verification Code (OTP)</label>
                <div style={{ position: "relative" }}>
                  <Lock size={17} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted-taupe)" }} />
                  <input
                    className="studio-input"
                    style={{
                      paddingLeft: 42,
                      letterSpacing: "0.25em",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                    }}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="Enter 5-digit OTP (e.g. 12345)"
                    minLength={4}
                    maxLength={10}
                    required
                    autoFocus
                  />
                </div>
                <small style={{ display: "block", color: "var(--muted-taupe)", fontSize: "0.76rem", marginTop: 6 }}>
                  Enter any 5-digit OTP (e.g. 12345) to complete verification.
                </small>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="btn btn-primary"
                style={{ width: "100%", padding: "14px" }}
              >
                {busy ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Verifying Code…</span>
                  </span>
                ) : (
                  <span>Verify OTP and Continue</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStage("details");
                  setCode("");
                  setError("");
                }}
                className="btn btn-ghost"
                style={{ width: "100%", fontSize: "0.85rem" }}
              >
                Change mobile number / Resend OTP
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <div style={{ marginTop: 28, textAlign: "center", fontSize: "0.75rem", color: "var(--muted-taupe)", lineHeight: 1.5 }}>
            By continuing, you agree to use your phone number for secure authentication and invitation management.
          </div>
        </div>
      </section>

      {/* Responsive layout CSS */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .auth-split-layout {
            grid-template-columns: 1fr !important;
          }
          .auth-art-column {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { signInWithGoogle, signInWithOTP } from "@/lib/supabase-auth";

const VIBES = [
  { text: "Shadi Biodata.", color: "#fbbf24", badge: "Matrimonial" },
  { text: "Career Flex.", color: "#34d399", badge: "Professional" },
  { text: "Dating Vibe.", color: "#fb7185", badge: "Dating" },
  { text: "Campus Bio.", color: "#38bdf8", badge: "Student" },
  { text: "New in Town.", color: "#a78bfa", badge: "Friends" },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % VIBES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  async function handleOTPSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await signInWithOTP(email);
    setLoading(false);
    if (!error) setOtpSent(true);
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--black)", minHeight: "100vh" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "5rem 5rem",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      {/* Orange glow top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16"
        style={{ paddingTop: "120px", paddingBottom: "100px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT — Headline + Auth block */}
          <div>
            {/* Eyebrow pill */}
            <div
              className="inline-flex items-center gap-2 mb-8"
              style={{
                padding: "8px 16px",
                borderRadius: 100,
                border: "1px solid #27272a",
                background: "rgba(24,24,27,0.6)",
                fontSize: 12,
                color: "#a1a1aa",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  display: "inline-block",
                  animation: "pulse-dot 2s infinite",
                }}
              />
              Your personal page. One shareable link.
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(44px, 6vw, 80px)",
                letterSpacing: "-4px",
                lineHeight: 0.95,
                marginBottom: 32,
              }}
            >
              One Link.<br />
              Total Control.<br />
              <span style={{ color: VIBES[index].color, transition: "color 0.5s" }}>
                {VIBES[index].text}
              </span>
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontSize: 17,
                color: "var(--muted)",
                lineHeight: 1.75,
                maxWidth: 440,
                marginBottom: 48,
              }}
            >
              Stop sending dusty PDFs. Create a stunning personal page in 2 minutes — matrimonial biodata, dating profile, professional portfolio and more.
            </p>

            {/* AUTH BLOCK — fully separated, high contrast */}
            <div
              style={{
                background: "var(--gray)",
                border: "1px solid #2d2d2d",
                borderRadius: 20,
                padding: 28,
                maxWidth: 420,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#a1a1aa",
                  marginBottom: 16,
                  letterSpacing: "0.03em",
                }}
              >
                GET STARTED — FREE FOREVER
              </div>

              {!showOTP ? (
                <div style={{ display: "grid", gap: 10 }}>
                  {/* Google button */}
                  <button
                    onClick={signInWithGoogle}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      width: "100%",
                      padding: "14px 20px",
                      background: "var(--white)",
                      color: "var(--black)",
                      border: "none",
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "opacity 0.15s, transform 0.15s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    }}
                  >
                    <GoogleIcon />
                    Continue with Google
                  </button>

                  {/* Divider */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "4px 0",
                    }}
                  >
                    <div style={{ flex: 1, height: 1, background: "#2d2d2d" }} />
                    <span style={{ fontSize: 11, color: "#52525b", fontWeight: 600 }}>OR</span>
                    <div style={{ flex: 1, height: 1, background: "#2d2d2d" }} />
                  </div>

                  {/* Email button */}
                  <button
                    onClick={() => setShowOTP(true)}
                    style={{
                      width: "100%",
                      padding: "14px 20px",
                      background: "transparent",
                      border: "1px solid #2d2d2d",
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#a1a1aa",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "border-color 0.15s, color 0.15s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#52525b";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--white)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#2d2d2d";
                      (e.currentTarget as HTMLButtonElement).style.color = "#a1a1aa";
                    }}
                  >
                    Continue with email →
                  </button>

                  <div style={{ fontSize: 11, color: "#3f3f46", textAlign: "center", paddingTop: 4 }}>
                    No credit card · No password · 2 min setup
                  </div>
                </div>
              ) : otpSent ? (
                <div
                  style={{
                    padding: 20,
                    background: "rgba(52,211,153,0.06)",
                    border: "1px solid rgba(52,211,153,0.2)",
                    borderRadius: 12,
                  }}
                >
                  <div style={{ color: "#34d399", fontWeight: 700, marginBottom: 8, fontSize: 14 }}>
                    ✅ Check your email!
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
                    We sent a magic link to{" "}
                    <strong style={{ color: "var(--white)" }}>{email}</strong>.
                    Click it to sign in — no password needed.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleOTPSubmit} style={{ display: "grid", gap: 10 }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "var(--black)",
                      border: "1px solid #2d2d2d",
                      borderRadius: 12,
                      fontSize: 14,
                      color: "var(--white)",
                      fontFamily: "'DM Sans', sans-serif",
                      outline: "none",
                    }}
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        flex: 1,
                        padding: "14px 20px",
                        background: "var(--orange)",
                        color: "#000",
                        border: "none",
                        borderRadius: 12,
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {loading ? "Sending..." : "Send magic link →"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowOTP(false)}
                      style={{
                        padding: "14px 16px",
                        background: "transparent",
                        border: "1px solid #2d2d2d",
                        borderRadius: 12,
                        fontSize: 14,
                        color: "var(--muted)",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      ← Back
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT — Phone mockup */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 300,
                aspectRatio: "9/16",
                background: "#18181b",
                border: "4px solid #2a2a2a",
                borderRadius: 44,
                padding: 18,
                overflow: "hidden",
                boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Notch */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  height: 22,
                  width: 110,
                  background: "#111",
                  borderRadius: "0 0 16px 16px",
                  zIndex: 20,
                }}
              />

              {/* Inner glow */}
              <div
                style={{
                  position: "absolute",
                  inset: -60,
                  opacity: 0.12,
                  filter: "blur(50px)",
                  borderRadius: "50%",
                  background: VIBES[index].color,
                  transition: "background 0.7s",
                  pointerEvents: "none",
                }}
              />

              {/* Content */}
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  zIndex: 10,
                  paddingTop: 20,
                }}
              >
                <div style={{ display: "grid", gap: 12 }}>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      background: "#1f1f1f",
                      borderRadius: 8,
                      fontSize: 10,
                      fontWeight: 700,
                      color: VIBES[index].color,
                      transition: "color 0.5s",
                      letterSpacing: "0.06em",
                      width: "fit-content",
                    }}
                  >
                    {VIBES[index].badge} Mode
                  </div>

                  <div
                    style={{
                      height: 120,
                      background: "#1f1f1f",
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 36,
                      border: "1px solid #2a2a2a",
                    }}
                  >
                    ✨
                  </div>

                  <div
                    style={{
                      padding: "8px 12px",
                      background: "#fff",
                      borderRadius: 8,
                      fontSize: 9,
                      color: "#000",
                      fontWeight: 700,
                    }}
                  >
                    myflexpage.com/username
                  </div>

                  <div
                    style={{
                      height: 6,
                      background: "#2a2a2a",
                      borderRadius: 4,
                      width: "55%",
                    }}
                  />

                  <div
                    style={{
                      padding: 14,
                      border: "1px solid #2a2a2a",
                      background: "rgba(0,0,0,0.4)",
                      borderRadius: 12,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#e4e4e7",
                        marginBottom: 6,
                        letterSpacing: "0.04em",
                      }}
                    >
                      CURRENT FLEX
                    </div>
                    <div style={{ fontSize: 8, color: "#71717a", lineHeight: 1.6 }}>
                      {VIBES[index].badge === "Matrimonial" && "Hindu · Delhi · 26 · Software Engineer · Family-oriented"}
                      {VIBES[index].badge === "Professional" && "5+ yrs exp · 17 projects · Open to opportunities"}
                      {VIBES[index].badge === "Dating" && "Coffee addict · Weekend hiker · Looking for something real"}
                      {VIBES[index].badge === "Student" && "B.Tech CSE · Year 3 · Seeking internship in ML/AI"}
                      {VIBES[index].badge === "Friends" && "Just moved to Bangalore · Looking for gym buddy + foodies"}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #1f1f1f",
                    paddingTop: 10,
                    fontSize: 8,
                    color: "#3f3f46",
                    textAlign: "center",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  ⚡ Made with myflexpage.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
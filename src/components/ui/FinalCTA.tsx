"use client";

import { signInWithGoogle } from "@/lib/supabase-auth";

export function FinalCTA() {
  return (
    <section
      className="section-wrap"
      style={{ background: "var(--black)" }}
    >
      <div className="section-inner">
        <div
          style={{
            background: "var(--gray)",
            border: "1px solid var(--border)",
            borderRadius: 28,
            padding: "clamp(48px, 6vw, 80px) clamp(32px, 5vw, 80px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 300,
              background:
                "radial-gradient(ellipse, rgba(249,115,22,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 900,
                letterSpacing: "-4px",
                lineHeight: 0.95,
                marginBottom: 20,
              }}
            >
              Ready to{" "}
              <span style={{ color: "var(--orange)" }}>flex?</span>
            </h2>

            <p
              style={{
                fontSize: 16,
                color: "var(--muted)",
                lineHeight: 1.7,
                marginBottom: 40,
                maxWidth: 400,
                margin: "0 auto 40px",
              }}
            >
              Takes 2 minutes. Free forever.<br />
              No credit card needed.
            </p>

            <button
              onClick={signInWithGoogle}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "18px 40px",
                background: "var(--white)",
                color: "var(--black)",
                border: "none",
                borderRadius: 16,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-3px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 12px 40px rgba(249,115,22,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 4px 24px rgba(0,0,0,0.3)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Create your FlexPage free
            </button>

            <div
              style={{
                fontSize: 12,
                color: "#3f3f46",
                marginTop: 16,
              }}
            >
              Sign in with Google · or use email OTP · no password ever
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(24px, 5vw, 80px)",
                marginTop: 56,
                paddingTop: 40,
                borderTop: "1px solid var(--border)",
              }}
            >
              {[
                { num: "2 min", label: "to set up" },
                { num: "6", label: "page types" },
                { num: "₹0", label: "to start" },
                { num: "100%", label: "your data" },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(22px, 3vw, 36px)",
                      fontWeight: 900,
                      letterSpacing: "-1px",
                      color: "var(--white)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      marginTop: 6,
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
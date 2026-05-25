"use client";

import { signInWithGoogle } from "@/lib/supabase-auth";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    popular: false,
    cta: "Get started free",
    note: "No credit card required",
    features: [
      { text: "1 page, 1 page type", on: true },
      { text: "3 photos max", on: true },
      { text: "Aarambh template", on: true },
      { text: "WhatsApp share card", on: true },
      { text: "FlexPage watermark", on: true },
      { text: "Remove watermark", on: false },
      { text: "View analytics", on: false },
      { text: "Shield privacy", on: false },
      { text: "AI bio writer", on: false },
    ],
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/ year",
    popular: true,
    cta: "Upgrade to Pro",
    note: "That's just ₹25/month",
    features: [
      { text: "2 pages, all 6 types", on: true },
      { text: "10 photos + gallery", on: true },
      { text: "4 templates", on: true },
      { text: "No watermark", on: true },
      { text: "View analytics", on: true },
      { text: "Link Only privacy", on: true },
      { text: "Shield mode — 1 page", on: true },
      { text: "AI bio writer", on: false },
      { text: "Language toggle", on: false },
    ],
  },
  {
    name: "Premium",
    price: "₹699",
    period: "/ year",
    popular: false,
    cta: "Go Premium",
    note: "That's just ₹58/month",
    features: [
      { text: "5 pages, all 6 types", on: true },
      { text: "20 photos + gallery", on: true },
      { text: "All 6 templates", on: true },
      { text: "No watermark", on: true },
      { text: "Analytics + daily chart", on: true },
      { text: "🛡️ Shield — all pages", on: true },
      { text: "AI bio writer", on: true },
      { text: "Language toggle", on: true },
      { text: "CV upload + download", on: true },
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="section-wrap"
      style={{ background: "var(--black)" }}
    >
      <div className="section-inner">
        <span className="section-eyebrow">Pricing</span>

        <h2 className="section-title">
          Simple pricing.<br />No surprises.
        </h2>

        <p
          style={{
            fontSize: 15,
            color: "var(--muted)",
            marginBottom: 48,
            marginTop: -32,
          }}
        >
          Start free. Sign in with Google → pick a plan → pay. Takes 2 minutes.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            alignItems: "start",
          }}
        >
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              style={{
                position: "relative",
                background: "var(--gray)",
                border: plan.popular
                  ? "1px solid var(--orange)"
                  : "1px solid var(--border)",
                borderRadius: 24,
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 0,
                boxShadow: plan.popular
                  ? "0 0 48px rgba(249,115,22,0.08)"
                  : "none",
                transform: plan.popular ? "scale(1.02)" : "scale(1)",
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: -16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--orange)",
                    color: "#000",
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "5px 16px",
                    borderRadius: 100,
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 16,
                }}
              >
                {plan.name}
              </div>

              {/* Price */}
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 52,
                  fontWeight: 900,
                  letterSpacing: "-3px",
                  lineHeight: 1,
                  color: "var(--white)",
                }}
              >
                {plan.price}
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: "#52525b",
                  marginTop: 6,
                  marginBottom: 8,
                }}
              >
                {plan.period}
              </div>

              {/* Note */}
              <div
                style={{
                  fontSize: 12,
                  color: plan.popular ? "var(--orange)" : "#52525b",
                  fontWeight: 600,
                  marginBottom: 28,
                  padding: "6px 12px",
                  background: plan.popular
                    ? "rgba(249,115,22,0.08)"
                    : "var(--gray2)",
                  borderRadius: 8,
                  display: "inline-block",
                  width: "fit-content",
                }}
              >
                {plan.note}
              </div>

              {/* Features */}
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: 24,
                  marginBottom: 28,
                  display: "grid",
                  gap: 14,
                }}
              >
                {plan.features.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16,
                        color: f.on ? "var(--orange)" : "#3f3f46",
                        flexShrink: 0,
                        lineHeight: 1,
                      }}
                    >
                      {f.on ? "✦" : "○"}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: f.on ? "#e4e4e7" : "#52525b",
                        textDecoration: f.on ? "none" : "line-through",
                        textDecorationColor: "#3f3f46",
                        lineHeight: 1.4,
                      }}
                    >
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={signInWithGoogle}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  borderRadius: "var(--radius-btn)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  border: "none",
                  transition: "opacity 0.15s, transform 0.15s",
                  background: plan.popular ? "var(--orange)" : "#27272a",
                  color: plan.popular ? "#000" : "#e4e4e7",
                  boxShadow: plan.popular
                    ? "0 4px 20px rgba(249,115,22,0.25)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(0)";
                }}
              >
                {plan.cta} →
              </button>

              <div
                style={{
                  fontSize: 11,
                  color: "#3f3f46",
                  textAlign: "center",
                  marginTop: 12,
                }}
              >
                {plan.name === "Free"
                  ? "No credit card ever"
                  : "Sign in → pay → done"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Can I hide my matrimonial page from my professional clients?",
    a: "Yes — each page type has its own unique URL. Your matrimonial page at myflexpage.com/priya-shaadi is completely separate from your professional page at myflexpage.com/priya-work. Your clients will never see your biodata unless you share that specific link with them.",
  },
  {
    q: "How long does the free tier last?",
    a: "Forever. No credit card required. No trial period. The free tier gives you one page, 3 photos, and a basic template — permanently. You only upgrade when you want more features.",
  },
  {
    q: "Can I download my profile as a PDF?",
    a: "Yes — PDF biodata export is available on Premium (₹699/year). It generates a beautifully formatted PDF version of your matrimonial biodata that you can share or print for traditional family exchanges.",
  },
  {
    q: "What is Shield mode exactly?",
    a: "Shield mode hides your full profile from strangers. Visitors only see your name, one photo, and your tagline. To see more, they must send you an access request. You approve or decline — approved people get a private link valid for 7 days that you can revoke anytime.",
  },
  {
    q: "Will my FlexPage show up on Google search?",
    a: "On the free tier, pages are publicly indexed by default. On Pro, you can disable Google indexing with one toggle. On Premium, indexing is always off — your page is only accessible to people you share the link with.",
  },
  {
    q: "Can I update my page after sharing the link?",
    a: "Yes — this is one of the biggest advantages over PDFs. You can edit your page anytime and the link stays exactly the same. Got a new job? Update it. New photos? Upload them. Your shared link always shows the latest version.",
  },
  {
    q: "When do I pay — before or after signing in?",
    a: "You sign in first with Google or email, then choose your plan and pay via Razorpay. The whole flow takes under 2 minutes. We support UPI, credit/debit cards, and NetBanking. Your plan upgrades instantly after payment.",
  },
  {
    q: "Is my personal data safe?",
    a: "Yes. Your data is stored securely on Supabase infrastructure. We never sell your data to third parties. You can delete your account and all associated data at any time from your dashboard. We are compliant with India's DPDP Act 2023.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="section-wrap"
      style={{ background: "var(--black)" }}
    >
      <div className="section-inner" style={{ maxWidth: 800 }}>
        <span className="section-eyebrow">FAQ</span>

        <h2 className="section-title">
          Questions?<br />
          <span style={{ color: "var(--muted)" }}>We got you.</span>
        </h2>

        <div style={{ display: "grid", gap: 10 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                background: open === i ? "var(--gray)" : "var(--gray2)",
                border: open === i
                  ? "1px solid rgba(249,115,22,0.25)"
                  : "1px solid var(--border)",
                borderRadius: 16,
                overflow: "hidden",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              {/* Question button */}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 20,
                  padding: "22px 28px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: open === i ? "var(--white)" : "#d4d4d8",
                    lineHeight: 1.5,
                  }}
                >
                  {faq.q}
                </span>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: open === i ? "var(--orange)" : "var(--border)",
                    color: open === i ? "#000" : "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 700,
                    flexShrink: 0,
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s, background 0.2s, color 0.2s",
                  }}
                >
                  +
                </span>
              </button>

              {/* Answer */}
              {open === i && (
                <div
                  style={{
                    padding: "0 28px 24px 28px",
                    borderTop: "1px solid var(--border)",
                    paddingTop: 20,
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--muted)",
                      lineHeight: 1.8,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
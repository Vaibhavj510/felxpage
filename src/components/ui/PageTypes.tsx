"use client";

import { useState } from "react";

const PAGES = [
  {
    id: "matrimonial",
    label: "💍 Matrimonial",
    name: "Priya Sharma",
    meta: "26 · Delhi · Hindu · Software Engineer",
    tags: ["5ft 4in", "B.Tech CSE", "Family-oriented", "Vegetarian"],
    bio: "I believe in building a home that is warm, full of laughter, and good food. Engineering by profession, passionate cook by choice. Looking for someone who values family and adventure equally.",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.05)",
    border: "rgba(251,191,36,0.15)",
    emoji: "💍",
    stats: ["Delhi", "Hindu", "26 yrs"],
  },
  {
    id: "professional",
    label: "💼 Professional",
    name: "Vaibhav Jadhav",
    meta: "MES Engineer · Deloitte · Germany",
    tags: ["5+ yrs exp", "17 projects", "10 countries", "Open to work"],
    bio: "Industrial automation specialist with hands-on experience across Europe and India. DAAD scholar. I build smart factories and occasionally climb mountains on weekends.",
    color: "#34d399",
    bg: "rgba(52,211,153,0.05)",
    border: "rgba(52,211,153,0.15)",
    emoji: "💼",
    stats: ["Germany", "Deloitte", "5+ yrs"],
  },
  {
    id: "dating",
    label: "❤️ Dating",
    name: "Ananya",
    meta: "24 · Mumbai · Product Designer",
    tags: ["Coffee addict", "Weekend hiker", "Bookworm"],
    bio: "Designing apps by day, reading terrible fantasy novels by night. I love long drives, filter coffee, and people who laugh at their own jokes. Looking for something real, no pressure.",
    color: "#fb7185",
    bg: "rgba(251,113,133,0.05)",
    border: "rgba(251,113,133,0.15)",
    emoji: "❤️",
    stats: ["Mumbai", "24 yrs", "Designer"],
  },
  {
    id: "hobbies",
    label: "🎨 Hobbies",
    name: "Rohan's Lens",
    meta: "Travel Photographer · Bangalore",
    tags: ["Street photography", "28 countries", "Open to collabs"],
    bio: "I chase light and stories across India and beyond. From the ghats of Varanasi to the streets of Istanbul, my camera finds the human in everything.",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.05)",
    border: "rgba(167,139,250,0.15)",
    emoji: "🎨",
    stats: ["Bangalore", "28 countries", "Photographer"],
  },
  {
    id: "newInTown",
    label: "🏙️ New in Town",
    name: "Karthik M.",
    meta: "Just moved to Bangalore from Chennai",
    tags: ["Gym buddy wanted", "Foodie", "Koramangala"],
    bio: "Moved to Bangalore 3 weeks ago for a new job. Still figuring out which filter coffee place is actually the best. Know a good biryani spot? Let's connect!",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.05)",
    border: "rgba(251,191,36,0.15)",
    emoji: "🏙️",
    stats: ["Bangalore", "From Chennai", "3 weeks"],
  },
  {
    id: "student",
    label: "🎓 Student",
    name: "Sneha Patel",
    meta: "B.Tech CSE · Year 3 · BITS Pilani",
    tags: ["ML enthusiast", "3 projects", "Seeking internship"],
    bio: "Building things that matter. Currently working on an AI-based crop disease detection system for farmers. Looking for a summer internship in ML or AI.",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.05)",
    border: "rgba(56,189,248,0.15)",
    emoji: "🎓",
    stats: ["BITS Pilani", "Year 3", "ML/AI"],
  },
];

export function PageTypes() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const page = PAGES[active];

  function switchTab(i: number) {
    if (i === active) return;
    setVisible(false);
    setTimeout(() => {
      setActive(i);
      setVisible(true);
    }, 180);
  }

  return (
    <section
      style={{
        background: "var(--black)",
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
        paddingLeft: "clamp(24px, 6vw, 96px)",
        paddingRight: "clamp(24px, 6vw, 96px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "#f97316",
            marginBottom: 20,
            display: "block",
          }}
        >
          What you can build
        </span>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(36px, 5vw, 68px)",
            letterSpacing: "-3px",
            lineHeight: 1.0,
            marginBottom: 16,
            color: "#f4f4f5",
          }}
        >
          One platform.
          <br />
          Every introduction.
        </h2>

        {/* Sub heading */}
        <p
          style={{
            fontSize: 16,
            color: "#71717a",
            lineHeight: 1.7,
            marginBottom: 48,
            maxWidth: 520,
          }}
        >
          Six different page types — each built for a specific moment in your life.
          Pick yours and go live in 2 minutes.
        </p>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 40,
          }}
        >
          {PAGES.map((p, i) => (
            <button
              key={p.id}
              onClick={() => switchTab(i)}
              style={{
                padding: "11px 22px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                border: active === i
                  ? "1px solid #f97316"
                  : "1px solid #2a2a2a",
                background: active === i ? "#f97316" : "#141414",
                color: active === i ? "#000" : "#71717a",
                fontFamily: "DM Sans, sans-serif",
                transition: "all 0.15s",
                transform: active === i ? "scale(1.04)" : "scale(1)",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Preview card with fade */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          <div
            style={{
              background: page.bg,
              border: "1px solid " + page.border,
              borderRadius: 28,
              padding: "clamp(32px, 5vw, 56px)",
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: "clamp(32px, 5vw, 56px)",
              alignItems: "start",
            }}
          >
            {/* Left — avatar panel */}
            <div
              style={{
                borderRadius: 20,
                background: page.color + "18",
                border: "1px solid " + page.border,
                padding: "32px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                minHeight: 260,
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: 64, lineHeight: 1 }}>{page.emoji}</div>
              <div
                style={{
                  display: "grid",
                  gap: 8,
                  width: "100%",
                }}
              >
                {page.stats.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "7px 12px",
                      borderRadius: 8,
                      background: "rgba(0,0,0,0.35)",
                      color: page.color,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — content */}
            <div style={{ paddingTop: 4 }}>
              {/* Name */}
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(24px, 3.5vw, 40px)",
                  fontWeight: 900,
                  letterSpacing: "-1.5px",
                  marginBottom: 10,
                  lineHeight: 1.1,
                  color: "#f4f4f5",
                }}
              >
                {page.name}
              </h3>

              {/* Meta */}
              <p
                style={{
                  fontSize: 15,
                  color: "#71717a",
                  marginBottom: 24,
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                {page.meta}
              </p>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 28,
                }}
              >
                {page.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "7px 16px",
                      borderRadius: 100,
                      fontSize: 13,
                      fontWeight: 600,
                      background: "rgba(0,0,0,0.3)",
                      color: page.color,
                      border: "1px solid " + page.border,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p
                style={{
                  fontSize: 15,
                  color: "#a1a1aa",
                  lineHeight: 1.8,
                  marginBottom: 32,
                  maxWidth: 540,
                }}
              >
                {page.bio}
              </p>

              {/* URL pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 20px",
                  borderRadius: 100,
                  background: page.color + "12",
                  border: "1px solid " + page.border,
                  fontSize: 13,
                  fontWeight: 700,
                  color: page.color,
                  letterSpacing: "0.01em",
                }}
              >
                myflexpage.com/{page.name.split(" ")[0].toLowerCase()} →
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p
          style={{
            fontSize: 13,
            color: "#3f3f46",
            textAlign: "center",
            marginTop: 24,
            fontWeight: 500,
          }}
        >
          Each page type has its own fields, sections and templates — built
          specifically for that use case.
        </p>
      </div>
    </section>
  );
}

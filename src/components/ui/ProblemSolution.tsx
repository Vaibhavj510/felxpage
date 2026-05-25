export function ProblemSolution() {
  const oldWay = [
    { icon: "📄", text: "Word doc biodata sent on WhatsApp" },
    { icon: "🔗", text: "LinkedIn — too corporate, too stiff" },
    { icon: "📸", text: "Random Instagram link with no context" },
    { icon: "😰", text: "No privacy — anyone can Google you" },
    { icon: "🤷", text: "Cannot update once shared" },
    { icon: "💀", text: "Looks terrible on mobile" },
  ];

  const flexWay = [
    { icon: "✨", text: "Beautiful page, one shareable link" },
    { icon: "🛡️", text: "Shield mode — only approved people see all" },
    { icon: "📱", text: "Stunning WhatsApp preview card" },
    { icon: "🔄", text: "Update anytime — link stays the same" },
    { icon: "📊", text: "See exactly who viewed your page" },
    { icon: "🚀", text: "Ready in 2 minutes, free forever" },
  ];

  return (
    <section
      style={{
        background: "var(--black)",
        paddingTop: "clamp(64px, 8vw, 120px)",
        paddingBottom: "clamp(64px, 8vw, 120px)",
        paddingLeft: "clamp(24px, 6vw, 96px)",
        paddingRight: "clamp(24px, 6vw, 96px)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "var(--orange)",
            marginBottom: 16,
            display: "block",
          }}
        >
          The Problem
        </span>

        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(32px, 4.5vw, 60px)",
            letterSpacing: "-2.5px",
            lineHeight: 1.0,
            marginBottom: 48,
            color: "#f4f4f5",
          }}
        >
          Stop sending
          <br />
          boring PDFs.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {/* Old way */}
          <div
            style={{
              background: "var(--gray)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: 36,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: "var(--muted)",
                marginBottom: 28,
              }}
            >
              The old way
            </div>
            {oldWay.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom:
                    i < oldWay.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* FlexPage way */}
          <div
            style={{
              background: "rgba(249,115,22,0.04)",
              border: "1px solid rgba(249,115,22,0.2)",
              borderRadius: 20,
              padding: 36,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: "var(--orange)",
                marginBottom: 28,
              }}
            >
              The FlexPage way
            </div>
            {flexWay.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom:
                    i < flexWay.length - 1
                      ? "1px solid rgba(249,115,22,0.07)"
                      : "none",
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: "#e4e4e7", lineHeight: 1.5 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
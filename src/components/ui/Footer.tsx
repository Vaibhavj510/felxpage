export function Footer() {
  const links = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "mailto:hello@myflexpage.com" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--black)",
        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: "clamp(24px, 6vw, 96px)",
        paddingRight: "clamp(24px, 6vw, 96px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 900,
            fontSize: 18,
          }}
        >
          Flex<span style={{ color: "var(--orange)" }}>Page</span>
        </div>

        <div style={{ display: "flex", gap: 28 }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: 13,
                color: "var(--muted)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ fontSize: 12, color: "#3f3f46" }}>
          2025 FlexPage · Made with love in India
        </div>
      </div>
    </footer>
  );
}

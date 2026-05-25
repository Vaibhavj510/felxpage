function getInitialsAvatar(name: string, bg: string) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${bg}"/><text x="100" y="115" font-family="Arial" font-size="72" font-weight="bold" fill="white" text-anchor="middle">${initials}</text></svg>`)}`;
}

export function NewInTownTemplate({ profile, photos }: { profile: any; photos: any[] }) {
  const d = profile.data || {};
  const name = d.name || d.full_name || profile.username;
  const primaryPhoto = photos.find((p) => p.is_primary) || photos[0];

  return (
    <div style={{ minHeight: "100vh", background: "#FFFBF0", fontFamily: "DM Sans, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#D97706", padding: "16px clamp(24px, 6vw, 96px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 18, color: "#fff" }}>FlexPage</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>myflexpage.com/{profile.username}</div>
      </div>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #D97706, #F59E0B)", padding: "clamp(48px, 8vw, 80px) clamp(24px, 6vw, 96px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 600, marginBottom: 12, letterSpacing: "0.05em" }}>
              NEW IN TOWN
            </div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-2px", color: "#fff", marginBottom: 12, lineHeight: 1.0 }}>
              Hey, I am {name}!
            </h1>
            {d.from_city && d.current_city && (
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 16 }}>
                From {d.from_city} · Now in {d.current_city}
              </p>
            )}
            {d.looking_for && d.looking_for.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {d.looking_for.map((item: string, i: number) => (
                  <span key={i} style={{ padding: "5px 14px", borderRadius: 100, background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 12, fontWeight: 600 }}>
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div style={{ width: 140, height: 140, borderRadius: "50%", overflow: "hidden", border: "4px solid rgba(255,255,255,0.3)", flexShrink: 0 }}>
            {primaryPhoto
              ? <img src={primaryPhoto.url} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <img src={getInitialsAvatar(name, "#D97706")} alt={name} style={{ width: "100%", height: "100%" }} />
            }
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(32px, 5vw, 64px) clamp(24px, 6vw, 96px)" }}>

        {d.why_moved && (
          <NITSection title="Why I moved">
            <p style={{ fontSize: 15, color: "#4A4A4A", lineHeight: 1.8, maxWidth: 600 }}>{d.why_moved}</p>
          </NITSection>
        )}

        {d.about && (
          <NITSection title="About Me">
            <p style={{ fontSize: 15, color: "#4A4A4A", lineHeight: 1.8, maxWidth: 600 }}>{d.about}</p>
          </NITSection>
        )}

        {d.vibe_tags && d.vibe_tags.length > 0 && (
          <NITSection title="My Vibe">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {d.vibe_tags.map((tag: string, i: number) => (
                <span key={i} style={{ padding: "8px 16px", borderRadius: 100, background: "#FEF3C7", border: "1px solid #FDE68A", color: "#92400E", fontSize: 13, fontWeight: 600 }}>
                  {tag}
                </span>
              ))}
            </div>
          </NITSection>
        )}

        {d.miss_from_home && (
          <NITSection title="What I miss from home">
            <div style={{ background: "rgba(217,119,6,0.06)", border: "1px solid rgba(217,119,6,0.15)", borderRadius: 16, padding: "20px 24px" }}>
              <p style={{ fontSize: 15, color: "#4A4A4A", lineHeight: 1.8 }}>{d.miss_from_home}</p>
            </div>
          </NITSection>
        )}

        {d.neighbourhood && (
          <NITSection title="Where I am">
            <p style={{ fontSize: 15, color: "#4A4A4A" }}>📍 {d.neighbourhood}, {d.current_city}</p>
          </NITSection>
        )}

        {/* Contact */}
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid #FDE68A", display: "flex", gap: 12, flexWrap: "wrap" }}>
          {d.whatsapp && (
            <a href={`https://wa.me/${d.whatsapp}`} style={{ padding: "12px 24px", borderRadius: 10, background: "#25D366", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              WhatsApp me
            </a>
          )}
          {d.email && (
            <a href={`mailto:${d.email}`} style={{ padding: "12px 24px", borderRadius: 10, background: "#D97706", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Email me
            </a>
          )}
          {d.coffee_chat_url && (
            <a href={d.coffee_chat_url} target="_blank" rel="noreferrer" style={{ padding: "12px 24px", borderRadius: 10, background: "#1C1C1C", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Book a coffee chat
            </a>
          )}
        </div>

        <div style={{ marginTop: 40, textAlign: "center", fontSize: 12, color: "#999" }}>
          Made with <a href="/" style={{ color: "#D97706", textDecoration: "none", fontWeight: 600 }}>FlexPage</a>
        </div>
      </div>
    </div>
  );
}

function NITSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#D97706", marginBottom: 20 }}>
        {title}
      </div>
      {children}
    </div>
  );
}
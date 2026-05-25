function getInitialsAvatar(name: string, bg: string) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${bg}"/><text x="100" y="115" font-family="Arial" font-size="72" font-weight="bold" fill="white" text-anchor="middle">${initials}</text></svg>`)}`;
}

export function DatingTemplate({ profile, photos }: { profile: any; photos: any[] }) {
  const d = profile.data || {};
  const name = d.first_name || d.full_name || profile.username;
  const primaryPhoto = photos.find((p) => p.is_primary) || photos[0];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "DM Sans, sans-serif", color: "#f4f4f5" }}>

      {/* Header */}
      <div style={{ padding: "16px clamp(24px, 6vw, 96px)", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 18, color: "#f4f4f5" }}>FlexPage</div>
        <div style={{ fontSize: 12, color: "#52525b" }}>myflexpage.com/{profile.username}</div>
      </div>

      {/* Hero */}
      <div style={{ padding: "clamp(48px, 8vw, 80px) clamp(24px, 6vw, 96px)", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
              <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-2px", color: "#f4f4f5", lineHeight: 1.0 }}>
                {name}
              </h1>
              {d.age && <span style={{ fontSize: 24, color: "#fb7185", fontWeight: 700 }}>{d.age}</span>}
            </div>
            {d.city && <p style={{ fontSize: 15, color: "#71717a", marginBottom: 20 }}>📍 {d.city}</p>}
            {d.vibe_tags && d.vibe_tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {d.vibe_tags.map((tag: string, i: number) => (
                  <span key={i} style={{ padding: "6px 14px", borderRadius: 100, background: "rgba(251,113,133,0.1)", border: "1px solid rgba(251,113,133,0.2)", color: "#fb7185", fontSize: 12, fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
          <div style={{ width: 140, height: 140, borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(251,113,133,0.3)", flexShrink: 0 }}>
            {primaryPhoto
              ? <img src={primaryPhoto.url} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <img src={getInitialsAvatar(name, "#BE185D")} alt={name} style={{ width: "100%", height: "100%" }} />
            }
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(24px, 6vw, 96px) clamp(48px, 8vw, 80px)" }}>

        {d.about && (
          <DatingSection title="About Me">
            <p style={{ fontSize: 15, color: "#a1a1aa", lineHeight: 1.8, maxWidth: 600 }}>{d.about}</p>
          </DatingSection>
        )}

        {d.interests && d.interests.length > 0 && (
          <DatingSection title="My Interests">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {d.interests.map((interest: string, i: number) => (
                <span key={i} style={{ padding: "8px 16px", borderRadius: 100, background: "#141414", border: "1px solid #2a2a2a", color: "#f4f4f5", fontSize: 13, fontWeight: 500 }}>{interest}</span>
              ))}
            </div>
          </DatingSection>
        )}

        {d.looking_for && (
          <DatingSection title="Looking For">
            <div style={{ background: "rgba(251,113,133,0.06)", border: "1px solid rgba(251,113,133,0.15)", borderRadius: 16, padding: "20px 24px" }}>
              <p style={{ fontSize: 15, color: "#a1a1aa", lineHeight: 1.8 }}>{d.looking_for}</p>
            </div>
          </DatingSection>
        )}

        {photos.length > 1 && (
          <DatingSection title="Photos">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
              {photos.map((photo) => (
                <div key={photo.id} style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "1", background: "#141414" }}>
                  <img src={photo.url || ""} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </DatingSection>
        )}

        <div style={{ marginTop: 40, textAlign: "center", fontSize: 12, color: "#3f3f46" }}>
          Made with <a href="/" style={{ color: "#fb7185", textDecoration: "none", fontWeight: 600 }}>FlexPage</a>
        </div>
      </div>
    </div>
  );
}

function DatingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#fb7185", marginBottom: 20 }}>{title}</div>
      {children}
    </div>
  );
}
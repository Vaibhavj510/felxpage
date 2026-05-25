function getInitialsAvatar(name: string, bg: string) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${bg}"/><text x="100" y="115" font-family="Arial" font-size="72" font-weight="bold" fill="white" text-anchor="middle">${initials}</text></svg>`)}`;
}

export function HobbiesTemplate({ profile, photos }: { profile: any; photos: any[] }) {
  const d = profile.data || {};
  const name = d.name || d.full_name || profile.username;
  const primaryPhoto = photos.find((p) => p.is_primary) || photos[0];

  return (
    <div style={{ minHeight: "100vh", background: "#F8F7FF", fontFamily: "DM Sans, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#7C3AED", padding: "16px clamp(24px, 6vw, 96px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 18, color: "#fff" }}>FlexPage</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>myflexpage.com/{profile.username}</div>
      </div>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", padding: "clamp(48px, 8vw, 80px) clamp(24px, 6vw, 96px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }}>
          <div>
            {d.creative_title && (
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 600, marginBottom: 12, letterSpacing: "0.05em" }}>
                {d.creative_title.toUpperCase()}
              </div>
            )}
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-2px", color: "#fff", marginBottom: 16, lineHeight: 1.0 }}>
              {name}
            </h1>
            {d.city && <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>📍 {d.city}</p>}
            {d.collab_open && (
              <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 100, background: "rgba(255,255,255,0.15)" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Open to collabs</span>
              </div>
            )}
          </div>
          <div style={{ width: 140, height: 140, borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(255,255,255,0.2)", flexShrink: 0 }}>
            {primaryPhoto
              ? <img src={primaryPhoto.url} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <img src={getInitialsAvatar(name, "#7C3AED")} alt={name} style={{ width: "100%", height: "100%" }} />
            }
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(32px, 5vw, 64px) clamp(24px, 6vw, 96px)" }}>

        {d.story && (
          <HobbiesSection title="My Story">
            <p style={{ fontSize: 15, color: "#4A4A4A", lineHeight: 1.8, maxWidth: 640 }}>{d.story}</p>
          </HobbiesSection>
        )}

        {d.current_focus && (
          <HobbiesSection title="Current Focus">
            <div style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: 16, padding: "20px 24px" }}>
              <p style={{ fontSize: 15, color: "#4A4A4A", lineHeight: 1.8 }}>{d.current_focus}</p>
            </div>
          </HobbiesSection>
        )}

        {photos.length > 0 && (
          <HobbiesSection title="Showcase">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {photos.map((photo) => (
                <div key={photo.id} style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "1", background: "#E8E6F0" }}>
                  <img src={photo.url || ""} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </HobbiesSection>
        )}

        {d.achievements && d.achievements.length > 0 && (
          <HobbiesSection title="Achievements">
            <div style={{ display: "grid", gap: 10 }}>
              {d.achievements.map((a: any, i: number) => (
                <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "14px 18px", border: "1px solid #E8E6F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1C" }}>{a.title}</div>
                  {a.year && <div style={{ fontSize: 12, color: "#7C3AED", fontWeight: 600 }}>{a.year}</div>}
                </div>
              ))}
            </div>
          </HobbiesSection>
        )}

        {/* Embeds */}
        {d.youtube_url && (
          <HobbiesSection title="Watch">
            <a href={d.youtube_url} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 10, background: "#FF0000", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
              Watch on YouTube
            </a>
          </HobbiesSection>
        )}

        {/* Contact */}
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid #E8E6F0", display: "flex", gap: 12, flexWrap: "wrap" }}>
          {d.contact_email && <a href={`mailto:${d.contact_email}`} style={{ padding: "11px 22px", borderRadius: 10, background: "#7C3AED", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Email me</a>}
          {d.instagram_url && <a href={d.instagram_url} target="_blank" rel="noreferrer" style={{ padding: "11px 22px", borderRadius: 10, background: "#E1306C", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Instagram</a>}
        </div>

        <div style={{ marginTop: 40, textAlign: "center", fontSize: 12, color: "#999" }}>
          Made with <a href="/" style={{ color: "#7C3AED", textDecoration: "none", fontWeight: 600 }}>FlexPage</a>
        </div>
      </div>
    </div>
  );
}

function HobbiesSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#7C3AED", marginBottom: 20 }}>{title}</div>
      {children}
    </div>
  );
}
function getInitialsAvatar(name: string, bg: string) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${bg}"/><text x="100" y="115" font-family="Arial" font-size="72" font-weight="bold" fill="white" text-anchor="middle">${initials}</text></svg>`)}`;
}

export function StudentTemplate({ profile, photos }: { profile: any; photos: any[] }) {
  const d = profile.data || {};
  const name = d.name || d.full_name || profile.username;
  const primaryPhoto = photos.find((p) => p.is_primary) || photos[0];

  const lookingForMap: Record<string, string> = {
    internship: "Seeking Internship",
    collab: "Open to Collabs",
    mentor: "Looking for Mentor",
    friends: "Making Friends",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F0F7FF", fontFamily: "DM Sans, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#2563EB", padding: "16px clamp(24px, 6vw, 96px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 18, color: "#fff" }}>FlexPage</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>myflexpage.com/{profile.username}</div>
      </div>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)", padding: "clamp(48px, 8vw, 80px) clamp(24px, 6vw, 96px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }}>
          <div>
            {d.looking_for && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(255,255,255,0.15)", marginBottom: 16 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{lookingForMap[d.looking_for] || d.looking_for}</span>
              </div>
            )}
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-2px", color: "#fff", marginBottom: 8, lineHeight: 1.0 }}>
              {name}
            </h1>
            {d.course && d.college && (
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 8 }}>
                {d.course} · {d.college}
              </p>
            )}
            {d.year && d.city && (
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
                Year {d.year} · {d.city}
              </p>
            )}
          </div>
          <div style={{ width: 130, height: 130, borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(255,255,255,0.2)", flexShrink: 0 }}>
            {primaryPhoto
              ? <img src={primaryPhoto.url} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <img src={getInitialsAvatar(name, "#2563EB")} alt={name} style={{ width: "100%", height: "100%" }} />
            }
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(32px, 5vw, 64px) clamp(24px, 6vw, 96px)" }}>

        {d.about && (
          <StudentSection title="About Me">
            <p style={{ fontSize: 15, color: "#334155", lineHeight: 1.8, maxWidth: 620 }}>{d.about}</p>
          </StudentSection>
        )}

        {d.goals && (
          <StudentSection title="Goals">
            <p style={{ fontSize: 15, color: "#334155", lineHeight: 1.8, maxWidth: 620 }}>{d.goals}</p>
          </StudentSection>
        )}

        {d.projects && d.projects.length > 0 && (
          <StudentSection title="Projects">
            <div style={{ display: "grid", gap: 12 }}>
              {d.projects.map((project: any, i: number) => (
                <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "18px 22px", border: "1px solid #DBEAFE" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1C", marginBottom: 4 }}>{project.name}</div>
                      {project.description && <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>{project.description}</div>}
                    </div>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noreferrer" style={{ padding: "7px 14px", borderRadius: 8, background: "#EFF6FF", color: "#2563EB", fontSize: 12, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" as const, flexShrink: 0 }}>
                        View →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </StudentSection>
        )}

        {d.activities && d.activities.length > 0 && (
          <StudentSection title="Activities">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {d.activities.map((activity: string, i: number) => (
                <span key={i} style={{ padding: "7px 16px", borderRadius: 100, background: "#DBEAFE", color: "#1D4ED8", fontSize: 13, fontWeight: 600 }}>
                  {activity}
                </span>
              ))}
            </div>
          </StudentSection>
        )}

        {/* Contact */}
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid #DBEAFE", display: "flex", gap: 12, flexWrap: "wrap" }}>
          {d.email && <a href={`mailto:${d.email}`} style={{ padding: "11px 22px", borderRadius: 10, background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Email</a>}
          {d.linkedin && <a href={`https://linkedin.com/in/${d.linkedin}`} style={{ padding: "11px 22px", borderRadius: 10, background: "#0A66C2", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>LinkedIn</a>}
          {d.github && <a href={`https://github.com/${d.github}`} style={{ padding: "11px 22px", borderRadius: 10, background: "#1C1C1C", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>GitHub</a>}
        </div>

        <div style={{ marginTop: 40, textAlign: "center", fontSize: 12, color: "#999" }}>
          Made with <a href="/" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>FlexPage</a>
        </div>
      </div>
    </div>
  );
}

function StudentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#2563EB", marginBottom: 20 }}>
        {title}
      </div>
      {children}
    </div>
  );
}
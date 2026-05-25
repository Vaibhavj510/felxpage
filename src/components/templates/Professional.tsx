function getInitialsAvatar(name: string, bg: string) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${bg}"/><text x="100" y="115" font-family="Arial" font-size="72" font-weight="bold" fill="white" text-anchor="middle">${initials}</text></svg>`)}`;
}

export function ProfessionalTemplate({ profile, photos }: { profile: any; photos: any[] }) {
  const d = profile.data || {};
  const name = d.full_name || profile.username;
  const primaryPhoto = photos.find((p) => p.is_primary) || photos[0];

  const statusMap: Record<string, { label: string; color: string }> = {
    open_to_work: { label: "Open to Work", color: "#34d399" },
    freelancing: { label: "Freelancing", color: "#fbbf24" },
    employed: { label: "Employed", color: "#60a5fa" },
    not_looking: { label: "Not Looking", color: "#71717a" },
  };
  const status = d.status ? statusMap[d.status] : null;

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FA", fontFamily: "DM Sans, sans-serif" }}>

      {/* Header */}
      <div style={{
        background: "#0F4C81",
        padding: "16px clamp(24px, 6vw, 96px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 18, color: "#fff" }}>FlexPage</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>myflexpage.com/{profile.username}</div>
      </div>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #0F4C81 0%, #1E6DB5 100%)",
        padding: "clamp(48px, 8vw, 80px) clamp(24px, 6vw, 96px)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }}>
          <div>
            {status && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(255,255,255,0.1)", marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: status.color }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{status.label}</span>
              </div>
            )}
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-2px", color: "#fff", marginBottom: 8, lineHeight: 1.0 }}>
              {name}
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginBottom: 16, fontWeight: 500 }}>
              {d.current_role}{d.company ? ` at ${d.company}` : ""}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
              {d.years_experience && <Stat value={`${d.years_experience}+`} label="Years exp" />}
              {d.projects_count && <Stat value={`${d.projects_count}`} label="Projects" />}
              {d.countries_count && <Stat value={`${d.countries_count}`} label="Countries" />}
            </div>
          </div>
          <div style={{ width: 140, height: 140, borderRadius: "50%", overflow: "hidden", border: "4px solid rgba(255,255,255,0.2)", flexShrink: 0, background: "#1E6DB5" }}>
            {primaryPhoto
              ? <img src={primaryPhoto.url} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <img src={getInitialsAvatar(name, "#0F4C81")} alt={name} style={{ width: "100%", height: "100%" }} />
            }
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(32px, 5vw, 64px) clamp(24px, 6vw, 96px)" }}>

        {d.about && (
          <ProSection title="About">
            <p style={{ fontSize: 15, color: "#333", lineHeight: 1.8, maxWidth: 640 }}>{d.about}</p>
          </ProSection>
        )}

        {d.skills && d.skills.length > 0 && (
          <ProSection title="Skills">
            <div style={{ display: "grid", gap: 16 }}>
              {d.skills.map((skill: any, i: number) => (
                <div key={i}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0F4C81", marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{skill.category}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {skill.tags?.map((tag: string, j: number) => (
                      <span key={j} style={{ padding: "5px 14px", borderRadius: 100, background: "#EFF6FF", color: "#0F4C81", fontSize: 12, fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ProSection>
        )}

        {d.experience && d.experience.length > 0 && (
          <ProSection title="Experience">
            <div style={{ display: "grid", gap: 16 }}>
              {d.experience.map((exp: any, i: number) => (
                <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1px solid #E5EAF0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1C" }}>{exp.role}</div>
                      <div style={{ fontSize: 13, color: "#0F4C81", fontWeight: 600 }}>{exp.company}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#71717a" }}>{exp.duration}</div>
                  </div>
                  {exp.bullets && exp.bullets.map((b: string, j: number) => (
                    <div key={j} style={{ fontSize: 13, color: "#555", lineHeight: 1.6, paddingLeft: 16, position: "relative", marginTop: 4 }}>
                      <span style={{ position: "absolute", left: 0, color: "#0F4C81" }}>·</span>
                      {b}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ProSection>
        )}

        {d.education && d.education.length > 0 && (
          <ProSection title="Education">
            <div style={{ display: "grid", gap: 12 }}>
              {d.education.map((edu: any, i: number) => (
                <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "18px 22px", border: "1px solid #E5EAF0", display: "grid", gridTemplateColumns: "1fr auto" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1C1C1C" }}>{edu.degree}</div>
                    <div style={{ fontSize: 13, color: "#0F4C81", fontWeight: 600 }}>{edu.institution}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#71717a" }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </ProSection>
        )}

        {/* Contact */}
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid #E5EAF0", display: "flex", gap: 12, flexWrap: "wrap" }}>
          {d.email && <a href={`mailto:${d.email}`} style={proContactBtn("#0F4C81")}>Email</a>}
          {d.linkedin && <a href={`https://linkedin.com/in/${d.linkedin}`} style={proContactBtn("#0A66C2")}>LinkedIn</a>}
          {d.github && <a href={`https://github.com/${d.github}`} style={proContactBtn("#1C1C1C")}>GitHub</a>}
          {d.website && <a href={d.website} style={proContactBtn("#059669")}>Website</a>}
        </div>

        <div style={{ marginTop: 40, textAlign: "center", fontSize: 12, color: "#999" }}>
          Made with <a href="/" style={{ color: "#0F4C81", textDecoration: "none", fontWeight: 600 }}>FlexPage</a>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{label}</div>
    </div>
  );
}

function ProSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#0F4C81", marginBottom: 20 }}>{title}</div>
      {children}
    </div>
  );
}

const proContactBtn = (color: string): React.CSSProperties => ({
  padding: "11px 22px", borderRadius: 10, background: color,
  color: "#fff", fontSize: 14, fontWeight: 700,
  textDecoration: "none", display: "inline-block",
  fontFamily: "DM Sans, sans-serif",
});
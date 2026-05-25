import Image from "next/image";

function getInitialsAvatar(name: string, bg: string) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${bg}"/><text x="100" y="115" font-family="Arial" font-size="72" font-weight="bold" fill="white" text-anchor="middle">${initials}</text></svg>`)}`;
}

export function MatrimonialTemplate({ profile, photos }: { profile: any; photos: any[] }) {
  const d = profile.data || {};
  const name = d.full_name || profile.username;
  const primaryPhoto = photos.find((p) => p.is_primary) || photos[0];

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "DM Sans, sans-serif" }}>

      {/* Header */}
      <div style={{
        background: "#C4622D",
        padding: "16px clamp(24px, 6vw, 96px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 18, color: "#fff" }}>
          FlexPage
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
          myflexpage.com/{profile.username}
        </div>
      </div>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #C4622D 0%, #E8956D 100%)",
        padding: "clamp(48px, 8vw, 96px) clamp(24px, 6vw, 96px)",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 48,
        alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 600, marginBottom: 12, letterSpacing: "0.05em" }}>
            MATRIMONIAL PROFILE
          </div>
          <h1 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 900,
            letterSpacing: "-2px",
            color: "#fff",
            marginBottom: 16,
            lineHeight: 1.0,
          }}>
            {name}
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {d.city && <Chip>{d.city}</Chip>}
            {d.religion && <Chip>{d.religion}</Chip>}
            {d.occupation && <Chip>{d.occupation}</Chip>}
            {d.education && <Chip>{d.education}</Chip>}
          </div>
        </div>

        {/* Avatar */}
        <div style={{
          width: 160,
          height: 160,
          borderRadius: "50%",
          overflow: "hidden",
          border: "4px solid rgba(255,255,255,0.3)",
          flexShrink: 0,
          background: "#E8956D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {primaryPhoto ? (
            <img src={primaryPhoto.url || ""} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <img src={getInitialsAvatar(name, "#C4622D")} alt={name} style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(32px, 5vw, 64px) clamp(24px, 6vw, 96px)" }}>

        {/* Quick facts */}
        <Section title="Quick Facts">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { label: "Date of Birth", value: d.dob },
              { label: "Height", value: d.height },
              { label: "Religion", value: d.religion },
              { label: "Caste", value: d.caste },
              { label: "Education", value: d.education },
              { label: "Occupation", value: d.occupation },
              { label: "Company", value: d.company },
              { label: "Income", value: d.income },
              { label: "City", value: d.city },
              { label: "Diet", value: d.diet },
              { label: "Blood Group", value: d.blood_group },
              { label: "Zodiac", value: d.zodiac },
            ].filter((f) => f.value).map((f) => (
              <div key={f.label} style={{
                background: "#fff",
                borderRadius: 12,
                padding: "14px 16px",
                border: "1px solid #EDE8E0",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#C4622D", marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
                  {f.label}
                </div>
                <div style={{ fontSize: 14, color: "#1C1C1C", fontWeight: 600 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* About */}
        {d.about && (
          <Section title="About Me">
            <p style={{ fontSize: 15, color: "#4A4A4A", lineHeight: 1.8, maxWidth: 640 }}>{d.about}</p>
          </Section>
        )}

        {/* Family */}
        {(d.father_name || d.mother_name) && (
          <Section title="Family">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
              {d.father_name && (
                <FamilyCard
                  role="Father"
                  name={d.father_name}
                  detail={d.father_occupation}
                />
              )}
              {d.mother_name && (
                <FamilyCard
                  role="Mother"
                  name={d.mother_name}
                  detail={d.mother_occupation}
                />
              )}
            </div>
            {d.siblings && (
              <p style={{ fontSize: 14, color: "#4A4A4A", marginTop: 16, lineHeight: 1.7 }}>
                <strong>Siblings:</strong> {d.siblings}
              </p>
            )}
            {d.family_note && (
              <p style={{ fontSize: 14, color: "#4A4A4A", marginTop: 8, lineHeight: 1.7 }}>
                {d.family_note}
              </p>
            )}
          </Section>
        )}

        {/* Looking for */}
        {d.expectations && (
          <Section title="What I am Looking For">
            <p style={{ fontSize: 15, color: "#4A4A4A", lineHeight: 1.8, maxWidth: 640 }}>{d.expectations}</p>
          </Section>
        )}

        {/* Photos gallery */}
        {photos.length > 1 && (
          <Section title="Photos">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
              {photos.map((photo) => (
                <div key={photo.id} style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "1", background: "#EDE8E0" }}>
                  <img src={photo.url || ""} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Closing quote */}
        {d.closing_quote && (
          <div style={{
            background: "#1C1C1C",
            borderRadius: 20,
            padding: "clamp(28px, 4vw, 48px)",
            marginTop: 32,
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(18px, 2.5vw, 28px)",
              fontWeight: 700,
              color: "#FAF7F2",
              lineHeight: 1.5,
              letterSpacing: "-0.5px",
            }}>
              "{d.closing_quote}"
            </p>
          </div>
        )}

        {/* Contact */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #EDE8E0", display: "flex", gap: 12, flexWrap: "wrap" }}>
          {d.whatsapp && (
            <a href={`https://wa.me/${d.whatsapp}`} style={contactBtnStyle("#25D366")}>
              WhatsApp
            </a>
          )}
          {d.email && (
            <a href={`mailto:${d.email}`} style={contactBtnStyle("#C4622D")}>
              Email
            </a>
          )}
          {d.instagram && (
            <a href={`https://instagram.com/${d.instagram}`} style={contactBtnStyle("#E1306C")}>
              Instagram
            </a>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48, textAlign: "center", fontSize: 12, color: "#A89E94" }}>
          Made with <a href="/" style={{ color: "#C4622D", textDecoration: "none", fontWeight: 600 }}>FlexPage</a>
        </div>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      padding: "5px 14px",
      borderRadius: 100,
      background: "rgba(255,255,255,0.2)",
      color: "#fff",
      fontSize: 12,
      fontWeight: 600,
    }}>
      {children}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase" as const,
        color: "#C4622D",
        marginBottom: 20,
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function FamilyCard({ role, name, detail }: { role: string; name: string; detail?: string }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: "16px 18px",
      border: "1px solid #EDE8E0",
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#C4622D", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
        {role}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1C", marginBottom: 2 }}>{name}</div>
      {detail && <div style={{ fontSize: 13, color: "#71717a" }}>{detail}</div>}
    </div>
  );
}

const contactBtnStyle = (color: string): React.CSSProperties => ({
  padding: "12px 24px",
  borderRadius: 10,
  background: color,
  color: "#fff",
  fontSize: 14,
  fontWeight: 700,
  textDecoration: "none",
  display: "inline-block",
  fontFamily: "DM Sans, sans-serif",
});
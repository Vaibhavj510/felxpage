"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-auth";
import { useRouter } from "next/navigation";

const PAGE_TYPES = [
  { id: "matrimonial", label: "💍 Matrimonial", desc: "Share your biodata with families. Full privacy control.", color: "#fbbf24" },
  { id: "professional", label: "💼 Professional", desc: "Your career story. Better than LinkedIn.", color: "#34d399" },
  { id: "dating", label: "❤️ Dating", desc: "Show your real personality. Not just photos.", color: "#fb7185" },
  { id: "hobbies", label: "🎨 Hobbies", desc: "Showcase your passion and creative work.", color: "#a78bfa" },
  { id: "newInTown", label: "🏙️ New in Town", desc: "Just moved? Find your people.", color: "#fbbf24" },
  { id: "student", label: "🎓 Student", desc: "More than a resume. Show who you are.", color: "#38bdf8" },
];

const TEMPLATES = [
  { id: "aarambh", name: "Aarambh", desc: "Warm terracotta. Traditional families.", color: "#C4622D", bg: "#FAF0E6", free: true, best: ["matrimonial"] },
  { id: "roshni", name: "Roshni", desc: "Soft lavender. Modern and personal.", color: "#7C3AED", bg: "#F5F0FF", free: false, best: ["matrimonial", "dating"] },
  { id: "kiran", name: "Kiran", desc: "Deep navy and gold. Bold confidence.", color: "#0F4C81", bg: "#EFF6FF", free: false, best: ["matrimonial", "professional"] },
  { id: "safar", name: "Safar", desc: "Fresh green. Journey and adventure.", color: "#059669", bg: "#F0FDF4", free: false, best: ["newInTown", "hobbies"] },
  { id: "neev", name: "Neev", desc: "Charcoal minimal. Clean professional.", color: "#1C1C1C", bg: "#F8F8F8", free: false, best: ["professional", "student"] },
  { id: "udaan", name: "Udaan", desc: "Warm gold. Energetic and bold.", color: "#D97706", bg: "#FFFBEB", free: false, best: ["dating", "student"] },
];

const BLOCKED = ["admin","api","dashboard","login","signup","settings","help","support","about","terms","privacy","billing","upgrade","create"];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 16px", background: "#0a0a0a",
  border: "1px solid #2a2a2a", borderRadius: 12, fontSize: 14,
  color: "#f4f4f5", fontFamily: "DM Sans, sans-serif", outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 700, color: "#a1a1aa",
  marginBottom: 8, display: "block", letterSpacing: "0.04em",
};

const fieldStyle: React.CSSProperties = { marginBottom: 20 };

const textareaStyle: React.CSSProperties = {
  ...inputStyle, resize: "vertical", minHeight: 100, lineHeight: 1.6,
};

const backBtnStyle: React.CSSProperties = {
  padding: "14px 24px", borderRadius: 12, fontSize: 15, fontWeight: 600,
  cursor: "pointer", border: "1px solid #2a2a2a", background: "transparent",
  color: "#71717a", fontFamily: "DM Sans, sans-serif",
};

const nextBtnStyle = (enabled: boolean): React.CSSProperties => ({
  padding: "14px 36px", borderRadius: 12, fontSize: 15, fontWeight: 700,
  cursor: enabled ? "pointer" : "not-allowed", border: "none",
  background: enabled ? "#f97316" : "#1c1c1c",
  color: enabled ? "#000" : "#52525b",
  fontFamily: "DM Sans, sans-serif", transition: "all 0.15s",
});

const headingStyle: React.CSSProperties = {
  fontFamily: "Syne, sans-serif", fontWeight: 900,
  fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-2px",
  marginBottom: 12, color: "#f4f4f5",
};

const subStyle: React.CSSProperties = {
  fontSize: 15, color: "#71717a", marginBottom: 40, lineHeight: 1.6,
};

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    pageType: "", username: "", templateId: "", data: {} as Record<string, any>,
  });

useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        console.log("Create page session check:", session ? "found" : "not found")
        
        if (session) {
          setSession(session)
          setLoading(false)
          return
        }

        const { data: { user } } = await supabase.auth.getUser()
        console.log("Create page user check:", user ? "found" : "not found")

        if (user) {
          setSession({ user })
          setLoading(false)
          return
        }

        router.push("/")
      } catch (err) {
        console.error("Session check error:", err)
        router.push("/")
      }
    }

    checkSession()
  }, [router])

  function updateForm(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "var(--black)", display: "flex", alignItems: "center", justifyContent: "center", color: "#71717a", fontSize: 14 }}>
      Loading...
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--black)", paddingTop: 40, paddingBottom: 80, paddingLeft: "clamp(24px, 6vw, 96px)", paddingRight: "clamp(24px, 6vw, 96px)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", marginBottom: 48 }}>
        <a href="/" style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 18, color: "#f4f4f5", textDecoration: "none", display: "block", marginBottom: 40 }}>
          FlexPage
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
          {[1,2,3,4,5].map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700,
                background: step === s ? "#f97316" : step > s ? "rgba(249,115,22,0.2)" : "#1c1c1c",
                color: step === s ? "#000" : step > s ? "#f97316" : "#52525b", transition: "all 0.2s",
              }}>
                {step > s ? "✓" : s}
              </div>
              {s < 5 && <div style={{ width: 32, height: 1, background: step > s ? "rgba(249,115,22,0.3)" : "#1c1c1c" }} />}
            </div>
          ))}
          <span style={{ fontSize: 12, color: "#52525b", marginLeft: 12 }}>Step {step} of 5</span>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        {/* STEP 1 — Page Type */}
        {step === 1 && (
          <div>
            <h1 style={headingStyle}>What kind of page<br />are you creating?</h1>
            <p style={subStyle}>You can create more pages later. Start with the one you need most.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12, marginBottom: 40 }}>
              {PAGE_TYPES.map((pt) => (
                <button key={pt.id} onClick={() => updateForm("pageType", pt.id)} style={{
                  padding: 24, borderRadius: 16, textAlign: "left", cursor: "pointer",
                  border: form.pageType === pt.id ? "1px solid " + pt.color : "1px solid #2a2a2a",
                  background: form.pageType === pt.id ? pt.color + "10" : "#141414",
                  transition: "all 0.15s", fontFamily: "DM Sans, sans-serif",
                }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{pt.label.split(" ")[0]}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: form.pageType === pt.id ? pt.color : "#f4f4f5", marginBottom: 6 }}>
                    {pt.label.split(" ").slice(1).join(" ")}
                  </div>
                  <div style={{ fontSize: 13, color: "#71717a", lineHeight: 1.5 }}>{pt.desc}</div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} disabled={!form.pageType} style={nextBtnStyle(!!form.pageType)}>Continue →</button>
          </div>
        )}

        {/* STEP 2 — Username */}
        {step === 2 && (
          <UsernameStep
            value={form.username}
            onChange={(v) => updateForm("username", v)}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            blocked={BLOCKED}
          />
        )}

        {/* STEP 3 — Template */}
        {step === 3 && (
          <div>
            <h1 style={headingStyle}>Pick your<br />template</h1>
            <p style={subStyle}>You can change this anytime from your dashboard.</p>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#f97316", marginBottom: 12 }}>
                Recommended for you
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
                {TEMPLATES.filter((t) => t.best.includes(form.pageType)).map((t) => (
                  <button key={t.id} onClick={() => updateForm("templateId", t.id)} style={{
                    padding: 0, borderRadius: 16, overflow: "hidden",
                    border: form.templateId === t.id ? "2px solid #f97316" : "1px solid #2a2a2a",
                    background: "#141414", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                  }}>
                    <div style={{ height: 70, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.color, opacity: 0.6 }} />
                    </div>
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: form.templateId === t.id ? "#f97316" : "#f4f4f5", marginBottom: 4, fontFamily: "DM Sans, sans-serif" }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#71717a", fontFamily: "DM Sans, sans-serif" }}>{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#52525b", marginBottom: 12 }}>
                Other templates
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 40 }}>
                {TEMPLATES.filter((t) => !t.best.includes(form.pageType)).map((t) => (
                  <button key={t.id} onClick={() => updateForm("templateId", t.id)} style={{
                    padding: 0, borderRadius: 16, overflow: "hidden",
                    border: form.templateId === t.id ? "2px solid #f97316" : "1px solid #2a2a2a",
                    background: "#141414", cursor: "pointer", textAlign: "left", transition: "all 0.15s", position: "relative",
                  }}>
                    {!t.free && (
                      <div style={{ position: "absolute", top: 8, right: 8, fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 100, background: "rgba(249,115,22,0.15)", color: "#f97316", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Pro+</div>
                    )}
                    <div style={{ height: 70, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.color, opacity: 0.6 }} />
                    </div>
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: form.templateId === t.id ? "#f97316" : "#f4f4f5", marginBottom: 4, fontFamily: "DM Sans, sans-serif" }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#71717a", fontFamily: "DM Sans, sans-serif" }}>{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(2)} style={backBtnStyle}>Back</button>
              <button onClick={() => setStep(4)} disabled={!form.templateId} style={nextBtnStyle(!!form.templateId)}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP 4 — Form */}
        {step === 4 && (
          <div>
            <h1 style={headingStyle}>Tell us<br />about yourself</h1>
            <p style={subStyle}>Fill in what you can. You can edit everything later.</p>
            <div style={{ background: "#141414", border: "1px solid #2a2a2a", borderRadius: 20, padding: "clamp(24px, 4vw, 40px)", marginBottom: 32 }}>

              {form.pageType === "matrimonial" && (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={fieldStyle}><label style={labelStyle}>Full Name</label><input style={inputStyle} value={form.data.full_name || ""} onChange={(e) => updateForm("data", { ...form.data, full_name: e.target.value })} placeholder="Priya Sharma" /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Date of Birth</label><input style={inputStyle} type="date" value={form.data.dob || ""} onChange={(e) => updateForm("data", { ...form.data, dob: e.target.value })} /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Height</label><input style={inputStyle} value={form.data.height || ""} onChange={(e) => updateForm("data", { ...form.data, height: e.target.value })} placeholder="5ft 4in" /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Religion</label><input style={inputStyle} value={form.data.religion || ""} onChange={(e) => updateForm("data", { ...form.data, religion: e.target.value })} placeholder="Hindu" /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Education</label><input style={inputStyle} value={form.data.education || ""} onChange={(e) => updateForm("data", { ...form.data, education: e.target.value })} placeholder="B.Tech CSE" /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Occupation</label><input style={inputStyle} value={form.data.occupation || ""} onChange={(e) => updateForm("data", { ...form.data, occupation: e.target.value })} placeholder="Software Engineer" /></div>
                    <div style={fieldStyle}><label style={labelStyle}>City</label><input style={inputStyle} value={form.data.city || ""} onChange={(e) => updateForm("data", { ...form.data, city: e.target.value })} placeholder="Delhi" /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Diet</label><input style={inputStyle} value={form.data.diet || ""} onChange={(e) => updateForm("data", { ...form.data, diet: e.target.value })} placeholder="Vegetarian" /></div>
                  </div>
                  <div style={fieldStyle}><label style={labelStyle}>About Me</label><textarea style={textareaStyle} value={form.data.about || ""} onChange={(e) => updateForm("data", { ...form.data, about: e.target.value })} placeholder="Tell your story in your own words..." /></div>
                </div>
              )}

              {form.pageType === "professional" && (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={fieldStyle}><label style={labelStyle}>Full Name</label><input style={inputStyle} value={form.data.full_name || ""} onChange={(e) => updateForm("data", { ...form.data, full_name: e.target.value })} placeholder="Vaibhav Jadhav" /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Current Role</label><input style={inputStyle} value={form.data.current_role || ""} onChange={(e) => updateForm("data", { ...form.data, current_role: e.target.value })} placeholder="MES Engineer" /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Company</label><input style={inputStyle} value={form.data.company || ""} onChange={(e) => updateForm("data", { ...form.data, company: e.target.value })} placeholder="Deloitte" /></div>
                    <div style={fieldStyle}><label style={labelStyle}>City / Country</label><input style={inputStyle} value={form.data.city || ""} onChange={(e) => updateForm("data", { ...form.data, city: e.target.value })} placeholder="Munich, Germany" /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Years of Experience</label><input style={inputStyle} value={form.data.years_experience || ""} onChange={(e) => updateForm("data", { ...form.data, years_experience: e.target.value })} placeholder="5" /></div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Current Status</label>
                      <select style={inputStyle} value={form.data.status || ""} onChange={(e) => updateForm("data", { ...form.data, status: e.target.value })}>
                        <option value="">Select status</option>
                        <option value="open_to_work">Open to work</option>
                        <option value="freelancing">Freelancing</option>
                        <option value="employed">Employed</option>
                        <option value="not_looking">Not looking</option>
                      </select>
                    </div>
                  </div>
                  <div style={fieldStyle}><label style={labelStyle}>Professional Summary</label><textarea style={textareaStyle} value={form.data.about || ""} onChange={(e) => updateForm("data", { ...form.data, about: e.target.value })} placeholder="Describe your expertise and what makes you unique..." /></div>
                </div>
              )}

              {["dating", "newInTown", "hobbies", "student"].includes(form.pageType) && (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={fieldStyle}><label style={labelStyle}>Name</label><input style={inputStyle} value={form.data.full_name || form.data.first_name || ""} onChange={(e) => updateForm("data", { ...form.data, [form.pageType === "dating" ? "first_name" : "full_name"]: e.target.value })} placeholder="Your name" /></div>
                    <div style={fieldStyle}><label style={labelStyle}>City</label><input style={inputStyle} value={form.data.city || ""} onChange={(e) => updateForm("data", { ...form.data, city: e.target.value })} placeholder="Mumbai" /></div>
                    {form.pageType === "dating" && <div style={fieldStyle}><label style={labelStyle}>Age</label><input style={inputStyle} type="number" value={form.data.age || ""} onChange={(e) => updateForm("data", { ...form.data, age: e.target.value })} placeholder="24" /></div>}
                    {form.pageType === "student" && <>
                      <div style={fieldStyle}><label style={labelStyle}>College</label><input style={inputStyle} value={form.data.college || ""} onChange={(e) => updateForm("data", { ...form.data, college: e.target.value })} placeholder="BITS Pilani" /></div>
                      <div style={fieldStyle}><label style={labelStyle}>Course</label><input style={inputStyle} value={form.data.course || ""} onChange={(e) => updateForm("data", { ...form.data, course: e.target.value })} placeholder="B.Tech CSE" /></div>
                    </>}
                    {form.pageType === "hobbies" && <div style={fieldStyle}><label style={labelStyle}>Creative Title</label><input style={inputStyle} value={form.data.creative_title || ""} onChange={(e) => updateForm("data", { ...form.data, creative_title: e.target.value })} placeholder="Travel Photographer" /></div>}
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>{form.pageType === "dating" ? "About Me" : form.pageType === "hobbies" ? "My Story" : form.pageType === "newInTown" ? "Hey, I am..." : "About Me"}</label>
                    <textarea style={textareaStyle} value={form.data.about || form.data.story || ""} onChange={(e) => updateForm("data", { ...form.data, [form.pageType === "hobbies" ? "story" : "about"]: e.target.value })} placeholder="Tell people who you are..." />
                  </div>
                </div>
              )}

            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(3)} style={backBtnStyle}>Back</button>
              <button onClick={() => setStep(5)} style={nextBtnStyle(true)}>Preview my page →</button>
            </div>
          </div>
        )}

        {/* STEP 5 — Publish */}
        {step === 5 && (
          <PublishStep form={form} session={session} onBack={() => setStep(4)} />
        )}

      </div>
    </div>
  );
}

function UsernameStep({ value, onChange, onNext, onBack, blocked }: {
  value: string; onChange: (v: string) => void;
  onNext: () => void; onBack: () => void; blocked: string[];
}) {
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);

  async function checkUsername(val: string) {
    if (val.length < 3) { setAvailable(null); return; }
    if (blocked.includes(val.toLowerCase())) { setAvailable(false); return; }
    setChecking(true);
    const { data } = await supabase.from("profiles").select("username").eq("username", val.toLowerCase()).maybeSingle();
    setAvailable(!data);
    setChecking(false);
  }

  function handleChange(val: string) {
    const clean = val.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 30);
    onChange(clean);
    setAvailable(null);
    setTimeout(() => checkUsername(clean), 500);
  }

  const isValid = value.length >= 3 && available === true;

  return (
    <div>
      <h1 style={headingStyle}>Choose your<br />FlexPage URL</h1>
      <p style={subStyle}>This is the link you will share. You can change it later on Pro plan.</p>
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: "flex", alignItems: "center", background: "#141414",
          border: "1px solid " + (available === true ? "rgba(52,211,153,0.4)" : available === false ? "rgba(239,68,68,0.4)" : "#2a2a2a"),
          borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s",
        }}>
          <span style={{ padding: "16px 16px 16px 20px", fontSize: 14, color: "#52525b", fontWeight: 500, whiteSpace: "nowrap", borderRight: "1px solid #2a2a2a" }}>
            myflexpage.com/
          </span>
          <input type="text" value={value} onChange={(e) => handleChange(e.target.value)} placeholder="yourname" style={{ flex: 1, padding: "16px 20px", background: "transparent", border: "none", outline: "none", fontSize: 16, color: "#f4f4f5", fontFamily: "DM Sans, sans-serif", fontWeight: 600 }} />
          <div style={{ padding: "0 20px", fontSize: 16 }}>
            {checking && <span style={{ color: "#52525b" }}>...</span>}
            {available === true && <span style={{ color: "#34d399" }}>✓</span>}
            {available === false && <span style={{ color: "#ef4444" }}>✗</span>}
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 13, color: "#52525b" }}>
          {available === true && <span style={{ color: "#34d399" }}>Great — myflexpage.com/{value} is available!</span>}
          {available === false && <span style={{ color: "#ef4444" }}>That username is taken or reserved. Try another.</span>}
          {available === null && value.length > 0 && value.length < 3 && <span>Minimum 3 characters</span>}
          {available === null && value.length === 0 && <span>Letters, numbers, hyphens and underscores only</span>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onBack} style={backBtnStyle}>Back</button>
        <button onClick={onNext} disabled={!isValid} style={nextBtnStyle(isValid)}>Continue →</button>
      </div>
    </div>
  );
}

function PublishStep({ form, session, onBack }: { form: any; session: any; onBack: () => void }) {
  const router = useRouter();
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");

    async function publish() {
    setPublishing(true)
    setError("")
    try {
      // Ensure user exists in our users table
      await supabase.from("users").upsert({
        id: session.user.id,
        email: session.user.email,
        consent_given_at: new Date().toISOString(),
      }, {
        onConflict: "id",
        ignoreDuplicates: true,
      })
      const { error: profileError } = await supabase.from("profiles").insert({
        user_id: session.user.id,
        username: form.username,
        page_type: form.pageType,
        template_id: form.templateId || "aarambh",
        data: form.data,
        privacy_mode: "public",
        is_published: true,
      });
      if (profileError) { setError(profileError.message); setPublishing(false); return; }
      router.push("/dashboard?new=true");
    } catch (err: any) {
      setError(err.message);
      setPublishing(false);
    }
  }

  return (
    <div>
      <h1 style={headingStyle}>Ready to<br />go live?</h1>
      <p style={subStyle}>Your page will be live at the link below. You can edit it anytime.</p>
      <div style={{ background: "#141414", border: "1px solid #2a2a2a", borderRadius: 20, padding: 32, marginBottom: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#52525b", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 12 }}>Your FlexPage URL</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#f97316", marginBottom: 24, fontFamily: "DM Sans, sans-serif" }}>myflexpage.com/{form.username}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Page type", value: form.pageType },
            { label: "Template", value: form.templateId || "aarambh" },
            { label: "Username", value: form.username },
            { label: "Privacy", value: "Public" },
          ].map((item) => (
            <div key={item.label} style={{ padding: "12px 16px", background: "#0a0a0a", borderRadius: 10, border: "1px solid #1c1c1c" }}>
              <div style={{ fontSize: 11, color: "#52525b", fontWeight: 600, marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{item.label}</div>
              <div style={{ fontSize: 13, color: "#f4f4f5", fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
      {error && <div style={{ padding: "14px 18px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, color: "#ef4444", fontSize: 13, marginBottom: 20 }}>{error}</div>}
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onBack} style={backBtnStyle}>Back</button>
        <button onClick={publish} disabled={publishing} style={nextBtnStyle(!publishing)}>
          {publishing ? "Publishing..." : "Publish my FlexPage →"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-auth";

export function ShieldPreview({ profile }: { profile: any }) {
  const [step, setStep] = useState<"preview" | "form" | "sent">("preview");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const data = profile.data || {};
  const displayName = data.full_name?.split(" ")[0] || profile.username;

  async function submitRequest(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("access_requests").insert({
      profile_id: profile.id,
      requester_name: name,
      requester_email: email,
      message,
    });
    setLoading(false);
    setStep("sent");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(24px, 6vw, 96px)",
    }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>

        {/* Blurred avatar */}
        <div style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f97316, #fbbf24)",
          margin: "0 auto 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          filter: step === "preview" ? "blur(4px)" : "none",
          transition: "filter 0.3s",
        }}>
          👤
        </div>

        {step === "preview" && (
          <>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: "#f97316",
              marginBottom: 12,
            }}>
              🛡️ Protected Profile
            </div>

            <h1 style={{
              fontFamily: "Syne, sans-serif",
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: "-1.5px",
              color: "#f4f4f5",
              marginBottom: 8,
            }}>
              {displayName}
            </h1>

            {data.city && (
              <p style={{ fontSize: 14, color: "#71717a", marginBottom: 24 }}>
                📍 {data.city}
              </p>
            )}

            <div style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: 16,
              padding: 24,
              marginBottom: 28,
              textAlign: "left",
            }}>
              <div style={{ fontSize: 13, color: "#71717a", lineHeight: 1.7 }}>
                This profile is protected with Shield mode. The owner controls who can view their full biodata. Send a request to introduce yourself — they will approve or decline.
              </div>
            </div>

            <button
              onClick={() => setStep("form")}
              style={{
                width: "100%",
                padding: "16px 24px",
                background: "#f97316",
                color: "#000",
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Request Access →
            </button>

            <p style={{ fontSize: 12, color: "#3f3f46", marginTop: 16 }}>
              Made with FlexPage
            </p>
          </>
        )}

        {step === "form" && (
          <>
            <h1 style={{
              fontFamily: "Syne, sans-serif",
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: "-1.5px",
              color: "#f4f4f5",
              marginBottom: 8,
            }}>
              Introduce yourself
            </h1>
            <p style={{ fontSize: 14, color: "#71717a", marginBottom: 28 }}>
              Tell {displayName} who you are. They will review your request.
            </p>

            <form onSubmit={submitRequest} style={{ textAlign: "left", display: "grid", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#a1a1aa", marginBottom: 8, display: "block" }}>
                  Your Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  style={{
                    width: "100%", padding: "13px 16px", background: "#141414",
                    border: "1px solid #2a2a2a", borderRadius: 10, fontSize: 14,
                    color: "#f4f4f5", fontFamily: "DM Sans, sans-serif", outline: "none",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#a1a1aa", marginBottom: 8, display: "block" }}>
                  Your Email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@email.com"
                  style={{
                    width: "100%", padding: "13px 16px", background: "#141414",
                    border: "1px solid #2a2a2a", borderRadius: 10, fontSize: 14,
                    color: "#f4f4f5", fontFamily: "DM Sans, sans-serif", outline: "none",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#a1a1aa", marginBottom: 8, display: "block" }}>
                  Message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi, I'm Rahul from Delhi. My family came across your profile..."
                  rows={3}
                  style={{
                    width: "100%", padding: "13px 16px", background: "#141414",
                    border: "1px solid #2a2a2a", borderRadius: 10, fontSize: 14,
                    color: "#f4f4f5", fontFamily: "DM Sans, sans-serif", outline: "none",
                    resize: "vertical" as const, lineHeight: 1.6,
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setStep("preview")}
                  style={{
                    padding: "13px 20px", background: "transparent",
                    border: "1px solid #2a2a2a", borderRadius: 10, fontSize: 14,
                    color: "#71717a", cursor: "pointer", fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1, padding: "13px 20px", background: loading ? "#1c1c1c" : "#f97316",
                    border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700,
                    color: loading ? "#52525b" : "#000", cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {loading ? "Sending..." : "Send Request →"}
                </button>
              </div>
            </form>
          </>
        )}

        {step === "sent" && (
          <>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
            <h1 style={{
              fontFamily: "Syne, sans-serif",
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: "-1px",
              color: "#f4f4f5",
              marginBottom: 12,
            }}>
              Request sent!
            </h1>
            <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.7, marginBottom: 28 }}>
              {displayName} will review your request and you will receive an email if approved. This usually takes 1-2 days.
            </p>
            <div style={{
              background: "rgba(52,211,153,0.06)",
              border: "1px solid rgba(52,211,153,0.2)",
              borderRadius: 12,
              padding: 16,
              fontSize: 13,
              color: "#34d399",
            }}>
              We will email you at {email} when {displayName} responds.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
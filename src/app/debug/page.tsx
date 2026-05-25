"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-auth"

export default function Debug() {
  const [info, setInfo] = useState<any>({})

  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession()
      const { data: { user } } = await supabase.auth.getUser()
      setInfo({
        hasSession: !!session,
        hasUser: !!user,
        email: user?.email,
        accessToken: session?.access_token ? session.access_token.slice(0, 20) + "..." : null,
        expiresAt: session?.expires_at,
      })
    }
    check()
  }, [])

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", padding: 40, color: "#f4f4f5", fontFamily: "monospace" }}>
      <h1 style={{ marginBottom: 24, fontSize: 20 }}>Auth Debug</h1>
      <pre style={{ background: "#141414", padding: 24, borderRadius: 12, fontSize: 13, lineHeight: 1.8 }}>
        {JSON.stringify(info, null, 2)}
      </pre>
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <button
          onClick={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: `${window.location.origin}/auth/confirm` }
            })
            if (error) alert(error.message)
          }}
          style={{ padding: "12px 24px", background: "#f97316", color: "#000", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}
        >
          Sign in with Google
        </button>
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            window.location.reload()
          }}
          style={{ padding: "12px 24px", background: "#1c1c1c", color: "#f4f4f5", border: "1px solid #2a2a2a", borderRadius: 8, cursor: "pointer" }}
        >
          Sign out
        </button>
        <button
          onClick={() => window.location.href = "/create"}
          style={{ padding: "12px 24px", background: "#1c1c1c", color: "#f4f4f5", border: "1px solid #2a2a2a", borderRadius: 8, cursor: "pointer" }}
        >
          Go to /create
        </button>
      </div>
    </div>
  )
}
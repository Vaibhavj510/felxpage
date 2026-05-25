"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-auth"

export default function AuthConfirm() {
  const router = useRouter()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code")

    async function handleAuth() {
      let session = null

      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (error || !data.session) {
          router.push("/")
          return
        }
        session = data.session
      } else {
        const { data } = await supabase.auth.getSession()
        session = data.session
      }

      if (!session) {
        router.push("/")
        return
      }

      // Upsert user into our users table
      const { error: upsertError } = await supabase
        .from("users")
        .upsert({
          id: session.user.id,
          email: session.user.email,
          consent_given_at: new Date().toISOString(),
        }, {
          onConflict: "id",
          ignoreDuplicates: true,
        })

      if (upsertError) {
        console.error("User upsert error:", upsertError)
      }

      router.push("/create")
    }

    handleAuth()
  }, [router])

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 16,
    }}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "3px solid #f97316",
        borderTopColor: "transparent",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <div style={{ color: "#71717a", fontSize: 14 }}>
        Signing you in...
      </div>
    </div>
  )
}
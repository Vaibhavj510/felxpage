import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  console.log('Auth callback hit, code:', code ? 'present' : 'missing')

  if (!code) {
    console.log('No code present, redirecting home')
    return NextResponse.redirect(`${origin}/`)
  }

  // Let Supabase handle via client-side
  return NextResponse.redirect(`${origin}/auth/confirm?code=${code}`)
}
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { MatrimonialTemplate } from '@/components/templates/Matrimonial'
import { ProfessionalTemplate } from '@/components/templates/Professional'
import { DatingTemplate } from '@/components/templates/Dating'
import { HobbiesTemplate } from '@/components/templates/Hobbies'
import { NewInTownTemplate } from '@/components/templates/NewInTown'
import { StudentTemplate } from '@/components/templates/Student'
import { ShieldPreview } from '@/components/shield/ShieldPreview'

export const revalidate = 60

async function getProfile(username: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username.toLowerCase())
    .eq('is_published', true)
    .single()

  return profile
}

async function getPhotos(profileId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: photos } = await supabase
    .from('photos')
    .select('*')
    .eq('profile_id', profileId)
    .order('display_order', { ascending: true })

  return photos || []
}

async function incrementViewCount(profileId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  await supabase.rpc('increment_view_count', { profile_id: profileId })
}

export async function generateMetadata({ params }: { params: { username: string } }) {
  const profile = await getProfile(params.username)

  if (!profile) {
    return { title: 'Page not found — FlexPage' }
  }

  const name = profile.data?.full_name || profile.data?.first_name || params.username
  const tagline = profile.data?.tagline || profile.data?.current_role || profile.data?.about?.slice(0, 100) || ''
  const isShield = profile.privacy_mode === 'shield'

  return {
    title: isShield ? `${params.username} — FlexPage` : `${name} — FlexPage`,
    description: isShield ? 'This profile is protected. Request access to view.' : tagline,
    robots: profile.privacy_mode === 'public' ? 'index, follow' : 'noindex, nofollow',
    openGraph: {
      title: isShield ? `${params.username} on FlexPage` : `${name} on FlexPage`,
      description: isShield ? 'Request access to view this profile.' : tagline,
      images: [`/api/og/${params.username}`],
    },
  }
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const profile = await getProfile(params.username)

  if (!profile) return notFound()

  // Increment view count in background
  incrementViewCount(profile.id)

  // Shield mode — show preview only
  if (profile.privacy_mode === 'shield') {
    return <ShieldPreview profile={profile} />
  }

  const photos = await getPhotos(profile.id)

  const templateProps = { profile, photos }

  return (
    <div>
      {profile.page_type === 'matrimonial' && <MatrimonialTemplate {...templateProps} />}
      {profile.page_type === 'professional' && <ProfessionalTemplate {...templateProps} />}
      {profile.page_type === 'dating' && <DatingTemplate {...templateProps} />}
      {profile.page_type === 'hobbies' && <HobbiesTemplate {...templateProps} />}
      {profile.page_type === 'newInTown' && <NewInTownTemplate {...templateProps} />}
      {profile.page_type === 'student' && <StudentTemplate {...templateProps} />}
    </div>
  )
}
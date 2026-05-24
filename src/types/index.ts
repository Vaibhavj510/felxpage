export type Plan = 'free' | 'pro' | 'premium' | 'custom'

export type PageType =
  | 'matrimonial'
  | 'professional'
  | 'dating'
  | 'hobbies'
  | 'newInTown'
  | 'student'

export type TemplateId =
  | 'aarambh'
  | 'roshni'
  | 'kiran'
  | 'safar'
  | 'neev'
  | 'udaan'

export type PrivacyMode = 'public' | 'link_only' | 'shield'

export interface User {
  id: string
  email: string
  phone?: string
  plan: Plan
  plan_expires_at?: string
  consent_given_at: string
  created_at: string
}

export interface Profile {
  id: string
  user_id: string
  username: string
  page_type: PageType
  template_id: TemplateId
  data: ProfileData
  privacy_mode: PrivacyMode
  is_published: boolean
  view_count: number
  updated_at: string
  created_at: string
}

export interface Photo {
  id: string
  profile_id: string
  r2_key: string
  display_order: number
  is_primary: boolean
  created_at: string
  url?: string
}

export interface Payment {
  id: string
  user_id: string
  razorpay_id: string
  amount: number
  plan: Plan
  status: 'pending' | 'success' | 'failed'
  coupon_used?: string
  created_at: string
}

export interface Coupon {
  code: string
  discount_pct: number
  max_uses: number
  used_count: number
  valid_until?: string
  is_active: boolean
  created_at: string
}

export interface AccessRequest {
  id: string
  profile_id: string
  requester_name: string
  requester_email: string
  message?: string
  status: 'pending' | 'approved' | 'declined'
  access_token: string
  token_expires_at?: string
  created_at: string
}

export interface MatrimonialData {
  full_name?: string
  dob?: string
  height?: string
  religion?: string
  caste?: string
  education?: string
  occupation?: string
  company?: string
  income?: string
  city?: string
  state?: string
  family_type?: string
  about?: string
  father_name?: string
  father_occupation?: string
  mother_name?: string
  mother_occupation?: string
  siblings?: string
  family_note?: string
  expectations?: string
  preferred_age_min?: number
  preferred_age_max?: number
  diet?: string
  blood_group?: string
  zodiac?: string
  whatsapp?: string
  email?: string
  instagram?: string
  closing_quote?: string
  closing_highlight?: string
}

export interface ProfessionalData {
  full_name?: string
  current_role?: string
  tagline?: string
  city?: string
  country?: string
  about?: string
  status?: 'open_to_work' | 'freelancing' | 'employed' | 'not_looking'
  years_experience?: number
  projects_count?: number
  countries_count?: number
  languages?: string[]
  skills?: { category: string; tags: string[] }[]
  experience?: {
    company: string
    role: string
    duration: string
    bullets: string[]
  }[]
  education?: {
    degree: string
    institution: string
    year: string
    country: string
  }[]
  certifications?: { name: string; issuer: string; year: string }[]
  awards?: { name: string; issuer: string; year: string }[]
  beyond_work?: string
  interests?: { title: string; description: string }[]
  email?: string
  linkedin?: string
  github?: string
  website?: string
  cv_en_key?: string
  cv_de_key?: string
  language_toggle?: 'en_de' | 'en_hi' | 'en_fr'
}

export interface DatingData {
  first_name?: string
  age?: number
  city?: string
  tagline?: string
  about?: string
  personality_type?: string
  makes_me_laugh?: string
  vibe_tags?: string[]
  interests?: string[]
  favourite_places?: string[]
  music?: string
  food?: string
  looking_for?: string
  dealbreakers?: string
  conversation_starter?: string
}

export interface HobbiesData {
  name?: string
  creative_title?: string
  tagline?: string
  story?: string
  current_focus?: string
  achievements?: { title: string; year: string }[]
  communities?: string[]
  youtube_url?: string
  spotify_url?: string
  instagram_url?: string
  collab_open?: boolean
  contact_email?: string
  social_links?: { platform: string; url: string }[]
}

export interface NewInTownData {
  name?: string
  from_city?: string
  current_city?: string
  why_moved?: string
  looking_for?: string[]
  vibe_tags?: string[]
  neighbourhood?: string
  daily_routine?: string
  miss_from_home?: string
  brought_with_me?: string
  whatsapp?: string
  email?: string
  coffee_chat_url?: string
}

export interface StudentData {
  name?: string
  college?: string
  course?: string
  year?: string
  city?: string
  about?: string
  goals?: string
  projects?: { name: string; description: string; url?: string }[]
  activities?: string[]
  clubs?: string[]
  looking_for?: 'internship' | 'collab' | 'mentor' | 'friends'
  email?: string
  linkedin?: string
  github?: string
}

export type ProfileData =
  | MatrimonialData
  | ProfessionalData
  | DatingData
  | HobbiesData
  | NewInTownData
  | StudentData

export interface TierLimits {
  maxPages: number
  maxPhotos: number
  templates: TemplateId[]
  privacyModes: PrivacyMode[]
  features: string[]
}
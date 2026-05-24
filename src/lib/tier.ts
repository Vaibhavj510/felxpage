import { Plan, TemplateId, PrivacyMode, TierLimits } from '@/types'

export const TIER_LIMITS: Record<Plan, TierLimits> = {
  free: {
    maxPages: 1,
    maxPhotos: 3,
    templates: ['aarambh'],
    privacyModes: ['public'],
    features: [],
  },
  pro: {
    maxPages: 2,
    maxPhotos: 10,
    templates: ['aarambh', 'roshni', 'kiran', 'safar'],
    privacyModes: ['public', 'link_only'],
    features: ['gallery', 'family', 'closing_quote', 'analytics_total', 'og_card'],
  },
  premium: {
    maxPages: 5,
    maxPhotos: 20,
    templates: ['aarambh', 'roshni', 'kiran', 'safar', 'neev', 'udaan'],
    privacyModes: ['public', 'link_only', 'shield'],
    features: [
      'gallery', 'family', 'closing_quote', 'analytics_chart',
      'og_card', 'download_card', 'ai_bio', 'language_toggle',
      'cv_upload', 'embeds', 'shield', 'contact_download',
    ],
  },
  custom: {
    maxPages: 999,
    maxPhotos: 999,
    templates: ['aarambh', 'roshni', 'kiran', 'safar', 'neev', 'udaan'],
    privacyModes: ['public', 'link_only', 'shield'],
    features: ['all'],
  },
}

export function canUseTemplate(plan: Plan, templateId: TemplateId): boolean {
  return TIER_LIMITS[plan].templates.includes(templateId)
}

export function canUsePrivacyMode(plan: Plan, mode: PrivacyMode): boolean {
  return TIER_LIMITS[plan].privacyModes.includes(mode)
}

export function canUseFeature(plan: Plan, feature: string): boolean {
  const limits = TIER_LIMITS[plan]
  return limits.features.includes('all') || limits.features.includes(feature)
}

export function getMaxPhotos(plan: Plan): number {
  return TIER_LIMITS[plan].maxPhotos
}

export function getMaxPages(plan: Plan): number {
  return TIER_LIMITS[plan].maxPages
}
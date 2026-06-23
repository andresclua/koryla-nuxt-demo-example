import { getVariant } from '../../lib/getVariant'

// Edge-style routes: intercept before the page renders and rewrite the path.
// Equivalent to Next.js middleware.ts or Netlify edge functions.
const EDGE_ROUTES: Record<string, string> = {
  '/hero':          'NUXT_KORYLA_HERO_EXPERIMENT_ID',
  '/pricing':       'NUXT_KORYLA_PRICING_EXPERIMENT_ID',
  '/demo-edge':     'NUXT_KORYLA_DEMO_EDGE_EXPERIMENT_ID',
  '/demo-combined': 'NUXT_KORYLA_DEMO_COMBINED_EXPERIMENT_ID',
}

export default defineEventHandler(async (event) => {
  const path = event.path.split('?')[0]
  const envKey = EDGE_ROUTES[path]
  if (!envKey) return // not an edge experiment route

  const apiKey  = process.env.NUXT_KORYLA_API_KEY  ?? ''
  const apiUrl  = process.env.NUXT_KORYLA_API_URL  ?? ''
  const expId   = process.env[envKey] ?? ''
  if (!apiKey || !apiUrl || !expId) return

  const cookieHeader = getRequestHeader(event, 'cookie') ?? null
  const result = await getVariant(cookieHeader, expId, { apiKey, apiUrl })
  if (!result) return

  // Set sticky cookie if this is a new assignment
  if (result.isNewAssignment) {
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()
    appendResponseHeader(event, 'Set-Cookie',
      `${result.cookieName}=${result.variantId}; Path=/; Expires=${expires}; SameSite=Lax`)
  }

  // Rewrite path for variant B (non-control variants)
  if (!result.variant.is_control) {
    event.path = `${path}-b${event.path.includes('?') ? '?' + event.path.split('?')[1] : ''}`
  }
})

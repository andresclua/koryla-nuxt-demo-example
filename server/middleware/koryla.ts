import { createSplitEngine } from '@koryla/core'

// ponytail: singleton, same pattern as @koryla/next
let engine: ReturnType<typeof createSplitEngine> | null = null

export default defineEventHandler(async (event) => {
  const apiKey = process.env.NUXT_KORYLA_API_KEY ?? ''
  const apiUrl = process.env.NUXT_KORYLA_API_URL ?? ''
  if (!apiKey || !apiUrl) return

  if (!engine) engine = createSplitEngine({ apiKey, apiUrl })

  const result = await engine.process(
    `${apiUrl}${event.path}`,
    getRequestHeader(event, 'cookie') ?? ''
  )

  // Pass variant path to the page component via event context.
  // useState in the page reads this on SSR and serializes it into the Nuxt
  // payload so client hydration uses the same value — no hydration mismatch.
  if (result) {
    const url = new URL(result.targetUrl)
    event.context.korylaVariantPath = url.pathname
  } else {
    event.context.korylaVariantPath = null
  }

  if (!result) return

  if (result.isNewAssignment) {
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()
    appendResponseHeader(event, 'Set-Cookie',
      `${result.cookieName}=${result.variantId}; Path=/; Expires=${expires}; SameSite=Lax`)
  }

  if (result.isNewSession) {
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()
    appendResponseHeader(event, 'Set-Cookie',
      `ky_sid=${result.sessionId}; Path=/; Expires=${expires}; SameSite=Lax`)
  }
})

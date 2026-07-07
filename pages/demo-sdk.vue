<template>
  <main :style="s.page">
    <div :style="s.variantBadge">{{ sdkVariation ? 'b' : 'control' }} — /demo-sdk</div>
    <div :style="s.pill">SDK EXPERIMENT · CONTENT + STYLE</div>
    <h1 :style="s.h1">Same URL.<br />Different content.</h1>
    <p :style="s.subtitle">
      <code :style="s.code">getKorylaVariant()</code> runs server-side during SSR.
      The variant is assigned before any HTML is sent — same URL, different content, zero flicker.
    </p>

    <div :style="s.sdkBox">
      <p :style="s.sdkHeadline">{{ sdkVariation ? 'Stop guessing. Start winning.' : 'The fastest way to A/B test.' }}</p>
      <p :style="s.sdkSub">{{ sdkVariation ? 'Run your first experiment in minutes, not weeks.' : 'No flicker. No latency. Just results.' }}</p>
      <a href="/thank-you" :style="sdkVariation ? s.btnFilled : s.btnOutline">{{ sdkVariation ? 'Make it happen →' : 'Get started →' }}</a>
      <p :style="s.btnLabel">SDK: {{ sdkVariation ? 'variation-1' : 'control' }}</p>
    </div>

    <div :style="s.box">
      <p :style="s.boxTitle">Try both variants</p>
      <div :style="s.links">
        <a href="/demo-sdk" :style="s.link">Control</a>
        <a href="/demo-sdk?utm_koryla=variation-1" :style="s.linkFilled">Variation-1 →</a>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { getKorylaVariant } from '@koryla/vue'

const route = useRoute()
const config = useRuntimeConfig()
const headers = useRequestHeaders(['cookie'])

const result = await getKorylaVariant(
  config.korylaSDKExperimentId,
  headers.cookie ?? '',
  { apiKey: config.korylaApiKey, apiUrl: config.korylaApiUrl },
  useRequestURL().href,
)

// utm_koryla=variation-1 overrides via DB override_assignment rule; else use experiment result
const sdkVariation = route.query.utm_koryla === 'variation-1' || result?.variant?.name === 'variant-b'

if (result?.isNewAssignment) {
  const event = useRequestEvent()
  if (event) {
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()
    appendResponseHeader(event, 'Set-Cookie',
      `${result.cookieName}=${result.variantId}; Path=/; Expires=${expires}; SameSite=Lax`)
  }
}

const s = {
  page:        { maxWidth: '720px', margin: '0 auto', padding: '80px 40px', textAlign: 'center' as const },
  variantBadge:{ display: 'inline-block', marginBottom: '16px', background: '#e5e7eb', color: '#6b7280', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', letterSpacing: '.5px' },
  pill:        { display: 'inline-block', background: '#FEF0E8', color: '#C96A3F', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px', marginBottom: '24px', letterSpacing: '.5px' },
  h1:          { fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#0F2235', marginBottom: '16px', lineHeight: 1.1 },
  subtitle:    { fontSize: '17px', color: '#6b7280', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.6 },
  code:        { background: '#F5EDE0', padding: '2px 6px', borderRadius: '4px', fontSize: '14px' },
  sdkBox:      { background: '#F5EDE0', border: '1px solid #EAD9C4', borderRadius: '16px', padding: '28px 32px', marginBottom: '32px', display: 'flex', flexDirection: 'column' as const, gap: '8px', textAlign: 'left' as const },
  sdkHeadline: { fontSize: '22px', fontWeight: 800, color: '#0F2235', letterSpacing: '-0.5px', margin: 0 },
  sdkSub:      { fontSize: '14px', color: '#6b7280', margin: 0, marginBottom: '8px' },
  btnFilled:   { display: 'inline-block', background: '#C96A3F', color: '#fff', padding: '14px 32px', borderRadius: '12px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', alignSelf: 'flex-start' as const },
  btnOutline:  { display: 'inline-block', background: 'transparent', color: '#C96A3F', padding: '14px 32px', borderRadius: '12px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', border: '2px solid #C96A3F', alignSelf: 'flex-start' as const },
  btnLabel:    { fontSize: '12px', color: '#9ca3af', margin: 0 },
  box:         { background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', textAlign: 'left' as const },
  boxTitle:    { fontSize: '12px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' as const, letterSpacing: '.5px', marginBottom: '12px' },
  links:       { display: 'flex', gap: '12px', flexWrap: 'wrap' as const },
  link:        { fontSize: '13px', color: '#0F2235', background: '#fff', border: '1px solid #e5e7eb', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 },
  linkFilled:  { fontSize: '13px', color: '#fff', background: '#C96A3F', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 },
}
</script>

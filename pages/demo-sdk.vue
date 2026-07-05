<template>
  <main :style="s.page">
    <div :style="s.variantBadge">
      {{ variantId }} — /demo-sdk
      <span v-if="isForced" :style="s.forcedTag">forced via query param</span>
    </div>
    <div :style="s.pill">SDK EXPERIMENT · BUTTON STYLE</div>
    <h1 :style="s.h1">Same URL.<br />Different button.</h1>
    <p :style="s.subtitle">
      <code :style="s.code">getKorylaVariant()</code> runs server-side during SSR.
      The variant is assigned before any HTML is sent — same URL, different content, zero flicker.
    </p>

    <KExperiment :variant-id="variantId">
      <KVariant id="control">
        <p :style="s.current">Currently showing: <strong :style="s.strong">Control — outlined button</strong></p>
        <div :style="s.btnWrap">
          <a href="/thank-you" :style="s.btnOutline">Start free today</a>
        </div>
      </KVariant>
      <KVariant id="variant-b">
        <p :style="s.current">Currently showing: <strong :style="s.strong">Variant B — filled button</strong></p>
        <div :style="s.btnWrap">
          <a href="/thank-you" :style="s.btnFilled">Start free today</a>
        </div>
      </KVariant>
    </KExperiment>

    <div :style="s.box">
      <p :style="s.boxTitle">Preview both variants</p>
      <p :style="s.boxText">
        Normally the variant is read from the <code :style="s.code">ky_*</code> cookie — random 50/50, sticky 30 days.
        Use the query param below to force a specific variant for QA or design review.
      </p>
      <div :style="s.links">
        <a href="/demo-sdk?koryla_variant=control" :style="s.link">Control (outlined)</a>
        <a href="/demo-sdk?koryla_variant=variant-b" :style="s.linkFilled">Variant B (filled) →</a>
        <a href="/demo-sdk" :style="s.linkNeutral">Clear override</a>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { getKorylaVariant, KExperiment, KVariant } from '@koryla/vue'

const route = useRoute()
const config = useRuntimeConfig()
const headers = useRequestHeaders(['cookie'])

// ?koryla_variant=<id> forces a specific variant — useful for QA/design preview.
// Does not set a cookie and does not fire an impression event.
const forceParam = route.query.koryla_variant as string | undefined
const isForced = !!forceParam

const result = isForced
  ? null
  : await getKorylaVariant(
      config.korylaSDKExperimentId,
      headers.cookie ?? '',
      { apiKey: config.korylaApiKey, apiUrl: config.korylaApiUrl },
    )

// KVariant matches by variant name, not UUID — use result.variant.name
const variantId = forceParam ?? result?.variant?.name ?? ''

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
  forcedTag:   { marginLeft: '6px', background: '#fef9c3', color: '#854d0e', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' },
  pill:        { display: 'inline-block', background: '#FEF0E8', color: '#C96A3F', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px', marginBottom: '24px', letterSpacing: '.5px' },
  h1:          { fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#0F2235', marginBottom: '16px', lineHeight: 1.1 },
  subtitle:    { fontSize: '17px', color: '#6b7280', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.6 },
  code:        { background: '#F5EDE0', padding: '2px 6px', borderRadius: '4px', fontSize: '14px' },
  current:     { fontSize: '13px', color: '#9ca3af', marginBottom: '24px' },
  strong:      { color: '#0F2235' },
  btnWrap:     { display: 'flex', justifyContent: 'center', marginBottom: '48px' },
  btnFilled:   { display: 'inline-block', background: '#C96A3F', color: '#fff', padding: '14px 36px', borderRadius: '12px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' },
  btnOutline:  { display: 'inline-block', background: 'transparent', color: '#C96A3F', padding: '14px 36px', borderRadius: '12px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', border: '2px solid #C96A3F' },
  box:         { background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', textAlign: 'left' as const },
  boxTitle:    { fontSize: '12px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' as const, letterSpacing: '.5px', marginBottom: '8px' },
  boxText:     { fontSize: '13px', color: '#6b7280', lineHeight: 1.6, margin: '0 0 16px' },
  links:       { display: 'flex', gap: '8px', flexWrap: 'wrap' as const },
  link:        { fontSize: '13px', color: '#0F2235', background: '#fff', border: '1px solid #e5e7eb', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 },
  linkFilled:  { fontSize: '13px', color: '#fff', background: '#C96A3F', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 },
  linkNeutral: { fontSize: '13px', color: '#9ca3af', background: '#fff', border: '1px solid #e5e7eb', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 },
}
</script>

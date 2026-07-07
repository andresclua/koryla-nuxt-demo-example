<template>
  <!-- Variant B: two-column layout -->
  <main v-if="isVariantB" :style="sb.page">
    <div :style="sb.variantBadge">b — /demo-combined</div>
    <div :style="sb.grid">
      <div>
        <div :style="sb.pill">COMBINED EXPERIMENT · EDGE + SDK</div>
        <h1 :style="sb.h1">Koryla on Nuxt —<br /><span :style="sb.accent">two layers of control.</span></h1>
        <p :style="sb.subtitle">
          <strong :style="sb.strong">Edge layer</strong> assigned you variant B (two-column layout).
          The <strong :style="sb.strong">SDK layer</strong> still controls the button independently.
        </p>
        <div :style="sb.sdkBox">
          <p :style="sb.sdkHeadline">{{ sdkVariation ? 'Stop guessing. Start winning.' : 'The fastest way to A/B test.' }}</p>
          <p :style="sb.sdkSub">{{ sdkVariation ? 'Run your first experiment in minutes, not weeks.' : 'No flicker. No latency. Just results.' }}</p>
          <a href="/thank-you" :style="sdkVariation ? sb.btnFilled : sb.btnOutline">{{ sdkVariation ? 'Make it happen →' : 'Get started →' }}</a>
          <p :style="sb.btnLabel">SDK: {{ sdkVariation ? 'variation-1' : 'control' }}</p>
        </div>
        <div :style="sb.links">
          <a href="/demo-combined" :style="sb.link">Control layout</a>
          <a href="/demo-combined?utm_koryla=variation-1" :style="sb.linkFilled">B layout + SDK B</a>
        </div>
      </div>
      <div :style="sb.cards">
        <div v-for="[icon, title, desc] in featureCards" :key="title" :style="sb.card">
          <span :style="sb.icon">{{ icon }}</span>
          <div>
            <p :style="sb.cardTitle">{{ title }}</p>
            <p :style="sb.cardDesc">{{ desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Control: single-column -->
  <main v-else :style="sa.page">
    <div :style="sa.variantBadge">control — /demo-combined</div>
    <div :style="sa.pill">COMBINED EXPERIMENT · EDGE + SDK</div>
    <h1 :style="sa.h1">Koryla on Nuxt —<br />two layers of control.</h1>
    <p :style="sa.subtitle">
      <strong :style="sa.strong">Layer 1 — Edge:</strong> middleware assigned you the control layout (this single-column page).
      <br /><br />
      <strong :style="sa.strong">Layer 2 — SDK:</strong> <code :style="sa.code">?utm_koryla=variation-1</code> changes headline, copy and button simultaneously.
    </p>
    <div :style="sa.sdkBox">
      <p :style="sa.sdkHeadline">{{ sdkVariation ? 'Stop guessing. Start winning.' : 'The fastest way to A/B test.' }}</p>
      <p :style="sa.sdkSub">{{ sdkVariation ? 'Run your first experiment in minutes, not weeks.' : 'No flicker. No latency. Just results.' }}</p>
      <a href="/thank-you" :style="sdkVariation ? sa.btnFilled : sa.btnOutline">{{ sdkVariation ? 'Make it happen →' : 'Get started →' }}</a>
      <p :style="sa.btnLabel">SDK: {{ sdkVariation ? 'variation-1' : 'control' }}</p>
    </div>
    <div :style="sa.box">
      <p :style="sa.boxTitle">Try combinations</p>
      <div :style="sa.links">
        <a href="/demo-combined" :style="sa.link">Edge control + SDK control</a>
        <a href="/demo-combined?utm_koryla=variation-1" :style="sa.link">Edge control + SDK B</a>
      </div>
      <p :style="sa.hint">Clear cookies and reload to be re-assigned by the edge layer.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const sdkVariation = route.query.utm_koryla === 'variation-1'

const variantPath = useState('korylaEdgeVariantCombined', () =>
  useRequestEvent()?.context?.korylaVariantPath ?? null
)
const isVariantB = computed(() => variantPath.value === '/demo-combined-b')

const featureCards = [
  ['🚀', 'Edge-first', 'Middleware runs before any Vue renders.'],
  ['🔬', 'SDK layer', 'Component-level control with zero extra requests.'],
  ['📈', 'Both tracked', 'Each layer records its own impressions independently.'],
]

const sa = {
  page:        { maxWidth: '720px', margin: '0 auto', padding: '80px 40px' },
  variantBadge:{ display: 'inline-block', marginBottom: '16px', background: '#e5e7eb', color: '#6b7280', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', letterSpacing: '.5px' },
  pill:        { display: 'inline-block', background: '#F5EDE0', color: '#C96A3F', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px', marginBottom: '24px', letterSpacing: '.5px' },
  h1:          { fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#0F2235', marginBottom: '16px', lineHeight: 1.1 },
  subtitle:    { fontSize: '17px', color: '#6b7280', lineHeight: 1.65, marginBottom: '40px' },
  strong:      { color: '#0F2235' },
  code:        { background: '#F5EDE0', padding: '2px 6px', borderRadius: '4px', fontSize: '14px' },
  sdkBox:      { background: '#F5EDE0', border: '1px solid #EAD9C4', borderRadius: '16px', padding: '28px 32px', marginBottom: '32px', display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  sdkHeadline: { fontSize: '22px', fontWeight: 800, color: '#0F2235', letterSpacing: '-0.5px', margin: 0 },
  sdkSub:      { fontSize: '14px', color: '#6b7280', margin: 0, marginBottom: '8px' },
  btnFilled:   { display: 'inline-block', background: '#C96A3F', color: '#fff', padding: '14px 32px', borderRadius: '12px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', alignSelf: 'flex-start' as const },
  btnOutline:  { display: 'inline-block', background: 'transparent', color: '#C96A3F', padding: '14px 32px', borderRadius: '12px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', border: '2px solid #C96A3F', alignSelf: 'flex-start' as const },
  btnLabel:    { fontSize: '12px', color: '#9ca3af', margin: 0 },
  box:         { background: '#F5EDE0', border: '1px solid #EAD9C4', borderRadius: '16px', padding: '24px' },
  boxTitle:    { fontSize: '12px', fontWeight: 700, color: '#C96A3F', textTransform: 'uppercase' as const, letterSpacing: '.5px', marginBottom: '12px' },
  links:       { display: 'flex', gap: '8px', flexWrap: 'wrap' as const },
  link:        { fontSize: '12px', color: '#0F2235', background: '#fff', border: '1px solid #EAD9C4', padding: '5px 12px', borderRadius: '8px', textDecoration: 'none' },
  hint:        { fontSize: '11px', color: '#9ca3af', marginTop: '10px', marginBottom: 0 },
}

const sb = {
  page:        { maxWidth: '1000px', margin: '0 auto', padding: '80px 40px' },
  variantBadge:{ display: 'inline-block', marginBottom: '16px', background: '#e5e7eb', color: '#6b7280', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', letterSpacing: '.5px' },
  grid:        { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' },
  pill:        { display: 'inline-block', background: '#F5EDE0', color: '#C96A3F', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px', marginBottom: '24px', letterSpacing: '.5px' },
  h1:          { fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#0F2235', marginBottom: '16px', lineHeight: 1.1 },
  accent:      { color: '#C96A3F' },
  subtitle:    { fontSize: '16px', color: '#6b7280', lineHeight: 1.65, marginBottom: '28px' },
  strong:      { color: '#0F2235' },
  sdkBox:      { background: '#F5EDE0', border: '1px solid #EAD9C4', borderRadius: '14px', padding: '22px 24px', marginBottom: '16px', display: 'flex', flexDirection: 'column' as const, gap: '6px' },
  sdkHeadline: { fontSize: '18px', fontWeight: 800, color: '#0F2235', letterSpacing: '-0.5px', margin: 0 },
  sdkSub:      { fontSize: '13px', color: '#6b7280', margin: 0, marginBottom: '6px' },
  btnFilled:   { display: 'inline-block', background: '#C96A3F', color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', alignSelf: 'flex-start' as const },
  btnOutline:  { display: 'inline-block', background: 'transparent', color: '#C96A3F', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', border: '2px solid #C96A3F', alignSelf: 'flex-start' as const },
  btnLabel:    { fontSize: '12px', color: '#9ca3af', margin: 0 },
  links:       { display: 'flex', gap: '8px', flexWrap: 'wrap' as const },
  link:        { fontSize: '12px', color: '#0F2235', background: '#fff', border: '1px solid #e5e7eb', padding: '5px 12px', borderRadius: '8px', textDecoration: 'none' },
  linkFilled:  { fontSize: '12px', color: '#fff', background: '#C96A3F', padding: '5px 12px', borderRadius: '8px', textDecoration: 'none' },
  cards:       { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
  card:        { display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#F5EDE0', border: '1px solid #EAD9C4', borderRadius: '14px', padding: '16px 20px' },
  icon:        { fontSize: '22px' },
  cardTitle:   { fontSize: '14px', fontWeight: 700, color: '#0F2235', margin: 0 },
  cardDesc:    { fontSize: '13px', color: '#6b7280', marginTop: '2px', marginBottom: 0 },
}
</script>

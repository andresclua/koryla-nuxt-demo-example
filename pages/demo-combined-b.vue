<template>
  <main :style="s.page">
    <div :style="s.variantBadge">b — /demo-combined</div>
    <div :style="s.grid">
      <div>
        <div :style="s.pill">COMBINED EXPERIMENT · EDGE + SDK</div>
        <h1 :style="s.h1">Koryla on Nuxt —<br />two layers of control.</h1>
        <p :style="s.subtitle">
          Edge assigned you variant B (two-column layout).
          The SDK still controls the button style independently.
        </p>
        <a href="/thank-you" :style="filledButton ? s.btnFilled : s.btnOutline">Start free today</a>
        <p :style="s.btnLabel">Button: {{ filledButton ? 'SDK variant B (filled)' : 'SDK control (outlined)' }}</p>
      </div>
      <div :style="s.cards">
        <div v-for="[icon, title, desc] in features" :key="title" :style="s.card">
          <span :style="s.icon">{{ icon }}</span>
          <div>
            <p :style="s.cardTitle">{{ title }}</p>
            <p :style="s.cardDesc">{{ desc }}</p>
          </div>
        </div>
        <div :style="s.linksBox">
          <p :style="s.linksTitle">Try combinations</p>
          <div :style="s.links">
            <a href="/demo-combined" :style="s.link">Control layout</a>
            <a href="/demo-combined-b?utm_style=variation-1" :style="s.linkFilled">B layout + filled btn</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const filledButton = route.query.utm_style === 'variation-1'
const features = [
  ['🚀', 'Edge-first', 'Middleware runs before any Vue renders.'],
  ['🔬', 'SDK layer', 'Component-level control with zero extra requests.'],
  ['📈', 'Both tracked', 'Each layer records its own impressions independently.'],
]
const s = {
  page:        { maxWidth: '1000px', margin: '0 auto', padding: '80px 40px' },
  variantBadge:{ display: 'inline-block', marginBottom: '16px', background: '#e5e7eb', color: '#6b7280', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', letterSpacing: '.5px' },
  grid:        { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' },
  pill:        { display: 'inline-block', background: '#F5EDE0', color: '#C96A3F', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px', marginBottom: '24px', letterSpacing: '.5px' },
  h1:          { fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#0F2235', marginBottom: '16px', lineHeight: 1.1 },
  subtitle:    { fontSize: '16px', color: '#6b7280', lineHeight: 1.65, marginBottom: '28px' },
  btnFilled:   { display: 'inline-block', background: '#C96A3F', color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', textDecoration: 'none' },
  btnOutline:  { display: 'inline-block', background: 'transparent', color: '#C96A3F', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', border: '2px solid #C96A3F' },
  btnLabel:    { fontSize: '12px', color: '#9ca3af', marginTop: '8px' },
  cards:       { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
  card:        { display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#F5EDE0', border: '1px solid #EAD9C4', borderRadius: '14px', padding: '16px 20px' },
  icon:        { fontSize: '22px' },
  cardTitle:   { fontSize: '14px', fontWeight: 700, color: '#0F2235', margin: 0 },
  cardDesc:    { fontSize: '13px', color: '#6b7280', marginTop: '2px', marginBottom: 0 },
  linksBox:    { background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '14px', padding: '16px 20px' },
  linksTitle:  { fontSize: '12px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' as const, letterSpacing: '.5px', marginBottom: '8px' },
  links:       { display: 'flex', gap: '8px', flexWrap: 'wrap' as const },
  link:        { fontSize: '12px', color: '#0F2235', background: '#fff', border: '1px solid #e5e7eb', padding: '5px 12px', borderRadius: '8px', textDecoration: 'none' },
  linkFilled:  { fontSize: '12px', color: '#fff', background: '#C96A3F', padding: '5px 12px', borderRadius: '8px', textDecoration: 'none' },
}
</script>

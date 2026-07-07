<template>
  <main :style="s.page">
    <div :style="s.variantBadge">b — /hero</div>
    <div :style="s.grid">
      <div>
        <div :style="s.pill">
          <span :style="s.dot" />
          TRUSTED BY 1,200 TEAMS · NO CREDIT CARD
        </div>
        <h1 :style="s.h1">Build what users<br /><span :style="s.accent">actually want.</span></h1>
        <p :style="s.subtitle">
          Run your first A/B test in under 5 minutes — no code changes,
          no flicker, no developer bottleneck. Just results.
        </p>
        <a href="/thank-you" :style="s.btn">Start free today</a>
        <p :style="s.footnote">Free forever on the hobby plan · Cancel anytime</p>
      </div>
      <div :style="s.cards">
        <div v-for="[icon, title, desc] in features" :key="title" :style="s.card">
          <span :style="s.icon">{{ icon }}</span>
          <div>
            <p :style="s.cardTitle">{{ title }}</p>
            <p :style="s.cardDesc">{{ desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
const features = [
  ['⚡', 'Zero flicker', 'Variants are assigned before the browser renders anything.'],
  ['🔒', 'No client JS', "Works entirely server-side — ad blockers can't interfere."],
  ['📊', 'Live results', 'See impressions and conversions in your dashboard in real time.'],
  ['🔌', 'Any stack', 'Next.js, Astro, WordPress, Nuxt — one API key, any platform.'],
]
const s = {
  page:        { maxWidth: '1100px', margin: '0 auto', padding: '80px 40px' },
  variantBadge:{ display: 'inline-block', marginBottom: '24px', background: '#e5e7eb', color: '#6b7280', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', letterSpacing: '.5px' },
  grid:        { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' },
  pill:        { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FEF0E8', color: '#C96A3F', fontSize: '13px', fontWeight: 600, padding: '6px 14px', borderRadius: '999px', marginBottom: '24px' },
  dot:         { width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', display: 'inline-block' },
  h1:          { fontSize: 'clamp(36px,4vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: '20px', color: '#0F2235' },
  accent:      { color: '#C96A3F' },
  subtitle:    { fontSize: '17px', color: '#4b5563', lineHeight: 1.65, marginBottom: '32px' },
  btn:         { display: 'inline-block', background: '#0F2235', color: '#fff', padding: '12px 24px', borderRadius: '10px', fontWeight: 600, fontSize: '14px', textDecoration: 'none' },
  footnote:    { fontSize: '12px', color: '#9ca3af', marginTop: '10px' },
  cards:       { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
  card:        { display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#F5EDE0', border: '1px solid #EAD9C4', borderRadius: '14px', padding: '16px 20px' },
  icon:        { fontSize: '22px' },
  cardTitle:   { fontSize: '14px', fontWeight: 700, color: '#0F2235', margin: 0 },
  cardDesc:    { fontSize: '13px', color: '#6b7280', marginTop: '2px', marginBottom: 0 },
}
export default { setup: () => ({ features, s }) }
</script>

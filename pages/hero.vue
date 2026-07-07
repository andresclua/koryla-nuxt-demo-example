<template>
  <!-- Variant B -->
  <main v-if="isVariantB" :style="sb.page">
    <div :style="sb.variantBadge">b — /hero</div>
    <div :style="sb.grid">
      <div>
        <div :style="sb.pill">
          <span :style="sb.dot" />
          TRUSTED BY 1,200 TEAMS · NO CREDIT CARD
        </div>
        <h1 :style="sb.h1">Build what users<br /><span :style="sb.accent">actually want.</span></h1>
        <p :style="sb.subtitle">
          Run your first A/B test in under 5 minutes — no code changes,
          no flicker, no developer bottleneck. Just results.
        </p>
        <a href="/thank-you" :style="sb.btn">Start free today</a>
        <p :style="sb.footnote">Free forever on the hobby plan · Cancel anytime</p>
      </div>
      <div :style="sb.cards">
        <div v-for="[icon, title, desc] in features" :key="title" :style="sb.card">
          <span :style="sb.icon">{{ icon }}</span>
          <div>
            <p :style="sb.cardTitle">{{ title }}</p>
            <p :style="sb.cardDesc">{{ desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Control -->
  <main v-else :style="sa.page">
    <div :style="sa.pill">SERVER-SIDE A/B TESTING · NUXT</div>
    <h1 :style="sa.h1">Ship faster<br />with data</h1>
    <p :style="sa.subtitle">
      Stop debating in meetings. Run a test, get an answer in days — not quarters.
      Koryla assigns variants server-side before HTML is sent to the browser.
    </p>
    <div :style="sa.actions">
      <a href="/thank-you" :style="sa.btnPrimary">Start for free</a>
      <a href="/pricing" :style="sa.btnSecondary">See pricing</a>
    </div>
    <p :style="sa.footnote">No credit card required · Free forever on the hobby plan</p>
    <div :style="sa.statsBox">
      <div :style="sa.statsRow">
        <div v-for="[val, label] in stats" :key="label" :style="sa.statCard">
          <p :style="sa.statVal">{{ val }}</p>
          <p :style="sa.statLabel">{{ label }}</p>
        </div>
      </div>
      <div :style="sa.bar" />
    </div>
    <div :style="sa.variantBadge">control — /hero</div>
  </main>
</template>

<script lang="ts">
const stats = [['12,400', 'Tests run'], ['23%', 'Avg. uplift'], ['4.2 days', 'To significance']]
const features = [
  ['⚡', 'Zero flicker', 'Variants are assigned before the browser renders anything.'],
  ['🔒', 'No client JS', "Works entirely server-side — ad blockers can't interfere."],
  ['📊', 'Live results', 'See impressions and conversions in your dashboard in real time.'],
  ['🔌', 'Any stack', 'Next.js, Astro, WordPress, Nuxt — one API key, any platform.'],
]
const sa = {
  page:         { maxWidth: '900px', margin: '0 auto', padding: '80px 40px', textAlign: 'center' as const },
  pill:         { display: 'inline-block', background: '#FEF0E8', color: '#C96A3F', fontSize: '13px', fontWeight: 600, padding: '6px 14px', borderRadius: '999px', marginBottom: '24px', letterSpacing: '.3px' },
  h1:           { fontSize: 'clamp(40px,6vw,72px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', marginBottom: '24px', color: '#0F2235' },
  subtitle:     { fontSize: '18px', color: '#6b7280', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.6 },
  actions:      { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' as const },
  btnPrimary:   { background: '#C96A3F', color: '#fff', padding: '14px 32px', borderRadius: '12px', fontWeight: 600, fontSize: '15px', textDecoration: 'none' },
  btnSecondary: { background: '#f9fafb', color: '#374151', padding: '14px 32px', borderRadius: '12px', fontWeight: 600, fontSize: '15px', border: '1px solid #e5e7eb', textDecoration: 'none' },
  footnote:     { fontSize: '13px', color: '#9ca3af', marginTop: '16px' },
  statsBox:     { marginTop: '64px', background: '#F5EDE0', border: '1px solid #EAD9C4', borderRadius: '20px', padding: '32px', textAlign: 'left' as const },
  statsRow:     { display: 'flex', gap: '16px', marginBottom: '24px' },
  statCard:     { flex: 1, background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' },
  statVal:      { fontSize: '28px', fontWeight: 700, color: '#0F2235', margin: 0 },
  statLabel:    { fontSize: '13px', color: '#9ca3af', marginTop: '4px', marginBottom: 0 },
  bar:          { height: '80px', background: 'linear-gradient(to right,#F0C9B0,#C96A3F,#F0C9B0)', borderRadius: '8px', opacity: .4 },
  variantBadge: { display: 'inline-block', marginTop: '32px', background: '#e5e7eb', color: '#6b7280', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', letterSpacing: '.5px' },
}
const sb = {
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

export default {
  setup() {
    // useState serializes the SSR value into the Nuxt payload so the client
    // hydrates with the same value — no hydration mismatch.
    const variantPath = useState('korylaHeroVariant', () =>
      useRequestEvent()?.context?.korylaVariantPath ?? null
    )
    const isVariantB = computed(() => variantPath.value === '/hero-b')
    return { isVariantB, stats, features, sa, sb }
  },
}
</script>

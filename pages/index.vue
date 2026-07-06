<template>
  <main :style="{ maxWidth: '860px', margin: '0 auto', padding: '80px 40px' }">
    <header :style="{ marginBottom: '48px' }">
      <span :style="{ display: 'inline-block', background: '#FEF0E8', color: '#C96A3F', fontSize: '13px', fontWeight: 600, padding: '6px 14px', borderRadius: '999px', marginBottom: '24px' }">
        LIVE DEMO · NUXT SSR + NITRO MIDDLEWARE
      </span>
      <h1 :style="{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: '16px', color: '#0F2235' }">
        A/B testing with Nuxt
      </h1>
      <p :style="{ fontSize: '17px', color: '#6b7280', maxWidth: '520px', lineHeight: 1.6, marginBottom: '16px' }">
        Each experiment runs server-side via <code :style="{ background: '#F5EDE0', padding: '1px 5px', borderRadius: '4px' }">Nitro middleware</code>.
        Variants are assigned before any HTML is sent. Zero flicker, zero client JS.
      </p>
      <div :style="{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#9ca3af' }">
        <span :style="{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }"></span>
        Nitro middleware active on /hero · /pricing · /demo-edge · /demo-combined
      </div>
    </header>

    <div :style="{ display: 'flex', flexDirection: 'column', gap: '16px' }">
      <a v-for="demo in demos" :key="demo.href" :href="demo.href"
        :style="{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '24px', textDecoration: 'none' }"
      >
        <div :style="{ flexShrink: 0, width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, background: demo.bg, color: demo.color }">
          {{ demo.number }}
        </div>
        <div :style="{ flex: 1 }">
          <span :style="{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', letterSpacing: '.3px', background: demo.bg, color: demo.color }">
            {{ demo.type.toUpperCase() }}
          </span>
          <h2 :style="{ fontSize: '16px', fontWeight: 700, color: '#0F2235', margin: '6px 0 4px' }">{{ demo.title }}</h2>
          <p :style="{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, marginBottom: '12px' }">{{ demo.description }}</p>
          <ul :style="{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }">
            <li v-for="(w, i) in demo.what" :key="i" :style="{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#6b7280' }">
              <span :style="{ marginTop: '5px', width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, background: i === 0 ? '#d1d5db' : demo.color }"></span>
              {{ w }}
            </li>
          </ul>
        </div>
        <span :style="{ color: '#d1d5db', fontSize: '18px', flexShrink: 0 }">→</span>
      </a>
    </div>

    <p :style="{ marginTop: '40px', fontSize: '12px', textAlign: 'center', color: '#9ca3af' }">
      Clear your cookies to be re-assigned. Edge experiments use a <code>ky_</code> cookie. SDK experiments use URL params.
    </p>
  </main>
</template>

<script lang="ts">
const demos = [
  {
    href: '/hero', number: '01', type: 'Edge · Layout',
    title: 'Hero Layout Test',
    description: 'Two completely different page layouts behind the same URL. Nitro middleware rewrites /hero → /hero-b transparently. No JavaScript required.',
    what: ['Control: Single-column — "Ship faster with data"', 'Variant B: Two-column with feature cards — "Build what users actually want"'],
    color: '#C96A3F', bg: '#FEF0E8',
  },
  {
    href: '/pricing', number: '02', type: 'Edge · Content',
    title: 'Pricing Page Test',
    description: 'Two entirely separate pricing pages at different URLs. The middleware sends half the traffic to /pricing-b transparently.',
    what: ['Control: 3-tier grid (Free / Starter / Growth)', 'Variant B: 2-tier with annual billing toggle'],
    color: '#0F2235', bg: '#F5EDE0',
  },
  {
    href: '/demo-edge', number: '03', type: 'Edge · URL rewrite',
    title: 'Edge Rewrite Explainer',
    description: 'Visual walkthrough of how Nitro middleware intercepts a request and rewrites the path server-side — browser sees no change.',
    what: ['Control: Light page — steps on white background', 'Variant B: Dark page — same steps, navy background'],
    color: '#0F2235', bg: '#f0f4f8',
  },
  {
    href: '/demo-sdk', number: '04', type: 'SDK · UTM',
    title: 'SDK Button Style Test',
    description: 'No middleware rewrite — getVariant() is called inside the page component. Same URL, no cookies, variant driven by URL param.',
    what: ['Control: Outlined button', 'Variant B: Filled terracotta button — add ?utm_text=variation-1'],
    color: '#C96A3F', bg: '#FEF0E8',
  },
  {
    href: '/demo-combined', number: '05', type: 'Edge + SDK',
    title: 'Combined Layers',
    description: 'Two independent layers: edge controls the page layout, SDK controls the button style. Four possible combinations.',
    what: ['Layer 1 (Edge): single-col control vs two-col variant B', 'Layer 2 (SDK): outlined vs filled button via ?utm_style'],
    color: '#0F2235', bg: '#F5EDE0',
  },
]
export default { setup: () => ({ demos }) }
</script>

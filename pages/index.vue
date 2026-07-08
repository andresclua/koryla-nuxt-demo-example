<template>
  <main class="page">
    <header class="header">
      <span class="badge">LIVE DEMO · NUXT + NITRO MIDDLEWARE</span>
      <h1>Four ways to A/B test<br/>with Nuxt</h1>
      <p class="subtitle">
        Each experiment runs server-side via <code>Nitro middleware</code>.
        The server assigns variants before any HTML is sent. Zero flicker, zero JS overhead.
      </p>
      <div class="status">
        <span class="status__dot"></span>
        Middleware active on /hero · /demo-edge · /demo-combined
      </div>
    </header>

    <div class="demo-list">
      <a v-for="demo in demos" :key="demo.href" :href="demo.href" class="demo-card">
        <div class="demo-card__num" :style="`background:${demo.bg};color:${demo.color}`">{{ demo.number }}</div>
        <div class="demo-card__body">
          <span class="demo-card__type" :style="`background:${demo.bg};color:${demo.color}`">{{ demo.type.toUpperCase() }}</span>
          <h2 class="demo-card__title">{{ demo.title }}</h2>
          <p class="demo-card__desc">{{ demo.description }}</p>
          <ul class="demo-card__variants">
            <li v-for="(w, i) in demo.what" :key="i">
              <span class="dot" :style="i > 0 ? `background:${demo.color}` : undefined"></span>
              {{ w }}
            </li>
          </ul>
        </div>
        <span class="demo-card__arrow">→</span>
      </a>
    </div>

    <p class="footnote">
      Clear your cookies to be re-assigned. Edge experiments use a <code>ky_</code> cookie. SDK experiments use URL params.
    </p>
  </main>
</template>

<script setup lang="ts">
const demos = [
  {
    href: '/hero', number: '01', type: 'Edge · Layout',
    title: 'Hero Layout Test',
    description: 'Two completely different page layouts behind the same URL. The edge assigns the variant transparently — browser sees no change.',
    what: ['Control: Single-column — "Ship faster with data"', 'Variant B: Two-column with feature cards — "Build what users actually want"'],
    color: '#C96A3F', bg: '#FEF0E8',
  },
  {
    href: '/demo-edge', number: '02', type: 'Edge · URL rewrite',
    title: 'Edge Rewrite Explainer',
    description: 'Visual walkthrough of how the edge intercepts a request and rewrites the URL server-side — the browser never sees the internal path.',
    what: ['Control: Light page — steps shown on white background', 'Variant B: Dark page — same steps, navy background'],
    color: '#0F2235', bg: '#f0f4f8',
  },
  {
    href: '/demo-sdk', number: '03', type: 'SDK · UTM',
    title: 'SDK Content Test',
    description: 'No edge rewrite — the server reads ?utm_koryla and renders a different content block. Same URL, zero cookies.',
    what: ['Control: "The fastest way to A/B test." + outlined button', 'Variation-1: "Stop guessing. Start winning." + filled button — add ?utm_koryla=variation-1'],
    color: '#C96A3F', bg: '#FEF0E8',
  },
  {
    href: '/demo-combined', number: '04', type: 'Edge + SDK',
    title: 'Combined Layers',
    description: 'Two independent layers: edge controls the page layout, SDK controls the content block. Four possible combinations from one URL.',
    what: ['Layer 1 (Edge): single-col control vs two-col variant B', 'Layer 2 (SDK): control copy vs variation-1 — add ?utm_koryla=variation-1'],
    color: '#0F2235', bg: '#F5EDE0',
  },
]
</script>

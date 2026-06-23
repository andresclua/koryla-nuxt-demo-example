<template>
  <main :style="s.page">
    <div :style="s.badge">EDGE EXPERIMENT · TRANSPARENT URL REWRITE</div>
    <h1 :style="s.h1">You're on the control.</h1>
    <p :style="s.subtitle">
      You landed on <code :style="s.code">/demo-edge</code>.
      The Nitro middleware checked your cookie and kept you on this page (50% probability).
      The URL in your browser never changed.
    </p>
    <div :style="s.traceBox">
      <p :style="s.traceTitle">What happened server-side</p>
      <div v-for="(step, i) in steps" :key="i" :style="s.step">
        <span :style="s.num">{{ i + 1 }}</span>
        <p :style="s.stepText">{{ step }}</p>
      </div>
    </div>
    <a href="/thank-you" :style="s.btn">Trigger a conversion →</a>
    <p :style="s.footnote">Clear your cookies and reload to try getting variant B.</p>
  </main>
</template>

<script lang="ts">
const steps = [
  'Request arrived at the Nitro server middleware',
  'Middleware checked your ky_ cookie — no assignment found',
  'Random 50/50 split → you got control',
  'Cookie set: ky_<experiment-id>=<variant-id>',
  'path unchanged — this page was served as-is',
]

const s = {
  page:      { maxWidth: '720px', margin: '0 auto', padding: '80px 40px' },
  badge:     { display: 'inline-block', background: '#F5EDE0', color: '#C96A3F', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px', marginBottom: '24px', letterSpacing: '.5px' },
  h1:        { fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#0F2235', marginBottom: '16px', lineHeight: 1.1 },
  subtitle:  { fontSize: '17px', color: '#6b7280', lineHeight: 1.65, marginBottom: '40px' },
  code:      { background: '#F5EDE0', padding: '2px 6px', borderRadius: '4px', fontSize: '14px' },
  traceBox:  { background: '#F5EDE0', border: '1px solid #EAD9C4', borderRadius: '20px', padding: '28px', marginBottom: '32px' },
  traceTitle:{ fontSize: '11px', fontWeight: 700, color: '#C96A3F', textTransform: 'uppercase' as const, letterSpacing: '.5px', marginBottom: '16px' },
  step:      { display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' },
  num:       { width: '22px', height: '22px', borderRadius: '50%', background: '#FEF0E8', color: '#C96A3F', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' },
  stepText:  { fontSize: '14px', color: '#4b5563', lineHeight: 1.5, margin: 0 },
  btn:       { display: 'inline-block', background: '#C96A3F', color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 600, fontSize: '14px', textDecoration: 'none' },
  footnote:  { marginTop: '16px', fontSize: '12px', color: '#9ca3af' },
}
export default { setup: () => ({ steps, s }) }
</script>

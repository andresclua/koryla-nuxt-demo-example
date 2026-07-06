<template>
  <main :style="s.page">
    <div :style="s.variantBadge">control — /pricing</div>
    <h1 :style="s.h1">Simple, transparent pricing</h1>
    <p :style="s.subtitle">Start free. Scale when you're ready.</p>
    <div :style="s.grid">
      <div v-for="plan in plans" :key="plan.name" :style="{ ...s.card, background: plan.popular ? '#0F2235' : '#fff' }">
        <span v-if="plan.popular" :style="s.popularBadge">Most popular</span>
        <p :style="{ ...s.planName, color: plan.popular ? '#fff' : '#0F2235' }">{{ plan.name }}</p>
        <div :style="s.priceRow">
          <span :style="{ ...s.price, color: plan.popular ? '#fff' : '#0F2235' }">{{ plan.price }}</span>
          <span :style="{ ...s.period, color: plan.popular ? '#9ca3af' : '#6b7280' }">{{ plan.period }}</span>
        </div>
        <ul :style="s.featureList">
          <li v-for="f in plan.features" :key="f" :style="{ ...s.featureItem, color: plan.popular ? '#d1d5db' : '#4b5563' }">
            <span :style="s.check">✓</span>{{ f }}
          </li>
        </ul>
        <a href="/thank-you" :style="{ ...s.cta, background: plan.popular ? '#C96A3F' : '#FEF0E8', color: plan.popular ? '#fff' : '#C96A3F' }">
          {{ plan.cta }}
        </a>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
const plans = [
  { name: 'Free', price: '$0', period: '/ forever', cta: 'Get started', popular: false, features: ['1 workspace', '3 experiments', 'Edge + SDK testing'] },
  { name: 'Starter', price: '$29', period: '/ per month', cta: 'Get started', popular: true, features: ['3 workspaces', 'Unlimited experiments', 'All analytics integrations', 'Email support'] },
  { name: 'Growth', price: '$79', period: '/ per month', cta: 'Get started', popular: false, features: ['Unlimited workspaces', 'Unlimited experiments', 'Priority support', 'Custom webhooks'] },
]
const s = {
  page:         { maxWidth: '960px', margin: '0 auto', padding: '80px 40px', textAlign: 'center' as const },
  variantBadge: { display: 'inline-block', marginBottom: '16px', background: '#e5e7eb', color: '#6b7280', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', letterSpacing: '.5px' },
  h1:           { fontSize: '48px', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '12px', color: '#0F2235' },
  subtitle:     { color: '#6b7280', fontSize: '17px', marginBottom: '56px' },
  grid:         { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  card:         { border: '1px solid #e5e7eb', borderRadius: '20px', padding: '32px', textAlign: 'left' as const, position: 'relative' as const },
  popularBadge: { position: 'absolute' as const, top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#C96A3F', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '5px 16px', borderRadius: '999px', whiteSpace: 'nowrap' as const },
  planName:     { fontSize: '18px', fontWeight: 700, marginBottom: '8px' },
  priceRow:     { display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '24px' },
  price:        { fontSize: '42px', fontWeight: 800 },
  period:       { fontSize: '15px' },
  featureList:  { listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column' as const, gap: '12px' },
  featureItem:  { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' },
  check:        { color: '#C96A3F', fontWeight: 700 },
  cta:          { display: 'block', textAlign: 'center' as const, borderRadius: '12px', padding: '12px 20px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' },
}
export default { setup: () => ({ plans, s }) }
</script>

<template>
  <!-- Variant B: 2-tier + billing toggle -->
  <main v-if="isVariantB" :style="sb.page">
    <div :style="sb.variantBadge">b — /pricing</div>
    <h1 :style="sb.h1">Try free for <span :style="sb.accent">14 days</span></h1>
    <p :style="sb.subtitle">No credit card needed. Cancel anytime.</p>
    <div :style="sb.toggle">
      <button :style="{ ...sb.toggleBtn, color: !annual ? '#0F2235' : '#9ca3af' }" @click="annual = false">Monthly</button>
      <button :style="{ ...sb.toggleBtn, color: annual ? '#0F2235' : '#9ca3af' }" @click="annual = true">Annual</button>
      <span :style="sb.saveBadge">Save 20%</span>
    </div>
    <div :style="sb.grid">
      <div v-for="tier in tiersB" :key="tier.name" :style="{ ...sb.card, border: tier.highlighted ? '2px solid #C96A3F' : '1px solid #e5e7eb', background: tier.highlighted ? '#FEF0E8' : '#fff' }">
        <span v-if="tier.badge" :style="sb.tierBadge">{{ tier.badge }}</span>
        <div :style="{ ...sb.iconBox, background: tier.highlighted ? '#C96A3F' : '#F5EDE0' }">{{ tier.icon }}</div>
        <p :style="sb.tierName">{{ tier.name }}</p>
        <p :style="{ ...sb.tierDesc, color: tier.highlighted ? '#A8522D' : '#9ca3af' }">{{ tier.desc }}</p>
        <p :style="sb.tierPrice">{{ annual ? tier.annual : tier.monthly }}</p>
        <p :style="{ ...sb.tierPeriod, color: tier.highlighted ? '#A8522D' : '#9ca3af' }">/month · billed {{ annual ? 'annually' : 'monthly' }}</p>
        <a href="/thank-you" :style="{ ...sb.cta, background: tier.highlighted ? '#C96A3F' : '#F5EDE0', color: tier.highlighted ? '#fff' : '#0F2235', fontWeight: tier.highlighted ? 700 : 600 }">{{ tier.cta }}</a>
        <ul :style="sb.featureList">
          <li v-for="f in tier.features" :key="f" :style="{ ...sb.featureItem, color: tier.highlighted ? '#0F2235' : '#4b5563' }"><span>✓</span> {{ f }}</li>
        </ul>
      </div>
    </div>
  </main>

  <!-- Control: 3-tier grid -->
  <main v-else :style="sa.page">
    <div :style="sa.variantBadge">control — /pricing</div>
    <h1 :style="sa.h1">Simple, transparent pricing</h1>
    <p :style="sa.subtitle">Start free. Scale when you're ready.</p>
    <div :style="sa.grid">
      <div v-for="plan in plansA" :key="plan.name" :style="{ ...sa.card, background: plan.popular ? '#0F2235' : '#fff' }">
        <span v-if="plan.popular" :style="sa.popularBadge">Most popular</span>
        <p :style="{ ...sa.planName, color: plan.popular ? '#fff' : '#0F2235' }">{{ plan.name }}</p>
        <div :style="sa.priceRow">
          <span :style="{ ...sa.price, color: plan.popular ? '#fff' : '#0F2235' }">{{ plan.price }}</span>
          <span :style="{ ...sa.period, color: plan.popular ? '#9ca3af' : '#6b7280' }">{{ plan.period }}</span>
        </div>
        <ul :style="sa.featureList">
          <li v-for="f in plan.features" :key="f" :style="{ ...sa.featureItem, color: plan.popular ? '#d1d5db' : '#4b5563' }">
            <span :style="sa.check">✓</span>{{ f }}
          </li>
        </ul>
        <a href="/thank-you" :style="{ ...sa.cta, background: plan.popular ? '#C96A3F' : '#FEF0E8', color: plan.popular ? '#fff' : '#C96A3F' }">
          {{ plan.cta }}
        </a>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const variantPath = useState('korylaPricingVariant', () =>
  useRequestEvent()?.context?.korylaVariantPath ?? null
)
const isVariantB = computed(() => variantPath.value === '/pricing-b')

const annual = ref(false)

const plansA = [
  { name: 'Free', price: '$0', period: '/ forever', cta: 'Get started', popular: false, features: ['1 workspace', '3 experiments', 'Edge + SDK testing'] },
  { name: 'Starter', price: '$29', period: '/ per month', cta: 'Get started', popular: true, features: ['3 workspaces', 'Unlimited experiments', 'All analytics integrations', 'Email support'] },
  { name: 'Growth', price: '$79', period: '/ per month', cta: 'Get started', popular: false, features: ['Unlimited workspaces', 'Unlimited experiments', 'Priority support', 'Custom webhooks'] },
]

const tiersB = [
  { name: 'Starter', icon: '📊', desc: 'Most popular', monthly: '$29', annual: '$23', cta: 'Get started', highlighted: false, features: ['3 workspaces', 'Unlimited experiments', 'All analytics integrations', 'Email support'] },
  { name: 'Growth',  icon: '🚀', desc: 'For scaling teams', monthly: '$79', annual: '$63', cta: 'Get started', highlighted: true, badge: 'BEST VALUE', features: ['Unlimited workspaces', 'Unlimited experiments', 'Priority support', 'Custom webhooks'] },
]

const sa = {
  page:        { maxWidth: '960px', margin: '0 auto', padding: '80px 40px', textAlign: 'center' as const },
  variantBadge:{ display: 'inline-block', marginBottom: '16px', background: '#e5e7eb', color: '#6b7280', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', letterSpacing: '.5px' },
  h1:          { fontSize: '48px', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '12px', color: '#0F2235' },
  subtitle:    { color: '#6b7280', fontSize: '17px', marginBottom: '56px' },
  grid:        { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  card:        { border: '1px solid #e5e7eb', borderRadius: '20px', padding: '32px', textAlign: 'left' as const, position: 'relative' as const },
  popularBadge:{ position: 'absolute' as const, top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#C96A3F', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '5px 16px', borderRadius: '999px', whiteSpace: 'nowrap' as const },
  planName:    { fontSize: '18px', fontWeight: 700, marginBottom: '8px' },
  priceRow:    { display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '24px' },
  price:       { fontSize: '42px', fontWeight: 800 },
  period:      { fontSize: '15px' },
  featureList: { listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column' as const, gap: '12px' },
  featureItem: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' },
  check:       { color: '#C96A3F', fontWeight: 700 },
  cta:         { display: 'block', textAlign: 'center' as const, borderRadius: '12px', padding: '12px 20px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' },
}

const sb = {
  page:        { maxWidth: '900px', margin: '0 auto', padding: '80px 40px', textAlign: 'center' as const },
  variantBadge:{ display: 'inline-block', marginBottom: '16px', background: '#e5e7eb', color: '#6b7280', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', letterSpacing: '.5px' },
  h1:          { fontSize: '48px', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '12px', color: '#0F2235' },
  accent:      { color: '#C96A3F' },
  subtitle:    { color: '#6b7280', fontSize: '17px', marginBottom: '16px' },
  toggle:      { display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#f3f4f6', borderRadius: '999px', padding: '6px 16px', marginBottom: '48px' },
  toggleBtn:   { background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '14px' },
  saveBadge:   { background: '#C96A3F', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '999px' },
  grid:        { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '680px', margin: '0 auto' },
  card:        { borderRadius: '24px', padding: '32px', textAlign: 'left' as const, position: 'relative' as const },
  tierBadge:   { position: 'absolute' as const, top: '-13px', right: '20px', background: '#C96A3F', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 14px', borderRadius: '999px' },
  iconBox:     { width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '18px' },
  tierName:    { fontSize: '15px', fontWeight: 700, color: '#0F2235', marginBottom: '4px' },
  tierDesc:    { fontSize: '13px', marginBottom: '16px' },
  tierPrice:   { fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '4px', color: '#0F2235' },
  tierPeriod:  { fontSize: '13px', marginBottom: '24px' },
  cta:         { display: 'block', textAlign: 'center' as const, borderRadius: '12px', padding: '12px', fontSize: '14px', marginBottom: '24px', textDecoration: 'none' },
  featureList: { listStyle: 'none', fontSize: '14px', display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  featureItem: { display: 'flex', gap: '8px' },
}
</script>

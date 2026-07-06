<template>
  <main :style="s.page">
    <div :style="s.variantBadge">b — /pricing</div>
    <h1 :style="s.h1">Try free for <span :style="s.accent">14 days</span></h1>
    <p :style="s.subtitle">No credit card needed. Cancel anytime.</p>
    <div :style="s.toggle">
      <button :style="{ ...s.toggleBtn, color: !annual ? '#0F2235' : '#9ca3af' }" @click="annual = false">Monthly</button>
      <button :style="{ ...s.toggleBtn, color: annual ? '#0F2235' : '#9ca3af' }" @click="annual = true">Annual</button>
      <span :style="s.saveBadge">Save 20%</span>
    </div>
    <div :style="s.grid">
      <div v-for="tier in tiers" :key="tier.name" :style="{ ...s.card, border: tier.highlighted ? '2px solid #C96A3F' : '1px solid #e5e7eb', background: tier.highlighted ? '#FEF0E8' : '#fff' }">
        <span v-if="tier.badge" :style="s.tierBadge">{{ tier.badge }}</span>
        <div :style="{ ...s.iconBox, background: tier.highlighted ? '#C96A3F' : '#F5EDE0' }">{{ tier.icon }}</div>
        <p :style="s.tierName">{{ tier.name }}</p>
        <p :style="{ ...s.tierDesc, color: tier.highlighted ? '#A8522D' : '#9ca3af' }">{{ tier.desc }}</p>
        <p :style="s.tierPrice">{{ annual ? tier.annual : tier.monthly }}</p>
        <p :style="{ ...s.tierPeriod, color: tier.highlighted ? '#A8522D' : '#9ca3af' }">/month · billed {{ annual ? 'annually' : 'monthly' }}</p>
        <a href="/thank-you" :style="{ ...s.cta, background: tier.highlighted ? '#C96A3F' : '#F5EDE0', color: tier.highlighted ? '#fff' : '#0F2235', fontWeight: tier.highlighted ? 700 : 600 }">{{ tier.cta }}</a>
        <ul :style="s.featureList">
          <li v-for="f in tier.features" :key="f" :style="{ ...s.featureItem, color: tier.highlighted ? '#0F2235' : '#4b5563' }"><span>✓</span> {{ f }}</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const annual = ref(false)
const tiers = [
  { name: 'Starter', icon: '📊', desc: 'Most popular', monthly: '$29', annual: '$23', cta: 'Get started', highlighted: false, features: ['3 workspaces', 'Unlimited experiments', 'All analytics integrations', 'Email support'] },
  { name: 'Growth',  icon: '🚀', desc: 'For scaling teams', monthly: '$79', annual: '$63', cta: 'Get started', highlighted: true, badge: 'BEST VALUE', features: ['Unlimited workspaces', 'Unlimited experiments', 'Priority support', 'Custom webhooks'] },
]
const s = {
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

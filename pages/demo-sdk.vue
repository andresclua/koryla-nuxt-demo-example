<script setup lang="ts">
import { getVariant } from '../lib/getVariant'

const config   = useRuntimeConfig()
const headers  = useRequestHeaders(['cookie'])
const url      = useRequestURL()
const searchParams = new URLSearchParams(url.search)

const expId = process.env.NUXT_KORYLA_SDK_EXPERIMENT_ID ?? ''
const result = expId
  ? await getVariant(headers.cookie ?? null, expId, {
      apiKey: config.korylaApiKey,
      apiUrl: config.korylaApiUrl,
      searchParams,
    })
  : null

const isVariantB = result && !result.variant.is_control
</script>

<template>
  <main :style="{ maxWidth: '720px', margin: '0 auto', padding: '80px 40px' }">
    <div :style="{ display: 'inline-block', background: '#FEF0E8', color: '#C96A3F', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px', marginBottom: '24px', letterSpacing: '.5px' }">
      SDK EXPERIMENT · UTM PARAM
    </div>

    <h1 :style="{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#0F2235', marginBottom: '16px', lineHeight: 1.1 }">
      No edge rewrite — just <code :style="{ background: '#F5EDE0', padding: '2px 6px', borderRadius: '4px', fontSize: '80%' }">getVariant()</code> in the page.
    </h1>
    <p :style="{ fontSize: '17px', color: '#6b7280', lineHeight: 1.65, marginBottom: '40px' }">
      Add <code :style="{ background: '#F5EDE0', padding: '2px 6px', borderRadius: '4px', fontSize: '14px' }">?utm_text=variation-1</code> to the URL to force variant B.
      Reload without the param to go back to control.
    </p>

    <div :style="{ marginBottom: '32px' }">
      <p :style="{ fontSize: '13px', fontWeight: 600, color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '.5px' }">
        Current variant: <span :style="{ color: '#0F2235' }">{{ isVariantB ? 'B — filled button' : 'Control — outlined button' }}</span>
      </p>

      <!-- Control: outlined button -->
      <a v-if="!isVariantB" href="/thank-you" :style="{ display: 'inline-block', border: '2px solid #0F2235', color: '#0F2235', padding: '12px 28px', borderRadius: '10px', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }">
        Get started →
      </a>
      <!-- Variant B: filled button -->
      <a v-else href="/thank-you" :style="{ display: 'inline-block', background: '#C96A3F', color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }">
        Get started →
      </a>
    </div>

    <p :style="{ fontSize: '12px', color: '#9ca3af' }">
      This page calls <code>getVariant()</code> in <code>&lt;script setup&gt;</code> — server-side, before the HTML is rendered.
      No Nitro middleware involved.
    </p>
  </main>
</template>

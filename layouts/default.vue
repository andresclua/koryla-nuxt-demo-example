<script setup lang="ts">
const props = defineProps<{ title?: string; variant?: string }>()
</script>

<template>
  <div>
    <div v-if="props.variant" :style="{
      position: 'fixed', top: '12px', right: '12px', zIndex: 999,
      background: '#0F2235', color: '#fff', fontSize: '11px', fontWeight: 700,
      padding: '4px 10px', borderRadius: '999px', letterSpacing: '.3px',
    }">{{ props.variant }}</div>
    <slot />
  </div>
</template>

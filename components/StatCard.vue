<script setup lang="ts">
defineProps<{ label: string; value: string | number; helper?: string; icon: string; tone?: string }>()
</script>
<template>
  <div class="stat-card">
    <div class="stat-top"><span class="stat-icon" :class="tone || ''">{{ icon }}</span><span class="stat-helper">{{ helper }}</span></div>
    <div class="stat-value">{{ value }}</div>
    <div class="stat-label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Report } from '~/types/lapormas'
defineProps<{ report: Report; compact?: boolean }>()
const shortDate = (value: string) => new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
</script>
<template>
  <NuxtLink :to="`/app/laporan/${report.id}`" class="report-card" :class="{ compact }">
    <div class="report-card-main">
      <div class="report-kicker"><span>{{ report.category }}</span><span class="dot-separator">·</span><span>{{ report.ticket }}</span></div>
      <h3>{{ report.title }}</h3>
      <p>{{ report.description }}</p>
      <div class="report-meta"><span>⌖ {{ report.location }}</span><span>◷ {{ shortDate(report.createdAt) }}</span></div>
    </div>
    <div class="report-card-side"><StatusBadge :status="report.status" /><span class="priority" :class="`priority-${report.priority.toLowerCase()}`">{{ report.priority }}</span><span class="report-arrow">↗</span></div>
  </NuxtLink>
</template>

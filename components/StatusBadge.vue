<script setup lang="ts">
import type { ReportStatus } from '~/types/lapormas'
const props = defineProps<{ status: ReportStatus }>()
const statusClass = computed(() => ({
  'Menunggu verifikasi': 'status-pending',
  'Terverifikasi': 'status-verified',
  'Ditangani': 'status-progress',
  'Selesai': 'status-done',
  'Ditolak': 'status-rejected'
}[props.status]))
</script>
<template><span class="status-badge" :class="statusClass"><i></i>{{ status }}</span></template>

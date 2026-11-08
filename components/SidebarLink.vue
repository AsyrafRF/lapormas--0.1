<script setup lang="ts">
const props = defineProps<{ to: string; icon: string; label: string; badge?: number }>()
const route = useRoute()
const active = computed(() => route.path === props.to || (props.to !== '/app' && props.to !== '/admin' && props.to !== '/petugas' && props.to !== '/rt' && route.path.startsWith(`${props.to}/`)))
</script>
<template><NuxtLink :to="to" class="side-link" :class="{ active }"><span class="side-icon">{{ icon }}</span><span>{{ label }}</span><b v-if="badge">{{ badge }}</b></NuxtLink></template>

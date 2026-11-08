<script setup lang="ts">
definePageMeta({ layout: 'app', middleware: 'auth', title: 'Daftar Laporan' })
const { state, currentUser } = useLaporMas()
const search = ref('')
const statusFilter = ref('Semua status')
const visibleReports = computed(() => {
  const user = currentUser.value!
  return state.value.reports.filter(report => {
    if (user.role === 'masyarakat' && report.ownerId !== user.id) return false
    if ((user.role === 'rt' || user.role === 'petugas') && ['Menunggu verifikasi', 'Ditolak'].includes(report.status)) return false
    const q = search.value.toLowerCase()
    const matchesText = !q || [report.title, report.ticket, report.location, report.category].some(value => value.toLowerCase().includes(q))
    const matchesStatus = statusFilter.value === 'Semua status' || report.status === statusFilter.value
    return matchesText && matchesStatus
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
})
const statuses = ['Semua status', 'Menunggu verifikasi', 'Terverifikasi', 'Ditangani', 'Selesai', 'Ditolak']
const isCitizen = computed(() => currentUser.value?.role === 'masyarakat')
</script>
<template>
  <div class="page-stack">
    <div class="page-title-row"><div><div class="eyebrow">MONITORING ADUAN</div><h1>{{ isCitizen ? 'Laporan saya' : currentUser?.role === 'rt' ? 'Laporan terverifikasi' : 'Semua laporan' }}</h1><p>{{ isCitizen ? 'Kelola dan pantau semua laporan yang pernah Anda kirim.' : 'Cari dan telusuri laporan masyarakat di lingkungan komplek.' }}</p></div><NuxtLink v-if="isCitizen" to="/app/laporan/buat" class="btn btn-primary">＋ Buat laporan</NuxtLink></div>
    <section class="panel filter-panel"><div class="search-control"><span>⌕</span><input v-model="search" placeholder="Cari judul, nomor tiket, lokasi..." /></div><select v-model="statusFilter" class="select-control"><option v-for="status in statuses" :key="status">{{ status }}</option></select><span class="result-count">{{ visibleReports.length }} laporan</span></section>
    <div v-if="visibleReports.length" class="report-list report-list-page"><ReportCard v-for="report in visibleReports" :key="report.id" :report="report" /></div><EmptyState v-else title="Laporan tidak ditemukan" description="Coba ubah kata kunci atau filter status yang dipilih." icon="⌕"><button class="btn btn-outline btn-small" @click="search = ''; statusFilter = 'Semua status'">Reset filter</button></EmptyState>
  </div>
</template>

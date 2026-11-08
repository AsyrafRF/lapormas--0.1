<script setup lang="ts">
import type { Report } from '~/types/lapormas'
definePageMeta({ layout: 'app', middleware: 'auth', title: 'Beranda' })
const { state, currentUser } = useLaporMas()
const user = computed(() => currentUser.value!)
if (import.meta.client && user.value?.role !== 'masyarakat') await navigateTo(user.value?.role === 'admin' ? '/admin' : user.value?.role === 'petugas' ? '/petugas' : '/rt')
const mine = computed<Report[]>(() => state.value.reports.filter((r: Report) => r.ownerId === user.value?.id))
const publicReports = computed<Report[]>(() => state.value.reports.filter((r: Report) => ['Terverifikasi', 'Ditangani', 'Selesai'].includes(r.status)).slice(0, 3))
const pending = computed(() => mine.value.filter((r: Report) => r.status === 'Menunggu verifikasi').length)
const inProgress = computed(() => mine.value.filter((r: Report) => r.status === 'Ditangani' || r.status === 'Terverifikasi').length)
const completed = computed(() => mine.value.filter((r: Report) => r.status === 'Selesai').length)
const greeting = computed(() => { const h = new Date().getHours(); return h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 18 ? 'Selamat sore' : 'Selamat malam' })
</script>
<template>
  <div class="page-stack">
    <section class="welcome-banner"><div><div class="eyebrow eyebrow-light">WARGA KOMPLEK HARMONI</div><h1>{{ greeting }}, {{ user.name.split(' ')[0] }} <span>✦</span></h1><p>Ada yang perlu disampaikan atau dipantau hari ini?</p><NuxtLink to="/app/laporan/buat" class="btn btn-white">＋ Buat laporan baru</NuxtLink></div><div class="welcome-art"><div class="art-circle circle-one"></div><div class="art-circle circle-two"></div><div class="art-house">⌂</div><div class="art-leaf">✳</div><div class="art-caption">Komplek Harmoni<br><small>Peduli · Aman · Nyaman</small></div></div></section>
    <div class="section-heading"><div><div class="eyebrow">AKTIVITAS ANDA</div><h2>Ringkasan laporan</h2></div><NuxtLink to="/app/laporan" class="text-link">Lihat semua <span>→</span></NuxtLink></div>
    <div class="stats-grid"><StatCard label="Total laporan saya" :value="mine.length" helper="Semua waktu" icon="▤" /><StatCard label="Menunggu verifikasi" :value="pending" helper="Dalam pemeriksaan" icon="◷" tone="amber"/><StatCard label="Sedang ditangani" :value="inProgress" helper="Dalam tindak lanjut" icon="⌁" tone="blue"/><StatCard label="Selesai ditangani" :value="completed" helper="Sudah diperbarui" icon="✓" tone="green"/></div>
    <div class="content-two-col"><section class="panel"><div class="panel-heading"><div><h3>Laporan terbaru saya</h3><p>Pantau perkembangan aduan yang Anda kirim.</p></div><NuxtLink to="/app/laporan" class="subtle-link">Semua laporan ↗</NuxtLink></div><div v-if="mine.length" class="report-list"><ReportCard v-for="report in mine.slice(0, 3)" :key="report.id" :report="report" compact /></div><EmptyState v-else title="Belum ada laporan" description="Mulai dengan mengirim laporan pertama Anda." icon="✎"><NuxtLink to="/app/laporan/buat" class="btn btn-primary btn-small">Buat laporan</NuxtLink></EmptyState></section><section class="panel community-panel"><div class="panel-heading"><div><h3>Pantauan lingkungan</h3><p>Informasi yang telah diverifikasi admin.</p></div><span class="live-label"><i></i> TERBARU</span></div><div v-for="report in publicReports" :key="report.id" class="community-row"><span class="community-bullet" :class="report.status === 'Selesai' ? 'bullet-green' : 'bullet-orange'"></span><div><NuxtLink :to="`/app/laporan/${report.id}`"><b>{{ report.title }}</b></NuxtLink><small>{{ report.category }} · {{ new Date(report.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }}</small></div><StatusBadge :status="report.status"/></div><EmptyState v-if="!publicReports.length" title="Belum ada aktivitas" description="Laporan terverifikasi akan muncul di sini." /></section></div>
    <section class="safety-banner"><span class="safety-icon">✳</span><div><b>Keadaan darurat membutuhkan respons langsung.</b><p>Untuk ancaman keselamatan yang sedang berlangsung, segera hubungi petugas keamanan atau layanan darurat setempat. Portal ini bukan kanal tanggap darurat real-time.</p></div></section>
  </div>
</template>

<script setup lang="ts">
import type { Report, Recap } from '~/types/lapormas'
import { downloadCsv as saveCsv } from '~/utils/download'
definePageMeta({ layout: 'app', middleware: 'auth', title: 'Ringkasan Ketua RT' })
const { state } = useLaporMas()
const publicReports = computed<Report[]>(() => state.value.reports.filter((r: Report) => ['Terverifikasi', 'Ditangani', 'Selesai'].includes(r.status)))
const completed = computed(() => publicReports.value.filter((r: Report) => r.status === 'Selesai').length)
const active = computed(() => publicReports.value.filter((r: Report) => r.status === 'Terverifikasi' || r.status === 'Ditangani').length)
const recaps = computed<Recap[]>(() => [...state.value.recaps].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)))
function exportReportsCsv(period?: string) {
  const selected = period ? publicReports.value.filter((r: Report) => r.createdAt.slice(0, 7) === period) : publicReports.value
  const rows: (string | number)[][] = [
    ['Nomor tiket', 'Judul', 'Kategori', 'Lokasi', 'Tanggal', 'Status'],
    ...selected.map((r: Report) => [r.ticket, r.title, r.category, r.location, new Date(r.createdAt).toLocaleDateString('id-ID'), r.status])
  ]
  saveCsv(rows, period ? `lapormas-rekap-${period}.csv` : 'lapormas-rekap-laporan-warga.csv')
}
</script>
<template><div class="page-stack"><div class="page-title-row"><div><div class="eyebrow">MONITORING PENGURUS LINGKUNGAN · F009</div><h1>Ringkasan Ketua RT</h1><p>Pantau perkembangan aduan warga dan unduh rekapitulasi untuk dokumentasi.</p></div><button class="btn btn-primary" @click="exportReportsCsv()">↓ Unduh data laporan</button></div><div class="stats-grid stats-three"><StatCard label="Laporan terpublikasi" :value="publicReports.length" helper="Sudah diverifikasi" icon="▤" tone="blue"/><StatCard label="Aktif / ditangani" :value="active" helper="Perlu pemantauan" icon="⌁" tone="amber"/><StatCard label="Selesai" :value="completed" helper="Ada hasil penanganan" icon="✓" tone="green"/></div><section class="panel"><div class="panel-heading"><div><div class="eyebrow">ARSIP BULANAN</div><h3>Rekapitulasi dari admin</h3><p>Unduh dan simpan ringkasan yang telah diterbitkan.</p></div><span class="count-pill">{{ recaps.length }} arsip</span></div><div v-if="recaps.length" class="recap-list"><div v-for="recap in recaps" :key="recap.id" class="recap-item"><span class="recap-file-icon">▦</span><div class="recap-item-copy"><b>{{ recap.title }}</b><small>Periode {{ recap.period }} · Terbit {{ new Date(recap.publishedAt).toLocaleDateString('id-ID') }}</small><p>{{ recap.summary }}</p><div class="recap-mini-stats"><span>{{ recap.totalReports }} laporan</span><span>{{ recap.completedReports }} selesai</span><span>Oleh {{ recap.publishedBy }}</span></div></div><button class="btn btn-outline btn-small" @click="exportReportsCsv(recap.period)">Unduh data ↓</button></div></div><EmptyState v-else title="Belum ada rekapitulasi" description="Rekap yang diterbitkan admin akan tampil di bagian ini." icon="▦"/></section><section class="panel"><div class="panel-heading"><div><div class="eyebrow">LAPORAN TERKONFIRMASI</div><h3>Perkembangan laporan warga</h3><p>Laporan yang sudah diverifikasi admin.</p></div><NuxtLink to="/app/laporan" class="subtle-link">Semua laporan ↗</NuxtLink></div><div class="report-list"><ReportCard v-for="report in publicReports.slice(0,5)" :key="report.id" :report="report" compact/><EmptyState v-if="!publicReports.length" title="Belum ada laporan terverifikasi" description="Laporan akan ditampilkan setelah admin memeriksa validitasnya."/></div></section></div></template>

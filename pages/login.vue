<script setup lang="ts">
import type { Role } from '~/types/lapormas'
const { login, loginAs } = useLaporMas()
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const busy = ref(false)
const demos: { username: string; password: string; role: Role; label: string; desc: string; initials: string }[] = [
  { username: 'warga', password: 'warga123', role: 'masyarakat', label: 'Masyarakat', desc: 'Buat & pantau laporan', initials: 'W' },
  { username: 'petugas', password: 'petugas123', role: 'petugas', label: 'Petugas keamanan', desc: 'Kelola tindak lanjut', initials: 'P' },
  { username: 'admin', password: 'admin123', role: 'admin', label: 'Admin', desc: 'Validasi & kelola portal', initials: 'A' },
  { username: 'ketua.rt', password: 'rt123', role: 'rt', label: 'Ketua RT', desc: 'Lihat rekap lingkungan', initials: 'RT' }
]
function toHome(role: Role) { return navigateTo(role === 'admin' ? '/admin' : role === 'petugas' ? '/petugas' : role === 'rt' ? '/rt' : '/app') }
function submit() {
  busy.value = true
  const result = login(username.value, password.value)
  busy.value = false
  if (!result.ok) { errorMessage.value = result.message; return }
  const role = demos.find(item => item.username === username.value)?.role || useLaporMas().currentUser.value?.role || 'masyarakat'
  toHome(role)
}
function quickLogin(demo: typeof demos[number]) { if (loginAs(demo.username)) toHome(demo.role) }
</script>
<template>
  <div class="auth-page"><div class="auth-left"><div class="auth-left-bg"></div><div class="auth-left-content"><BrandLogo /><div class="auth-message"><div class="eyebrow eyebrow-light"><span class="eyebrow-dot"></span> PORTAL ADUAN WARGA</div><h1>Suara warga,<br><em>aksi bersama.</em></h1><p>Ruang kolaborasi untuk menjaga keamanan, ketertiban, dan kenyamanan lingkungan tempat kita tinggal.</p><div class="auth-quote"><span>“</span><div><b>Lingkungan yang baik dibangun dari kepedulian setiap orang.</b><small>Komplek Harmoni · RW 03</small></div></div></div></div><div class="auth-left-footer"><span>© 2026 LaporMas! 0.1</span><span>Pelayanan masyarakat digital</span></div></div><div class="auth-right"><div class="auth-form-wrap"><NuxtLink to="/" class="back-link">← Kembali ke beranda</NuxtLink><div class="auth-heading"><div class="eyebrow">SELAMAT DATANG KEMBALI</div><h2>Masuk ke akun Anda</h2><p>Gunakan akun lingkungan yang telah didaftarkan oleh admin.</p></div><form class="form-stack" @submit.prevent="submit"><label class="field-label">Username<div class="input-wrap"><span>♙</span><input v-model="username" autocomplete="username" placeholder="Masukkan username" required /></div></label><label class="field-label">Password<div class="input-wrap"><span>⌑</span><input v-model="password" type="password" autocomplete="current-password" placeholder="Masukkan password" required /></div></label><p v-if="errorMessage" class="form-error">{{ errorMessage }}</p><button class="btn btn-primary btn-full btn-large" type="submit">Masuk ke portal <span>→</span></button></form><div class="auth-divider"><span>ATAU COBA AKUN DEMO</span></div><div class="demo-accounts"><button v-for="demo in demos" :key="demo.username" class="demo-account" @click="quickLogin(demo)"><span class="demo-avatar" :class="`demo-${demo.role}`">{{ demo.initials }}</span><span><b>{{ demo.label }}</b><small>{{ demo.desc }}</small></span><span class="demo-arrow">↗</span></button></div><p class="auth-note">Akun demo tersedia untuk mencoba alur sesuai peran. Data yang dibuat tersimpan di browser ini.</p></div></div></div>
</template>

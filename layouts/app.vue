<script setup lang="ts">
const { currentUser, unreadCount, logout } = useLaporMas()
const route = useRoute()
const menuOpen = ref(false)
const user = computed(() => currentUser.value)
const home = computed(() => user.value?.role === 'admin' ? '/admin' : user.value?.role === 'petugas' ? '/petugas' : user.value?.role === 'rt' ? '/rt' : '/app')
const roleName = computed(() => user.value ? ({ masyarakat: 'Masyarakat', petugas: 'Petugas Keamanan', admin: 'Administrator', rt: 'Ketua RT' }[user.value.role]) : '')
const navGroups = computed(() => {
  if (user.value?.role === 'admin') return [
    { label: 'WORKSPACE', items: [{ to: '/admin', icon: '⌂', label: 'Ringkasan' }, { to: '/app/laporan', icon: '▤', label: 'Semua laporan' }, { to: '/admin/pengguna', icon: '♙', label: 'Manajemen akun' }, { to: '/admin/rekap', icon: '▦', label: 'Rekapitulasi' }] },
    { label: 'PERSONAL', items: [{ to: '/app/notifikasi', icon: '♧', label: 'Notifikasi', badge: unreadCount.value }, { to: '/app/profil', icon: '◉', label: 'Profil saya' }] }
  ]
  if (user.value?.role === 'petugas') return [
    { label: 'WORKSPACE', items: [{ to: '/petugas', icon: '⌂', label: 'Antrean penanganan' }, { to: '/app/laporan', icon: '▤', label: 'Semua laporan' }] },
    { label: 'PERSONAL', items: [{ to: '/app/notifikasi', icon: '♧', label: 'Notifikasi', badge: unreadCount.value }, { to: '/app/profil', icon: '◉', label: 'Profil saya' }] }
  ]
  if (user.value?.role === 'rt') return [
    { label: 'WORKSPACE', items: [{ to: '/rt', icon: '⌂', label: 'Ringkasan RT' }, { to: '/app/laporan', icon: '▤', label: 'Laporan terverifikasi' }] },
    { label: 'PERSONAL', items: [{ to: '/app/notifikasi', icon: '♧', label: 'Notifikasi', badge: unreadCount.value }, { to: '/app/profil', icon: '◉', label: 'Profil saya' }] }
  ]
  return [
    { label: 'MENU UTAMA', items: [{ to: '/app', icon: '⌂', label: 'Beranda' }, { to: '/app/laporan', icon: '▤', label: 'Laporan saya' }, { to: '/app/laporan/buat', icon: '＋', label: 'Buat laporan' }] },
    { label: 'AKUN', items: [{ to: '/app/notifikasi', icon: '♧', label: 'Notifikasi', badge: unreadCount.value }, { to: '/app/profil', icon: '◉', label: 'Profil saya' }] }
  ]
})
function doLogout() { logout(); navigateTo('/login') }
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>
<template>
  <div class="app-shell">
    <div v-if="menuOpen" class="mobile-scrim" @click="menuOpen = false"></div>
    <aside class="sidebar" :class="{ 'sidebar-open': menuOpen }">
      <div class="sidebar-brand"><BrandLogo /></div>
      <div class="workspace-switch"><div class="workspace-avatar">LM</div><div><strong>Komplek Harmoni</strong><small>Lingkungan RW 03</small></div><span class="switch-caret">⌄</span></div>
      <nav class="side-nav">
        <div v-for="group in navGroups" :key="group.label" class="nav-group">
          <p class="nav-heading">{{ group.label }}</p>
          <SidebarLink v-for="item in group.items" :key="item.to" v-bind="item" />
        </div>
      </nav>
      <div class="sidebar-bottom">
        <div class="help-card"><div class="help-icon">✳</div><strong>Butuh bantuan?</strong><p>Hubungi admin lingkungan untuk bantuan akun atau pelaporan.</p><a href="mailto:admin@lapormas.local">Hubungi admin ↗</a></div>
        <div class="sidebar-user"><div class="avatar">{{ user?.name?.slice(0, 1).toUpperCase() || 'L' }}</div><div class="sidebar-user-info"><strong>{{ user?.name }}</strong><small>{{ roleName }}</small></div><button class="logout-mini" aria-label="Keluar" title="Keluar" @click="doLogout">↗</button></div>
      </div>
    </aside>
    <div class="app-main">
      <header class="topbar">
        <button class="mobile-menu" aria-label="Buka menu" @click="menuOpen = !menuOpen">☰</button>
        <div class="breadcrumb"><span>Komplek Harmoni</span><b>/</b><strong>{{ route.meta.title || 'Dashboard' }}</strong></div>
        <div class="topbar-actions"><span class="secure-indicator"><i></i> Area warga</span><NuxtLink to="/app/notifikasi" class="top-icon" aria-label="Notifikasi">♧<i v-if="unreadCount" class="notification-dot"></i></NuxtLink><button class="top-avatar" @click="navigateTo('/app/profil')">{{ user?.name?.slice(0, 1).toUpperCase() }}</button></div>
      </header>
      <main class="page-content"><slot /></main>
      <footer class="app-footer"><span>© 2026 LaporMas! 0.1</span><span>Prototype layanan aduan lingkungan · Data tersimpan di browser ini</span></footer>
    </div>
  </div>
</template>

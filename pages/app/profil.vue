<script setup lang="ts">
import type { Role } from '~/types/lapormas'
definePageMeta({ layout: 'app', middleware: 'auth', title: 'Profil Saya' })
const { currentUser, updateProfile, setNotificationPreference, logout } = useLaporMas()
const user = computed(() => currentUser.value!)
const name = ref(user.value.name)
const address = ref(user.value.address)
const phone = ref(user.value.phone || '')
const enabled = ref(user.value.notificationsEnabled)
const success = ref('')
const roleLabel: Record<Role, string> = { masyarakat: 'Masyarakat', petugas: 'Petugas Keamanan', admin: 'Administrator', rt: 'Ketua RT' }
function save() { if (!name.value.trim() || !address.value.trim()) return; updateProfile({ name: name.value, address: address.value, phone: phone.value }); success.value = 'Profil berhasil diperbarui.' }
function changeNotification(value: boolean) { enabled.value = value; setNotificationPreference(value) }
function signOut() { logout(); navigateTo('/login') }
function onNotificationToggle(event: Event) { changeNotification((event.target as HTMLInputElement).checked) }
</script>
<template><div class="page-stack"><div class="page-title-row"><div><div class="eyebrow">PENGATURAN AKUN</div><h1>Profil saya</h1><p>Kelola informasi dasar dan preferensi notifikasi akun.</p></div></div><div class="profile-layout"><section class="panel profile-card"><div class="profile-card-head"><div class="profile-avatar">{{ user.name.slice(0,1).toUpperCase() }}</div><div><h3>{{ user.name }}</h3><p>{{ roleLabel[user.role] }} · @{{ user.username }}</p></div><span class="account-active">● Aktif</span></div><div v-if="success" class="success-banner">✓ {{ success }}</div><form class="form-stack" @submit.prevent="save"><label class="field-label">Nama lengkap<input v-model="name" class="text-input" required maxlength="70"/></label><label class="field-label">Username<input :value="user.username" class="text-input readonly" readonly/></label><label class="field-label">Peran akun<input :value="roleLabel[user.role]" class="text-input readonly" readonly/></label><label class="field-label">Alamat / lokasi lingkungan<input v-model="address" class="text-input" required maxlength="100"/></label><label class="field-label">Nomor telepon (opsional)<input v-model="phone" class="text-input" maxlength="20" placeholder="08xxxxxxxxxx"/></label><div class="form-actions"><span class="field-hint">Perubahan hanya tersimpan di browser ini.</span><button class="btn btn-primary">Simpan profil</button></div></form></section><aside class="profile-side"><section class="panel preference-card"><div class="eyebrow">PREFERENSI</div><h3>Notifikasi aktivitas</h3><p>Terima pembaruan di dalam portal ketika laporan diverifikasi atau penanganannya diperbarui.</p><label class="toggle-row"><span><b>Notifikasi aplikasi</b><small>{{ enabled ? 'Aktif' : 'Nonaktif' }}</small></span><input type="checkbox" :checked="enabled" @change="onNotificationToggle"/><i></i></label><small class="field-hint">Ini adalah notifikasi internal prototipe, bukan push notification perangkat.</small></section><section class="panel session-card"><div class="eyebrow">SESI DEMO</div><h3>Keluar dari akun</h3><p>Anda dapat masuk kembali menggunakan akun demo atau akun yang dibuat admin.</p><button class="btn btn-outline btn-full" @click="signOut">Keluar dari LaporMas! ↗</button></section></aside></div></div></template>

<script setup lang="ts">
import type { Priority } from '~/types/lapormas'
definePageMeta({ layout: 'app', middleware: 'auth', title: 'Formulir Laporan' })
const { state, currentUser, createReport, updateReport } = useLaporMas()
const route = useRoute()
const editId = computed(() => String(route.query.edit || ''))
const existing = computed(() => state.value.reports.find(r => r.id === editId.value))
const title = ref('')
const category = ref('Keamanan lingkungan')
const description = ref('')
const location = ref('')
const occurredAt = ref(new Date(Date.now() - 15 * 60_000).toISOString().slice(0, 16))
const priority = ref<Priority>('Sedang')
const attachments = ref<string[]>([])
const selectedFiles = ref<string[]>([])
const errorMessage = ref('')
const saving = ref(false)
const categories = ['Keamanan lingkungan', 'Ketertiban', 'Fasilitas umum', 'Kebersihan', 'Gangguan lingkungan', 'Lainnya']
const priorities: Priority[] = ['Rendah', 'Sedang', 'Tinggi', 'Darurat']
watch(existing, report => {
  if (report && report.ownerId === currentUser.value?.id) {
    title.value = report.title; category.value = report.category; description.value = report.description; location.value = report.location
    occurredAt.value = report.occurredAt.slice(0, 16); priority.value = report.priority; attachments.value = [...report.attachments]; selectedFiles.value = [...report.attachments]
  }
}, { immediate: true })
function onFiles(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])
  if (files.length + attachments.value.length > 4) { errorMessage.value = 'Maksimal 4 lampiran.'; input.value = ''; return }
  selectedFiles.value = files.map(file => file.name)
  attachments.value = [...new Set([...attachments.value, ...files.map(file => file.name)])].slice(0, 4)
  errorMessage.value = ''
}
function removeFile(name: string) { attachments.value = attachments.value.filter(item => item !== name); selectedFiles.value = selectedFiles.value.filter(item => item !== name) }
function submit() {
  errorMessage.value = ''
  if (!title.value.trim() || !description.value.trim() || !location.value.trim() || !occurredAt.value) { errorMessage.value = 'Lengkapi semua informasi wajib sebelum mengirim.'; return }
  saving.value = true
  const payload = { title: title.value.trim(), category: category.value, description: description.value.trim(), location: location.value.trim(), occurredAt: new Date(occurredAt.value).toISOString(), priority: priority.value, attachments: attachments.value }
  if (editId.value && existing.value?.ownerId === currentUser.value?.id) {
    updateReport(editId.value, payload)
    saving.value = false
    navigateTo(`/app/laporan/${editId.value}`)
  } else {
    const report = createReport(payload)
    saving.value = false
    if (report) navigateTo(`/app/laporan/${report.id}?created=1`)
  }
}
</script>
<template>
  <div class="page-stack form-page"><div class="page-title-row"><div><div class="eyebrow">FORMULIR ADUAN WARGA</div><h1>{{ editId ? 'Perbarui laporan' : 'Buat laporan baru' }}</h1><p>Sampaikan informasi dengan jelas agar admin dan petugas dapat menindaklanjuti.</p></div><NuxtLink to="/app/laporan" class="btn btn-ghost">← Kembali</NuxtLink></div>
    <div class="form-layout"><form class="panel report-form" @submit.prevent="submit"><div class="form-section-head"><span>01</span><div><h3>Informasi kejadian</h3><p>Jelaskan hal yang terjadi di lingkungan komplek.</p></div></div><label class="field-label">Judul laporan <em>*</em><input v-model="title" class="text-input" maxlength="90" placeholder="Contoh: Lampu jalan Blok C padam" required /></label><div class="form-two-col"><label class="field-label">Kategori laporan <em>*</em><select v-model="category" class="text-input"><option v-for="item in categories" :key="item">{{ item }}</option></select></label><label class="field-label">Tingkat urgensi <em>*</em><select v-model="priority" class="text-input"><option v-for="item in priorities" :key="item">{{ item }}</option></select></label></div><label class="field-label">Deskripsi kejadian <em>*</em><textarea v-model="description" class="text-input textarea" rows="5" maxlength="1200" placeholder="Ceritakan apa yang terjadi, kapan diketahui, dan informasi lain yang relevan..." required></textarea><small class="field-hint">Hindari menuliskan data pribadi atau identitas pihak lain yang tidak diperlukan.</small></label><div class="form-section-head form-section-spaced"><span>02</span><div><h3>Waktu & lokasi</h3><p>Bantu petugas menemukan titik kejadian.</p></div></div><div class="form-two-col"><label class="field-label">Waktu kejadian <em>*</em><input v-model="occurredAt" type="datetime-local" class="text-input" required /></label><label class="field-label">Lokasi kejadian <em>*</em><input v-model="location" class="text-input" maxlength="100" placeholder="Contoh: Jalan utama Blok C" required /></label></div><div class="form-section-head form-section-spaced"><span>03</span><div><h3>Lampiran pendukung</h3><p>Tambahkan foto jika tersedia (maksimal 4 file).</p></div></div><label class="upload-zone"><input type="file" accept="image/*,.pdf" multiple @change="onFiles"/><span class="upload-symbol">↑</span><b>Seret file ke sini atau <u>pilih file</u></b><small>JPG, PNG, atau PDF · Maksimal 4 lampiran</small></label><div v-if="attachments.length" class="attachment-list"><div v-for="file in attachments" :key="file" class="attachment-item"><span>▧</span><b>{{ file }}</b><button type="button" aria-label="Hapus lampiran" @click="removeFile(file)">×</button></div></div><div v-if="errorMessage" class="form-error">{{ errorMessage }}</div><div class="form-actions"><span><em>*</em> Wajib diisi</span><button type="submit" class="btn btn-primary" :disabled="saving">{{ editId ? 'Simpan perubahan' : 'Kirim laporan' }} <span>→</span></button></div></form><aside class="form-aside"><div class="aside-info"><span class="aside-info-icon">✳</span><h3>Tips membuat laporan</h3><ul><li>Gunakan judul singkat dan jelas.</li><li>Jelaskan kejadian berdasarkan hal yang Anda ketahui.</li><li>Sertakan waktu dan lokasi yang spesifik.</li><li>Unggah foto pendukung bila aman dilakukan.</li></ul></div><div class="aside-warning"><b>Perlu bantuan segera?</b><p>Untuk kondisi darurat atau ancaman keselamatan yang sedang terjadi, hubungi petugas keamanan secara langsung. Jangan menunggu respons dari portal.</p></div><div class="aside-process"><b>Setelah dikirim</b><div><span>1</span> Admin memeriksa laporan</div><div><span>2</span> Laporan valid ditampilkan ke warga</div><div><span>3</span> Petugas melakukan tindak lanjut</div></div></aside></div>
  </div>
</template>

import { computed } from 'vue'
import type { AppUser, NotificationItem, Recap, Report, ReportStatus, Role, StoreState } from '~/types/lapormas'
import { createSeedStore } from '~/utils/seed'

const makeId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
const nowIso = () => new Date().toISOString()
const roleLabel: Record<Role, string> = { masyarakat: 'Masyarakat', petugas: 'Petugas Keamanan', admin: 'Admin', rt: 'Ketua RT' }

export function useLaporMas() {
  const state = useState<StoreState>('lapormas:store:v1', () => createSeedStore())
  const currentUser = computed(() => state.value.currentUser)
  const unreadCount = computed(() => state.value.notifications.filter(n => n.userId === state.value.currentUser?.id && !n.read).length)

  function pushEvent(report: Report, label: string, description: string, actorName: string) {
    report.events.push({ id: makeId('evt'), label, description, createdAt: nowIso(), actorName })
    report.updatedAt = nowIso()
  }

  function notifyAll(title: string, message: string, link: string, kind: NotificationItem['kind']) {
    const users = state.value.users.filter(user => user.active && user.notificationsEnabled)
    for (const user of users) {
      state.value.notifications.unshift({ id: makeId('ntf'), userId: user.id, title, message, createdAt: nowIso(), read: false, link, kind })
    }
  }

  function login(username: string, password: string) {
    const user = state.value.users.find(item => item.username.toLowerCase() === username.trim().toLowerCase() && item.password === password)
    if (!user || !user.active) return { ok: false, message: user ? 'Akun sedang dinonaktifkan. Hubungi admin lingkungan.' : 'Username atau password tidak sesuai.' }
    state.value.currentUser = { ...user }
    return { ok: true, message: 'Berhasil masuk.' }
  }

  function loginAs(username: string) {
    const user = state.value.users.find(item => item.username === username && item.active)
    if (!user) return false
    state.value.currentUser = { ...user }
    return true
  }

  function logout() { state.value.currentUser = null }

  function updateProfile(payload: { name: string; address: string; phone?: string }) {
    const user = state.value.users.find(item => item.id === state.value.currentUser?.id)
    if (!user || !state.value.currentUser) return false
    user.name = payload.name.trim()
    user.address = payload.address.trim()
    user.phone = payload.phone?.trim() || ''
    state.value.currentUser = { ...user }
    for (const report of state.value.reports) if (report.ownerId === user.id) report.ownerName = user.name
    return true
  }

  function setNotificationPreference(enabled: boolean) {
    const user = state.value.users.find(item => item.id === state.value.currentUser?.id)
    if (!user) return
    user.notificationsEnabled = enabled
    state.value.currentUser = { ...user }
  }

  function createReport(payload: Pick<Report, 'title' | 'category' | 'description' | 'location' | 'occurredAt' | 'priority' | 'attachments'>) {
    const user = state.value.currentUser
    if (!user || user.role !== 'masyarakat') return null
    const sequence = 1043 + state.value.reports.length
    const id = makeId('rep')
    const createdAt = nowIso()
    const report: Report = {
      id, ticket: `LM-${new Date().getFullYear()}-${String(sequence).padStart(4, '0')}`,
      ownerId: user.id, ownerName: user.name, ...payload, createdAt, updatedAt: createdAt,
      status: 'Menunggu verifikasi', events: [{ id: makeId('evt'), label: 'Laporan dikirim', description: 'Laporan diterima dan menunggu pemeriksaan admin.', createdAt, actorName: user.name }]
    }
    state.value.reports.unshift(report)
    return report
  }

  function updateReport(id: string, payload: Partial<Pick<Report, 'title' | 'category' | 'description' | 'location' | 'occurredAt' | 'priority' | 'attachments'>>) {
    const report = state.value.reports.find(item => item.id === id)
    const user = state.value.currentUser
    if (!report || !user || (user.role !== 'admin' && (user.role !== 'masyarakat' || report.ownerId !== user.id))) return false
    Object.assign(report, payload, { updatedAt: nowIso() })
    if (report.status === 'Ditolak') {
      report.status = 'Menunggu verifikasi'
      delete report.adminNote
      pushEvent(report, 'Laporan dikirim ulang', 'Pelapor memperbaiki informasi dan mengirim ulang laporan untuk diperiksa admin.', user.name)
    } else {
      pushEvent(report, 'Laporan diperbarui', 'Pelapor memperbarui informasi laporan.', user.name)
    }
    return true
  }

  function deleteReport(id: string) {
    const index = state.value.reports.findIndex(item => item.id === id)
    const report = state.value.reports[index]
    const user = state.value.currentUser
    if (index < 0 || !user || (user.role !== 'admin' && report.ownerId !== user.id)) return false
    state.value.reports.splice(index, 1)
    return true
  }

  function verifyReport(id: string, approved: boolean, note = '') {
    const report = state.value.reports.find(item => item.id === id)
    const actor = state.value.currentUser
    if (!report || actor?.role !== 'admin' || report.status !== 'Menunggu verifikasi') return false
    report.status = approved ? 'Terverifikasi' : 'Ditolak'
    report.adminNote = note.trim() || (approved ? 'Laporan dinyatakan valid oleh admin.' : 'Laporan belum dapat diverifikasi. Hubungi admin untuk informasi lebih lanjut.')
    pushEvent(report, approved ? 'Laporan diverifikasi' : 'Laporan ditolak', report.adminNote, actor.name)
    if (approved) notifyAll('Laporan baru terverifikasi', `Laporan "${report.title}" telah dikonfirmasi dan dapat dipantau warga.`, `/app/laporan/${report.id}`, 'report')
    else notifyOwner(report, 'Laporan perlu diperbaiki', `Laporan "${report.title}" belum dapat diverifikasi: ${report.adminNote}`, `/app/laporan/${report.id}`, 'report')
    return true
  }

  function takeReport(id: string) {
    const report = state.value.reports.find(item => item.id === id)
    const actor = state.value.currentUser
    if (!report || actor?.role !== 'petugas' || report.status !== 'Terverifikasi') return false
    report.status = 'Ditangani'
    pushEvent(report, 'Mulai ditangani', 'Petugas keamanan mulai menindaklanjuti laporan.', actor.name)
    notifyOwner(report, 'Laporan mulai ditangani', `Petugas mulai menindaklanjuti laporan "${report.title}".`, `/app/laporan/${report.id}`, 'report')
    return true
  }

  function resolveReport(id: string, summary: string) {
    const report = state.value.reports.find(item => item.id === id)
    const actor = state.value.currentUser
    if (!report || actor?.role !== 'petugas' || report.status !== 'Ditangani' || !summary.trim()) return false
    report.resolution = { id: makeId('res'), summary: summary.trim(), createdAt: nowIso(), officerId: actor.id, officerName: actor.name }
    report.status = 'Selesai'
    pushEvent(report, 'Penanganan selesai', 'Petugas mengirimkan hasil penyelesaian laporan.', actor.name)
    notifyAll('Hasil penanganan tersedia', `Penanganan laporan "${report.title}" telah diperbarui.`, `/app/laporan/${report.id}`, 'resolution')
    return true
  }

  function updateResolution(id: string, summary: string) {
    const report = state.value.reports.find(item => item.id === id)
    const actor = state.value.currentUser
    if (!report || actor?.role !== 'petugas' || !report.resolution || !summary.trim()) return false
    report.resolution.summary = summary.trim()
    report.resolution.createdAt = nowIso()
    report.resolution.officerId = actor.id
    report.resolution.officerName = actor.name
    pushEvent(report, 'Hasil penanganan diperbarui', 'Petugas memperbarui catatan penyelesaian.', actor.name)
    notifyOwner(report, 'Hasil penanganan diperbarui', `Hasil penanganan laporan "${report.title}" telah diperbarui.`, `/app/laporan/${report.id}`, 'resolution')
    return true
  }

  function deleteResolution(id: string) {
    const report = state.value.reports.find(item => item.id === id)
    const actor = state.value.currentUser
    if (!report || actor?.role !== 'petugas' || !report.resolution) return false
    delete report.resolution
    report.status = 'Ditangani'
    pushEvent(report, 'Catatan penyelesaian dihapus', 'Petugas menghapus hasil penyelesaian untuk diperbarui kembali.', actor.name)
    return true
  }

  function notifyOwner(report: Report, title: string, message: string, link: string, kind: NotificationItem['kind']) {
    const owner = state.value.users.find(user => user.id === report.ownerId)
    if (owner?.notificationsEnabled) state.value.notifications.unshift({ id: makeId('ntf'), userId: owner.id, title, message, createdAt: nowIso(), read: false, link, kind })
  }

  function addUser(payload: { username: string; password: string; name: string; role: Role; address: string; phone?: string }) {
    if (state.value.currentUser?.role !== 'admin') return { ok: false, message: 'Akses hanya untuk admin.' }
    if (state.value.users.some(user => user.username.toLowerCase() === payload.username.trim().toLowerCase())) return { ok: false, message: 'Username sudah digunakan.' }
    const user: AppUser = { id: makeId('usr'), username: payload.username.trim(), password: payload.password, name: payload.name.trim(), role: payload.role, address: payload.address.trim(), phone: payload.phone?.trim(), active: true, notificationsEnabled: true, createdAt: nowIso() }
    state.value.users.push(user)
    state.value.notifications.unshift({ id: makeId('ntf'), userId: user.id, title: 'Akun LaporMas dibuat', message: `Akun Anda telah dibuat oleh admin. Username: ${user.username}. Simpan informasi login dari admin dan hubungi admin jika membutuhkan reset password.`, createdAt: nowIso(), read: false, link: '/app/profil', kind: 'account' })
    return { ok: true, message: 'Akun berhasil dibuat.' }
  }

  function resetPassword(userId: string, password: string) {
    if (state.value.currentUser?.role !== 'admin' || !password.trim()) return false
    const user = state.value.users.find(item => item.id === userId)
    if (!user) return false
    user.password = password
    return true
  }

  function toggleUserActive(userId: string) {
    if (state.value.currentUser?.role !== 'admin' || userId === state.value.currentUser.id) return false
    const user = state.value.users.find(item => item.id === userId)
    if (!user) return false
    user.active = !user.active
    return true
  }

  function createRecap(payload: { title: string; period: string; summary: string }) {
    const actor = state.value.currentUser
    if (actor?.role !== 'admin' || !payload.title.trim() || !payload.period) return false
    const reports = state.value.reports.filter(report => report.createdAt.slice(0, 7) === payload.period && report.status !== 'Menunggu verifikasi' && report.status !== 'Ditolak')
    const recap: Recap = {
      id: makeId('rec'), title: payload.title.trim(), period: payload.period, summary: payload.summary.trim(),
      totalReports: reports.length, completedReports: reports.filter(report => report.status === 'Selesai').length,
      publishedAt: nowIso(), publishedBy: actor.name
    }
    state.value.recaps.unshift(recap)
    notifyAll('Rekapitulasi baru diterbitkan', `${recap.title} sudah tersedia untuk diunduh.`, '/rt', 'account')
    return true
  }

  function markNotificationRead(id: string) {
    const item = state.value.notifications.find(n => n.id === id && n.userId === state.value.currentUser?.id)
    if (item) item.read = true
  }
  function markAllNotificationsRead() {
    for (const item of state.value.notifications) if (item.userId === state.value.currentUser?.id) item.read = true
  }

  function replaceStore(next: StoreState) { state.value = next }
  function resetDemo() { state.value = createSeedStore() }

  return {
    state, currentUser, unreadCount, roleLabel, login, loginAs, logout, updateProfile, setNotificationPreference,
    createReport, updateReport, deleteReport, verifyReport, takeReport, resolveReport, updateResolution, deleteResolution,
    addUser, resetPassword, toggleUserActive, createRecap, markNotificationRead, markAllNotificationsRead,
    replaceStore, resetDemo
  }
}

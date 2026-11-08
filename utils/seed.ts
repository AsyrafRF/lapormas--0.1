import type { AppUser, Report, StoreState } from '~/types/lapormas'

const iso = (date: string) => new Date(date).toISOString()

export function createSeedStore(): StoreState {
  const users: AppUser[] = [
    { id: 'usr-admin', username: 'admin', password: 'admin123', name: 'Admin LaporMas', role: 'admin', address: 'Sekretariat RW 08', phone: '081200000001', active: true, notificationsEnabled: true, createdAt: iso('2026-01-05T08:00:00') },
    { id: 'usr-warga', username: 'warga', password: 'warga123', name: 'Bagus Sofan', role: 'masyarakat', address: 'Blok C-12', phone: '081200000012', active: true, notificationsEnabled: true, createdAt: iso('2026-01-06T09:00:00') },
    { id: 'usr-petugas', username: 'petugas', password: 'petugas123', name: 'Rudi Santoso', role: 'petugas', address: 'Pos Keamanan Utama', phone: '081200000022', active: true, notificationsEnabled: true, createdAt: iso('2026-01-07T07:00:00') },
    { id: 'usr-rt', username: 'ketua.rt', password: 'rt123', name: 'Hendra Wijaya', role: 'rt', address: 'Ketua RT 08 / RW 03', phone: '081200000033', active: true, notificationsEnabled: true, createdAt: iso('2026-01-08T07:00:00') },
    { id: 'usr-warga2', username: 'warga2', password: 'warga123', name: 'Nadia Putri', role: 'masyarakat', address: 'Blok A-07', active: true, notificationsEnabled: true, createdAt: iso('2026-02-01T10:00:00') }
  ]

  const reports: Report[] = [
    {
      id: 'rep-1042', ticket: 'LM-2026-1042', ownerId: 'usr-warga', ownerName: 'Bagus Sofan',
      title: 'Lampu penerangan jalan Blok C padam', category: 'Fasilitas umum',
      description: 'Lampu jalan di dekat taman Blok C sudah padam sejak tadi malam. Area menjadi cukup gelap saat warga melintas.',
      location: 'Jalan utama Blok C, dekat taman', occurredAt: iso('2026-11-07T19:30:00'), createdAt: iso('2026-11-07T20:10:00'), updatedAt: iso('2026-11-07T20:10:00'),
      priority: 'Sedang', status: 'Menunggu verifikasi', attachments: ['kondisi-lampu.jpg'],
      events: [{ id: 'ev-1042-1', label: 'Laporan dikirim', description: 'Laporan diterima dan menunggu pemeriksaan admin.', createdAt: iso('2026-11-07T20:10:00'), actorName: 'Bagus Sofan' }]
    },
    {
      id: 'rep-1041', ticket: 'LM-2026-1041', ownerId: 'usr-warga2', ownerName: 'Nadia Putri',
      title: 'Orang tidak dikenal terlihat berulang kali di area gerbang', category: 'Keamanan lingkungan',
      description: 'Warga melihat seseorang yang tidak dikenal berada di sekitar gerbang beberapa kali. Mohon petugas meningkatkan pemantauan. Tidak ada kontak langsung yang terjadi.',
      location: 'Gerbang utama komplek', occurredAt: iso('2026-11-07T17:45:00'), createdAt: iso('2026-11-07T18:05:00'), updatedAt: iso('2026-11-07T18:40:00'),
      priority: 'Tinggi', status: 'Terverifikasi', attachments: [],
      events: [
        { id: 'ev-1041-1', label: 'Laporan dikirim', description: 'Laporan diterima oleh sistem.', createdAt: iso('2026-11-07T18:05:00'), actorName: 'Nadia Putri' },
        { id: 'ev-1041-2', label: 'Laporan diverifikasi', description: 'Admin mengonfirmasi laporan dan meneruskannya kepada petugas keamanan.', createdAt: iso('2026-11-07T18:40:00'), actorName: 'Admin LaporMas' }
      ]
    },
    {
      id: 'rep-1038', ticket: 'LM-2026-1038', ownerId: 'usr-warga', ownerName: 'Bagus Sofan',
      title: 'Sampah menumpuk di area taman bermain', category: 'Kebersihan',
      description: 'Tempat sampah di taman bermain sudah penuh dan sampah mulai berserakan. Mohon dijadwalkan pengangkutan.',
      location: 'Taman bermain Blok B', occurredAt: iso('2026-11-05T08:00:00'), createdAt: iso('2026-11-05T08:20:00'), updatedAt: iso('2026-11-05T10:15:00'),
      priority: 'Rendah', status: 'Ditangani', attachments: ['taman-bermain.jpg'],
      events: [
        { id: 'ev-1038-1', label: 'Laporan dikirim', description: 'Laporan diterima oleh sistem.', createdAt: iso('2026-11-05T08:20:00'), actorName: 'Bagus Sofan' },
        { id: 'ev-1038-2', label: 'Laporan diverifikasi', description: 'Laporan dinyatakan valid oleh admin.', createdAt: iso('2026-11-05T09:00:00'), actorName: 'Admin LaporMas' },
        { id: 'ev-1038-3', label: 'Mulai ditangani', description: 'Petugas keamanan meneruskan laporan ke petugas kebersihan.', createdAt: iso('2026-11-05T10:15:00'), actorName: 'Rudi Santoso' }
      ]
    },
    {
      id: 'rep-1032', ticket: 'LM-2026-1032', ownerId: 'usr-warga2', ownerName: 'Nadia Putri',
      title: 'Keributan di area parkir Blok A', category: 'Ketertiban',
      description: 'Terjadi perselisihan antar pengendara di area parkir. Petugas datang melakukan mediasi dan situasi sudah kondusif.',
      location: 'Area parkir Blok A', occurredAt: iso('2026-11-02T21:15:00'), createdAt: iso('2026-11-02T21:25:00'), updatedAt: iso('2026-11-02T22:10:00'),
      priority: 'Sedang', status: 'Selesai', attachments: [],
      resolution: { id: 'res-1032', summary: 'Petugas melakukan mediasi kepada pihak terkait. Kedua pihak sepakat menyelesaikan masalah secara baik dan situasi kembali kondusif.', createdAt: iso('2026-11-02T22:10:00'), officerId: 'usr-petugas', officerName: 'Rudi Santoso' },
      events: [
        { id: 'ev-1032-1', label: 'Laporan dikirim', description: 'Laporan diterima oleh sistem.', createdAt: iso('2026-11-02T21:25:00'), actorName: 'Nadia Putri' },
        { id: 'ev-1032-2', label: 'Laporan diverifikasi', description: 'Laporan dinyatakan valid.', createdAt: iso('2026-11-02T21:35:00'), actorName: 'Admin LaporMas' },
        { id: 'ev-1032-3', label: 'Mulai ditangani', description: 'Petugas keamanan melakukan tindak lanjut di lokasi.', createdAt: iso('2026-11-02T21:45:00'), actorName: 'Rudi Santoso' },
        { id: 'ev-1032-4', label: 'Penanganan selesai', description: 'Petugas mengirimkan hasil penyelesaian.', createdAt: iso('2026-11-02T22:10:00'), actorName: 'Rudi Santoso' }
      ]
    },
    {
      id: 'rep-1029', ticket: 'LM-2026-1029', ownerId: 'usr-warga', ownerName: 'Bagus Sofan',
      title: 'Kendaraan menghalangi akses jalan', category: 'Ketertiban',
      description: 'Sebuah kendaraan parkir terlalu dekat dengan tikungan sehingga menyulitkan kendaraan lain untuk lewat.',
      location: 'Tikungan Blok C menuju Blok D', occurredAt: iso('2026-10-29T16:00:00'), createdAt: iso('2026-10-29T16:25:00'), updatedAt: iso('2026-10-29T17:05:00'),
      priority: 'Sedang', status: 'Ditolak', attachments: [], adminNote: 'Informasi lokasi belum cukup untuk diverifikasi. Silakan kirim ulang dengan titik lokasi yang lebih spesifik.',
      events: [
        { id: 'ev-1029-1', label: 'Laporan dikirim', description: 'Laporan diterima oleh sistem.', createdAt: iso('2026-10-29T16:25:00'), actorName: 'Bagus Sofan' },
        { id: 'ev-1029-2', label: 'Laporan belum dapat diverifikasi', description: 'Admin meminta detail lokasi yang lebih jelas.', createdAt: iso('2026-10-29T17:05:00'), actorName: 'Admin LaporMas' }
      ]
    }
  ]

  return {
    users,
    reports,
    notifications: [
      { id: 'ntf-1', userId: 'usr-warga', title: 'Pantau laporan lingkungan', message: 'Ada laporan terverifikasi baru di lingkungan komplek.', createdAt: iso('2026-11-07T18:40:00'), read: false, link: '/app/laporan/rep-1041', kind: 'report' },
      { id: 'ntf-2', userId: 'usr-warga', title: 'Laporan selesai ditangani', message: 'Laporan keributan di area parkir Blok A telah diselesaikan.', createdAt: iso('2026-11-02T22:10:00'), read: true, link: '/app/laporan/rep-1032', kind: 'resolution' },
      { id: 'ntf-3', userId: 'usr-rt', title: 'Rekapitulasi Oktober tersedia', message: 'Rekapitulasi laporan masyarakat periode Oktober 2026 telah diterbitkan.', createdAt: iso('2026-11-01T09:00:00'), read: false, link: '/rt', kind: 'account' }
    ],
    recaps: [
      { id: 'rec-2026-10', title: 'Rekapitulasi Laporan Oktober 2026', period: '2026-10', summary: 'Rekap laporan warga pada Oktober 2026 untuk pemantauan keamanan, ketertiban, fasilitas, dan kebersihan lingkungan.', totalReports: 18, completedReports: 15, publishedAt: iso('2026-11-01T09:00:00'), publishedBy: 'Admin LaporMas' }
    ],
    currentUser: null
  }
}

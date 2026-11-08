# 4. Arsitektur frontend dan model data

## 4.1 Teknologi

- Nuxt 3 + Vue 3 Composition API.
- TypeScript untuk model dan fungsi inti.
- CSS terstruktur pada `assets/css/main.css`; tanpa framework UI eksternal.
- `useState` Nuxt sebagai state aplikasi bersama.
- Browser `localStorage` melalui plugin client sebagai penyimpanan simulasi.

## 4.2 Struktur folder

```text
.
├── assets/css/main.css
├── components/          # Logo, badge status, kartu laporan, statistik, navigasi
├── composables/         # useLaporMas: state dan operasi bisnis simulasi
├── docs/                # Dokumentasi kebutuhan, setup, alur, data, pengujian
├── layouts/app.vue      # Shell aplikasi dan menu per peran
├── middleware/auth.ts   # Guard login dan role sederhana
├── pages/
│   ├── index.vue        # Landing page
│   ├── login.vue
│   ├── app/              # Beranda warga, laporan, detail, notifikasi, profil
│   ├── admin/            # Dashboard, akun, rekapitulasi
│   ├── petugas/          # Antrean dan hasil penanganan
│   └── rt/               # Ringkasan dan unduhan rekap
├── plugins/              # Persistensi localStorage client
├── types/lapormas.ts     # Definisi tipe
└── utils/seed.ts         # Data demo awal
```

## 4.3 Entitas frontend

| Entitas | Atribut penting | Hubungan |
|---|---|---|
| `AppUser` | id, username, password demo, name, role, address, active, notificationsEnabled | Satu user masyarakat dapat memiliki banyak `Report`. |
| `Report` | id, ticket, ownerId, title, category, description, location, occurredAt, priority, status, attachments | Milik satu masyarakat; memiliki banyak event; dapat memiliki satu resolution. |
| `ReportEvent` | id, label, description, createdAt, actorName | Riwayat perubahan satu laporan. |
| `Resolution` | id, summary, createdAt, officerId, officerName | Hasil penanganan oleh petugas keamanan. |
| `NotificationItem` | id, userId, title, message, createdAt, read, link, kind | Ditujukan ke satu akun. |
| `Recap` | id, title, period, summary, totalReports, completedReports | Rekap bulanan yang diterbitkan admin. |

## 4.4 Peta kebutuhan database dari dokumen sumber

Dokumen awal menyebut tabel `t_masyarakat`, `t_laporan`, `t_admin`, `t_petugas_keamanan`, `t_laporan_penyelesaian`, `t_rekapitulasi_laporan`, dan `t_petugas_RT`. Prototipe menggabungkan representasi aktor menjadi `AppUser` dengan atribut `role` agar simulasi role-based lebih sederhana. Struktur database final perlu dirancang kembali saat backend dibuat, termasuk relasi foreign key, aturan retensi, audit log, privasi pelapor, dan kontrol akses.

## 4.5 Persistensi

Plugin `plugins/persistence.client.ts` memuat data dari `localStorage` pada sisi browser, kemudian menyimpan perubahan state secara reaktif. Karena penyimpanan ini hanya pada browser/perangkat yang sama:

- perubahan tidak tersinkron antar pengguna atau perangkat;
- menghapus data situs akan menghapus simulasi;
- data tidak terenkripsi oleh aplikasi;
- state demo tidak boleh dipakai untuk informasi sensitif atau operasional.

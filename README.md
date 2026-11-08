# LaporMas! 0.1 — Nuxt frontend prototype

Prototype frontend untuk portal pelayanan laporan masyarakat di lingkungan komplek perumahan, berdasarkan dokumen kebutuhan PBL LaporMas! 0.1.

## Fitur utama

- Landing page dan login dengan empat role: Masyarakat, Petugas Keamanan, Admin, Ketua RT.
- Alur laporan warga: buat, lihat, ubah, hapus, dan pantau riwayat status.
- Alur admin: verifikasi/tolak laporan, kelola akun, terbitkan rekap, hapus laporan.
- Alur petugas: ambil laporan, catat/edit/hapus hasil penanganan.
- Alur Ketua RT: pantau laporan terverifikasi dan ekspor CSV.
- Notifikasi internal dan persistensi simulasi menggunakan `localStorage`.
- Responsive UI Bahasa Indonesia.

## Mulai cepat

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Akun demo

| Role | Username | Password |
|---|---|---|
| Masyarakat | `warga` | `warga123` |
| Petugas Keamanan | `petugas` | `petugas123` |
| Admin | `admin` | `admin123` |
| Ketua RT | `ketua.rt` | `rt123` |

## Batasan penting

Ini **frontend prototype**, bukan sistem produksi. Tidak ada backend/database, autentikasi aman, upload file sebenarnya, atau push notification. Data simulasi disimpan lokal pada browser. Jangan gunakan data pribadi atau laporan sensitif yang sebenarnya.

Dokumentasi lengkap tersedia di [`/docs`](./docs/README.md).

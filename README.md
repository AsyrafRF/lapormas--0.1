# LaporMas! 0.1 — Nuxt frontend prototype

Prototype frontend untuk portal pelayanan laporan masyarakat di lingkungan komplek perumahan, berdasarkan dokumen kebutuhan PBL LaporMas! 0.1.

## Atribusi dan tim pengembang

**LaporMas! 0.1 dikembangkan oleh Tim TRPL1-005 Polibatam — Politeknik Negeri Batam.**

- **Team Leader:** 4342311014 — Bagus Sofan Barori
- **Team Members:** 4342311021 — Muhammad Ilham Rouuf; 4342311022 — Oktario Dhamardjati Ramadhan; 4342311023 — Daniel Charlie Samuel Siburian; 4342311026 — Asyraf Rais Fadhil; 4342311027 — Azim Nimrot Simanjuntak

Daftar lengkap dan format atribusi tersedia di [`docs/09-atribusi-tim.md`](./docs/09-atribusi-tim.md).

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

Pemeriksaan tipe: `npm run typecheck`.

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


## Catatan revisi

Arsip revisi ini menyertakan perbaikan pemeriksaan tipe TypeScript, penamaan fungsi ekspor CSV agar tidak bentrok dengan auto-import Nuxt, dan middleware role. Jika sebelumnya sudah menjalankan versi lama, hentikan server dan jalankan ulang dari folder hasil ekstraksi arsip revisi ini.


## Patch Typecheck Terbaru

Perbaikan lanjutan untuk tiga error `TS7006` pada halaman admin dijelaskan di [docs/08-perbaikan-typecheck.md](./docs/08-perbaikan-typecheck.md).

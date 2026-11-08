# Catatan Perbaikan Typecheck (Patch 2)

Patch ini menindaklanjuti hasil `npm run typecheck` yang masih melaporkan tiga error `TS7006` pada template halaman admin.

## Penyebab

Pada template Vue, `vue-tsc` tidak selalu mempertahankan inferensi tipe untuk parameter callback yang ditulis langsung di ekspresi interpolasi, misalnya `users.filter(u => ...)` atau `monthReports.filter(r => ...)`. Akibatnya parameter callback dianggap `any` meskipun sumber datanya sudah memiliki tipe di `<script setup>`.

## Perubahan

- `pages/admin/pengguna.vue`: perhitungan jumlah akun aktif dipindahkan ke `activeUsersCount` (`computed`) dan parameter callback diberi tipe `AppUser`.
- `pages/admin/rekap.vue`: perhitungan jumlah laporan selesai dan dalam proses dipindahkan ke `completedReportsCount` dan `inProgressReportsCount` (`computed`) dengan parameter callback bertipe `Report`.
- Template hanya menampilkan nilai computed, sehingga tidak ada callback `filter()` tanpa tipe di interpolasi.

## Setelah mengganti file

Jalankan kembali:

```bash
npm run typecheck
npm run dev
```

Bila terminal masih menampilkan hasil lama, hentikan proses dev dengan `Ctrl + C`, tutup terminal lama, lalu jalankan ulang perintah di atas dari folder proyek yang sudah diekstrak dari arsip patch terbaru.

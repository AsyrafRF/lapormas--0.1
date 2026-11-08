# 2. Menjalankan aplikasi

## Prasyarat

- Node.js 20 atau lebih baru (disarankan versi LTS).
- npm.
- Browser modern.

## Instalasi

Dari direktori proyek:

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan Nuxt di terminal (umumnya `http://localhost:3000`).

## Perintah yang tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan. |
| `npm run build` | Membuat build produksi Nuxt. |
| `npm run preview` | Menjalankan preview hasil build. |
| `npm run generate` | Membuat hasil pre-render statis (fitur yang membutuhkan state browser tetap berupa simulasi). |
| `npm run typecheck` | Menjalankan pemeriksaan tipe Nuxt/TypeScript. |

## Reset data demo

Semua perubahan disimpan pada `localStorage` browser dengan key `lapormas-prototype-v01`.

Untuk mengembalikan data awal, buka DevTools → Application/Storage → Local Storage → `http://localhost:3000`, lalu hapus key tersebut dan refresh halaman. Alternatifnya, hapus data situs untuk localhost.

## Catatan jaringan

Dependensi Nuxt harus diunduh saat `npm install`. Prototipe tidak memerlukan API eksternal atau database untuk dijalankan setelah dependensi tersedia.


## Pemeriksaan tipe dan peringatan npm

Setelah dependensi terpasang, jalankan pemeriksaan tipe dengan:

```bash
npm run typecheck
```

Jika terminal sebelumnya masih menampilkan error dari versi proyek lama, hentikan server (`Ctrl + C`), pastikan folder proyek berasal dari arsip revisi terbaru, lalu jalankan `npm install` dan `npm run dev` kembali. Jangan menyalin folder `.nuxt` atau `node_modules` dari instalasi lama ke arsip baru.

Pesan `npm warn deprecated` dan laporan `npm audit` bukan error kompilasi aplikasi. Tinjau detailnya dengan `npm audit`; hindari menjalankan `npm audit fix --force` tanpa memeriksa perubahan versi mayor karena dapat mengubah kompatibilitas dependensi.

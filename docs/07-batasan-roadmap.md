# 7. Batasan prototipe dan langkah lanjutan

## Yang sudah disimulasikan

- Role login empat kategori pengguna.
- Pembuatan, pengubahan, penghapusan, verifikasi, penolakan, penanganan, dan penyelesaian laporan.
- Riwayat status laporan dan notifikasi internal.
- Pembuatan akun, reset password demo, dan status aktif/nonaktif.
- Penerbitan ringkasan bulanan dan ekspor CSV.
- Penyimpanan state lokal pada browser.

## Belum termasuk

1. Backend/API, database server, sinkronisasi real-time, dan multi-user lintas perangkat.
2. Autentikasi aman, hashing password, session/token, rate limiting, MFA, dan kebijakan reset password.
3. Upload file sebenarnya, pemindaian malware, object storage, dan validasi MIME/ukuran server-side. Pada UI hanya nama file yang dicatat.
4. Web Push/email/SMS gateway. Notifikasi hanya berada di dalam aplikasi.
5. Peta/geolokasi, penugasan petugas formal, SLA, eskalasi kejadian, dan integrasi layanan darurat.
6. Audit log tahan manipulasi, backup, enkripsi data, dan kontrol akses granular.
7. PDF/XLSX report. Format ekspor saat ini CSV.
8. Unit test dan end-to-end test otomatis.

## Rekomendasi sebelum produksi

- Tetapkan klasifikasi informasi dan kebijakan laporan sensitif; jangan menampilkan detail yang berisiko kepada feed publik.
- Gunakan backend dengan validasi dan otorisasi di server. Middleware frontend tidak boleh dianggap sebagai pengaman akses.
- Terapkan hashing password (misalnya Argon2id/bcrypt melalui pustaka yang dipelihara), manajemen sesi yang aman, dan HTTPS.
- Simpan lampiran di storage privat dengan pemeriksaan tipe/ukuran dan otorisasi akses.
- Pisahkan identitas pelapor dari tampilan publik dan tetapkan retensi/penghapusan data.
- Rancang model relasi dan migrasi database berdasarkan ERD final; dokumen sumber memiliki beberapa field FK yang perlu ditinjau ulang saat desain backend.
- Implementasikan audit trail, notifikasi server-side, observability, backup, dan prosedur respons insiden.
- Uji aksesibilitas, keamanan, performa, dan alur pengguna bersama warga, petugas, admin, serta Ketua RT.

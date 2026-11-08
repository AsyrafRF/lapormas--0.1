# 6. Rencana uji fungsional

Pengujian berikut adalah checklist manual black-box untuk prototipe frontend. Isi tanggal, nama penguji, dan hasil aktual saat pelaksanaan.

| ID uji | Kebutuhan | Skenario | Hasil yang diharapkan |
|---|---|---|---|
| KU-001 | F002 | Login dengan akun warga valid | Berpindah ke dashboard masyarakat. |
| KU-002 | F002 | Login dengan password salah | Tetap di halaman login dan menampilkan pesan kesalahan. |
| KU-003 | F003 | Kirim laporan dengan semua field wajib terisi | Laporan baru tersimpan dengan status Menunggu verifikasi. |
| KU-004 | F003 | Kirim laporan tanpa judul/deskripsi/lokasi/waktu | Pengiriman ditolak oleh validasi form. |
| KU-005 | F003 | Edit laporan milik akun lain | Aksi tidak tersedia melalui UI; fungsi memeriksa kepemilikan. |
| KU-006 | F004 | Admin memverifikasi laporan pending | Status menjadi Terverifikasi dan laporan masuk feed publik. |
| KU-007 | F004 | Admin menolak laporan pending | Status menjadi Ditolak dan catatan pemeriksaan tersimpan. |
| KU-008 | F005 | Verifikasi laporan dengan notifikasi aktif | Notifikasi baru dibuat untuk akun aktif yang mengizinkan notifikasi. |
| KU-009 | F006 | Petugas mengambil laporan terverifikasi | Status berubah menjadi Ditangani. |
| KU-010 | F006 | Petugas menyimpan hasil penanganan | Hasil tersimpan dan status menjadi Selesai. |
| KU-011 | F006 | Petugas mengubah/menghapus catatan hasil | Catatan berubah; penghapusan mengembalikan status menjadi Ditangani. |
| KU-012 | F007 | Petugas mengirim hasil penyelesaian | Notifikasi hasil tersedia pada akun pengguna. |
| KU-013 | F001 | Admin membuat akun dengan username baru | Akun baru muncul pada daftar pengguna. |
| KU-014 | F001 | Admin membuat akun dengan username duplikat | Sistem menolak dan menampilkan pesan. |
| KU-015 | F001 | Admin reset password akun | Password demo akun diperbarui. |
| KU-016 | F008 | Admin menerbitkan rekap bulanan | Rekap masuk ke daftar arsip dan dapat dilihat Ketua RT. |
| KU-017 | F009 | Ketua RT mengunduh data laporan | Browser mengunduh CSV. |
| KU-018 | F010 | Admin menghapus laporan | Laporan tidak lagi muncul di daftar. |
| KU-019 | NFR | Buka pada viewport desktop dan seluler | Navigasi dan formulir tetap dapat digunakan; menu seluler dapat dibuka. |
| KU-020 | NFR | Refresh halaman setelah membuat laporan | Data masih tersedia pada browser yang sama melalui localStorage. |

## Template pencatatan hasil

| Atribut | Isian |
|---|---|
| ID uji | KU-___ |
| Nama penguji |  |
| Tanggal pengujian |  |
| Browser/perangkat |  |
| Hasil aktual |  |
| Kesimpulan | Lulus / Gagal |
| Catatan |  |

# 1. Ringkasan produk dan pemetaan kebutuhan

## 1.1 Tujuan

LaporMas! adalah portal laporan/pengaduan online bagi warga di suatu komplek perumahan. Sistem membantu warga menyampaikan kejadian yang mengganggu keamanan, ketertiban, fasilitas, dan kenyamanan lingkungan agar dapat diperiksa oleh admin dan ditindaklanjuti petugas keamanan serta pengurus RT/RW.

## 1.2 Aktor

| Aktor | Kewenangan utama dalam prototipe |
|---|---|
| Masyarakat | Login, membuat laporan, melihat laporan publik, mengubah/menghapus laporan sendiri, menerima notifikasi. |
| Petugas keamanan | Melihat laporan terverifikasi, mengambil penanganan, mencatat/mengubah/menghapus hasil penyelesaian. |
| Admin | Mengelola akun, memverifikasi/menolak laporan, menghapus laporan, menerbitkan rekapitulasi. |
| Ketua RT | Melihat laporan terverifikasi dan rekapitulasi serta mengunduh data. |

## 1.3 Pemetaan kebutuhan fungsional

| ID sumber | Kebutuhan dalam laporan | Implementasi prototipe |
|---|---|---|
| F001 | Admin mengelola akun user | Halaman **Manajemen akun**: membuat akun, reset password demo, aktif/nonaktif. |
| F002 | User login | Login berbasis username/password demo dan shortcut empat peran. |
| F003 | Masyarakat memasukkan laporan | Form laporan dengan judul, kategori, deskripsi, waktu, lokasi, urgensi, dan nama lampiran. |
| F004 | Admin mengonfirmasi laporan | Admin memverifikasi atau menolak laporan dari antrean. Laporan yang lolos menjadi terlihat pada daftar publik. |
| F005 | Notifikasi laporan terbaru | Notifikasi internal dibuat saat admin mengonfirmasi laporan. Preferensi notifikasi dapat diaktifkan/nonaktifkan. |
| F006 | Petugas mengelola hasil penyelesaian | Petugas mengambil laporan terverifikasi, menandai penanganan, lalu membuat/mengubah/menghapus catatan hasil. |
| F007 | Notifikasi hasil penyelesaian | Notifikasi internal dibuat ketika hasil penanganan disimpan/diperbarui. |
| F008 | Admin mengirim rekapitulasi | Admin memilih periode, memberi judul/ringkasan, lalu menerbitkan rekap. |
| F009 | User mengunduh rekapitulasi | Ketua RT dapat mengunduh CSV laporan terverifikasi; admin juga dapat mengekspor data periode. |
| F010 | Admin menghapus laporan | Admin dapat menghapus laporan dari detail laporan. |

## 1.4 Kebutuhan nonfungsional yang diperhatikan

- Bahasa antarmuka menggunakan Bahasa Indonesia.
- Layout responsif untuk desktop dan perangkat seluler.
- Navigasi dibuat konsisten, dengan hak akses berdasarkan peran.
- Form memiliki validasi dasar untuk field wajib.
- Sistem sumber meminta akses melalui internet, ketersediaan 24 jam (kecuali perawatan), dan HTTPS/SSL. Prototipe lokal ini belum menyediakan hosting atau sertifikat SSL.
- Password dan data demo hanya untuk simulasi lokal; belum memenuhi persyaratan keamanan autentikasi produksi.

## 1.5 Asumsi desain prototipe

1. Nama lingkungan, akun contoh, dan laporan contoh adalah data fiktif.
2. Laporan hanya masuk feed/pantauan publik setelah admin memverifikasi. Status ditolak dan menunggu verifikasi tidak ditampilkan ke peran lain.
3. Identitas pelapor disamarkan pada kartu laporan umum; detail pelapor dibatasi menurut peran.
4. Notifikasi disimulasikan sebagai daftar notifikasi dalam aplikasi, bukan Web Push.
5. Lampiran hanya menyimpan nama file. File tidak diunggah atau disimpan sebagai bukti di server.
